import mongoose from "mongoose";

const LOCAL_URI = "mongodb://127.0.0.1:27017";
const ATLAS_URI = process.env.ATLAS_URI;
const SOURCE_DB = "COMBAT_DATABASE";
const TARGET_DB = "COMBAT_DATABASE";

if (!ATLAS_URI) {
  console.error("ATLAS_URI is required. Example: set ATLAS_URI=mongodb+srv://...");
  process.exit(1);
}

const localConnection = mongoose.createConnection(LOCAL_URI, { dbName: SOURCE_DB });
const atlasConnection = mongoose.createConnection(ATLAS_URI, { dbName: TARGET_DB });

const waitForOpen = (connection, name) =>
  new Promise((resolve, reject) => {
    connection.once("open", () => {
      console.log(`${name} connected.`);
      resolve();
    });
    connection.once("error", reject);
  });

const migrate = async () => {
  try {
    await Promise.all([
      waitForOpen(localConnection, "Local DB"),
      waitForOpen(atlasConnection, "Atlas DB"),
    ]);

    const localDb = localConnection.db;
    const atlasDb = atlasConnection.db;

    const collections = await localDb.listCollections().toArray();

    if (!collections.length) {
      console.log(`No collections found in local database '${SOURCE_DB}'.`);
      return;
    }

    for (const { name } of collections) {
      const docs = await localDb.collection(name).find({}).toArray();

      await atlasDb.collection(name).deleteMany({});

      if (docs.length) {
        await atlasDb.collection(name).insertMany(docs, { ordered: false });
      }

      console.log(`Migrated collection '${name}' with ${docs.length} documents.`);
    }

    console.log("Local MongoDB upload to Atlas completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error.message || error);
    process.exitCode = 1;
  } finally {
    await Promise.allSettled([localConnection.close(), atlasConnection.close()]);
  }
};

migrate();
