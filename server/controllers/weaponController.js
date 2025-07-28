import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Weapon } from "../models/weaponModel.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { v2 as cloudinary } from "cloudinary";

export const addWeapon = catchAsyncErrors(async (req, res, next) => {
    const {
        name,
        category,
        model,
        manufacturer,
        originCountry,
        description,
        specifications,
        price,
        stock,
        manufacturedAt,
    } = req.body;

    // Validate required fields
    if (!name || !category) {
        return next(new ErrorHandler("Please fill all required fields", 400));
    }

    // Image upload
    if (!req.files || !req.files.image) {
        return next(new ErrorHandler("Weapon image is required.", 400));
    }
    const { image } = req.files;
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedFormats.includes(image.mimetype)) {
        return next(new ErrorHandler("File format not supported", 400));
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
        image.tempFilePath,
        { folder: "COMBAT_MANAGEMENT_SYSTEM_ITEM_IMAGES" }
    );
    if (!cloudinaryResponse) {
        return next(new ErrorHandler("Failed to upload image to cloudinary.", 500));
    }

    const weapon = await Weapon.create({
        name,
        category,
        model,
        manufacturer,
        originCountry,
        description,
        specifications,
        price,
        stock,
        manufacturedAt,
        images: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
        addedBy: req.user._id,
    });

    res.status(201).json({
        success: true,
        message: "Weapon added successfully",
        weapon,
    });
});

export const getAllWeapons = catchAsyncErrors(async (req, res, next) => {
    const weapons = await Weapon.find();
    res.status(200).json({
        success: true,
        weapons,
    });
});



export const deleteWeapon = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const weapon = await Weapon.findById(id);
    if (!weapon) {
        return next(new ErrorHandler("Weapon not found", 404));
    }

    await weapon.deleteOne();

    res.status(200).json({
        success: true,
        message: "Weapon deleted successfully",
    });
});
