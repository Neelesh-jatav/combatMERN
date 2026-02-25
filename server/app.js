import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/db.js";
import { errorMiddlewares } from "./middlewares/errorMiddlewares.js";
import authRouter from "./routes/authRouter.js";
import weaponRouter from "./routes/weaponRouter.js";
import purchaseRouter from "./routes/purchaseRouter.js"; 
import expressFileUpload from "express-fileupload"; 
import userRouter from "./routes/userRouter.js"; 
import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAccounts } from "./services/removeUnverifiedAccounts.js";


export const app = express();

config({path:"./config/config.env"}); 

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true})); 

app.use(expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use("/api/v1/auth", authRouter); //static url for auth routes
app.use("/api/v1/weapon", weaponRouter); 
app.use("/api/v1/purchase", purchaseRouter);
app.use("/api/v1/user", userRouter); 

// API routes format: http://localhost:4000/api/v1/[route]/[endpoint]

notifyUsers(); 
removeUnverifiedAccounts();

connectDB();     

app.use(errorMiddlewares); // Error middleware should be the last middleware to be used