import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { Purchase } from "../models/purchaseModel.js";
import { Weapon } from "../models/weaponModel.js";
import { User } from "../models/userModel.js";
import { billGenerate } from "../utils/billGenerator.js";

// ➤ Record a new weapon purchase
export const recordWeaponPurchase = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // weapon ID
    const { email } = req.body;

    const weapon = await Weapon.findById(id);
    if (!weapon) {
        return next(new ErrorHandler("Weapon not found", 404));
    }

    const user = await User.findOne({ email, accountVerified: true });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    if (weapon.stock === 0) {
        return next(new ErrorHandler("Weapon out of stock", 400));
    }

    // Decrease stock and update availability
    weapon.stock -= 1;
    weapon.isAvailable = weapon.stock > 0;
    await weapon.save();

    // Record purchase
    await Purchase.create({
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        weapon: weapon._id,
        price: weapon.price,
        // other fields auto-handled by schema
    });

    // ➤ Update user's weaponries
    user.weaponries.push({
        weaponId: weapon._id,
        weaponName: weapon.name,
        dealDate: new Date(),
        suppliedDate: null,
        allocated: true
    });

    await user.save(); // save the updated user document

    res.status(200).json({
        success: true,
        message: "Weapon purchase recorded successfully.",
    });
});

// ➤ Get logged-in user's purchase history and bill
export const myPurchases = catchAsyncErrors(async (req, res, next) => {
    const purchases = await Purchase.find({ "user.id": req.user._id }).populate("weapon");

    const billItems = purchases.map(purchase => ({
        name: purchase.weapon.name,
        price: purchase.price,
        quantity: 1 // currently each purchase is for one unit
    }));

    const bill = billGenerate(billItems);

    res.status(200).json({
        success: true,
        purchases,
        bill
    });
});


// ➤ Admin: Get all weapon purchases
export const getAllPurchasesForAdmin = catchAsyncErrors(async (req, res, next) => {
    const purchases = await Purchase.find().populate("weapon").populate("user.id");
    res.status(200).json({
        success: true,
        purchases,
    });
});
