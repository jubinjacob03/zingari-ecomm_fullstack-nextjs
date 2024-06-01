import Stripe from "stripe";
import { buffer } from "micro";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];
    try {
      const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      if (event.type === "checkout.session.completed") {
        const order = await Order.findOne({
          _id: event.data.object.metadata.orderId,
        });
        if (order) {
          order.paid = true;
          await order.save();

          // Reduce the stock of each product in the order
          for (const item of order.line_items) {
            const productId = item.price_data.product_data.metadata.productId;
            const quantity = item.quantity;
            await Product.updateOne(
              { _id: productId },
              { $inc: { stock: -quantity } },
              (err, doc) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        }

        // console.log("Checkout session completed:", event.data.object);
      }
    } catch (err) {
      // console.error(`Webhook Error: ${err.message}`);
    }
  }
}
