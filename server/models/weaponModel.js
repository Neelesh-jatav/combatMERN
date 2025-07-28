import mongoose from "mongoose";

const weaponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        enum: ["Rifle","Artillery", "Explosives","Armored Vehicles","Missile", "Fighter Jets", "UAV", "Naval Weaponry", "Nuclear Warheads", "Defense System", "Chemical", "Cyber Security"],
        required: true,
    },
    model: {
        type: String,
        trim: true,
    },
    manufacturer: {
        type: String,
    },
    originCountry: {
        type: String,
    },
    description: {
        type: String,
    },
    specifications: {
        weight: String,
        range: String,
        caliber: String,
        fireRate: String,
        ammoType: String,
    },
    price: {
        type: Number,
    },
    stock: {
        type: Number,
        default: 0,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    manufacturedAt: {
        type: Date,
    },
    images: [
  {
    public_id: { type: String },
    url: { type: String },
  }
]
,
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields of time
});

export const Weapon = mongoose.model("Weapon",weaponSchema);
