import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js"; 
import { 
    addWeapon, 
    deleteWeapon, 
    getAllWeapons 
} from "../controllers/weaponController.js";
import express from "express";

const router = express.Router();

router.post("/admin/add", isAuthenticated, isAuthorized("Admin"), addWeapon);
router.get("/all", getAllWeapons);
router.delete("/admin/delete/:id", isAuthenticated, isAuthorized("Admin"), deleteWeapon);

export default router;