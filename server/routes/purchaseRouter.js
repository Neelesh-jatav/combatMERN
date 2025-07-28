import express from "express";
import {
    recordWeaponPurchase,
    getAllPurchasesForAdmin,
    myPurchases
} from "../controllers/purchaseController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ➤ Record a new weapon purchase (Admin or User)
router.post("/record/:id", isAuthenticated, isAuthorized("Admin", "User"), recordWeaponPurchase);

// ➤ Get all weapon purchases (Admin only)
router.get("/all", isAuthenticated, isAuthorized("Admin"), getAllPurchasesForAdmin);

// ➤ Get logged-in user's purchase history
router.get("/my", isAuthenticated, myPurchases);

export default router;
