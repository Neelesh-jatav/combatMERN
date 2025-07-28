import cron from "node-cron";
import { Purchase } from "../models/purchaseModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { User } from "../models/userModel.js";

export const notifyUsers = () => {
      // Runs every 30 minutes
    cron.schedule("*/30 * * * *", async () => {
        try {
            const now = new Date();

            // Get tomorrow's date
            const tomorrow = new Date();
            tomorrow.setDate(now.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0); // Set time to 00:00:00 for clean match

            const dayAfter = new Date(tomorrow);
            dayAfter.setDate(tomorrow.getDate() + 1);

            // Find purchases with delivery date = tomorrow and not yet delivered
            const deliveriesDueTomorrow = await Purchase.find({
                deliveryDate: {
                    $gte: tomorrow,
                    $lt: dayAfter
                },
                isDelivered: false,
            }).populate("weapon");

            for (const order of deliveriesDueTomorrow) {
                const user = await User.findById(order.user.id);

                if (user && user.email) {
                    await sendEmail({
                        email: user.email,
                        subject: "⚠️ Delivery Scheduled for Tomorrow - Combat Purchase",
                        message: `Hello ${user.name},

This is a reminder that your purchased item from Combat is scheduled for delivery **tomorrow**.

🧾 Item: ${order.weapon?.name || "Your Weapon"}
📦 Status: ${order.status}
📅 Scheduled Delivery Date: ${order.deliveryDate.toDateString()}

Please ensure to receive the delivery.

Thank you for using Combat Defense Logistics.

- Combat Team`,
                    });

                    console.log(`✅ Reminder sent to ${user.email} for delivery on ${order.deliveryDate}`);
                }
            }
        } catch (error) {
            console.error("❌ Error sending delivery reminders:", error);
        }
    });
};
