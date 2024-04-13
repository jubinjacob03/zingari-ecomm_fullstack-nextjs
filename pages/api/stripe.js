import Stripe from "stripe";
import { buffer } from "micro";
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
import { Order } from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];
    try {
      const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      if (event.type === "checkout.session.completed") {
        await Order.updateOne({ _id: event.data.object.metadata.orderId }, { paid: true }, (err, doc) => {
          if (err) {
            console.log(err);
          }
        });
        // Handle successful checkout session completion here

        // Order processing all that stuff goes here

        console.log("Checkout session completed:", event.data.object);
        // You can retrieve session details from event.data.object and handle accordingly
      }

      res.status(200).json({ received: true });
    } catch (err) {
        console.error("Error handling webhook:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}