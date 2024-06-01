import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
const stripe = require("stripe")(process.env.STRIPE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("Should be a post request");
    return;
  }

  const country = "India";
  const { email, name, phone, address, city, state, zip, cartProducts } =
    req.body;

  await mongooseConnect();

  // Test Card:  4000 0035 6000 0008

  // Extract unique product IDs and selected sizes
  const productInfoMap = new Map();
  cartProducts.forEach(({ productId, selectedSize }) => {
    if (!productInfoMap.has(productId)) {
      productInfoMap.set(productId, new Set());
    }
    productInfoMap.get(productId).add(selectedSize);
  });

  const uniqueProductIds = [...productInfoMap.keys()];

  // Fetch product details
  const productsInfo = await Product.find({ _id: { $in: uniqueProductIds } });

  let line_items = [];

  // Create line items for each unique product and selected size
  for (const productId of uniqueProductIds) {
    const productInfo = productsInfo.find(
      (p) => p._id.toString() === productId
    );
    const selectedSizes = [...productInfoMap.get(productId)];

    for (const selectedSize of selectedSizes) {
      const quantity =
        cartProducts.filter(
          (p) => p.productId === productId && p.selectedSize === selectedSize
        ).length || 0;

      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: "inr",
            product_data: {
              name: productInfo.title,
              metadata: {
                selectedSize,
                productId: productId,
              },
            },
            unit_amount: quantity * productInfo.price * 100,
          },
        });
      }
    }
  }

  // Create order document
  const orderDoc = await Order.create({
    line_items,
    email,
    name,
    phone,
    address,
    city,
    country,
    state,
    zip,
    paid: false,
  });

  // Create Stripe session
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.SUCCESS_URL + "/cart?success=1",
    cancel_url: process.env.SUCCESS_URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
  });

  res.json({
    url: session.url,
  });
}
