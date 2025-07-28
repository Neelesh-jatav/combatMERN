import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true
        },
    },
    weapon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Weapon",
    },
    price: {
        type: Number,
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    }
}, {
    timestamps: true
});

export const Purchase = mongoose.model("Purchase", purchaseSchema);
