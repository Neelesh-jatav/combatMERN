import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
    .connect(process.env.MONGO_URI, {
            dbName: "COMBAT_DATABASE",
        })
        .then(() => {
            console.log(`Database coonnected successfully.`);
        }).catch(err=>{
            console.log("Error in connecting to database", err);
        })
};
 