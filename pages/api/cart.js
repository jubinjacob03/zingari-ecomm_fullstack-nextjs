import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const { ids } = req.body; // Destructure only ids from req.body
  
  // Extract productId values from ids
  const productIds = ids.map(item => item.productId);
  
  try {
    const products = await Product.find({ 
      _id: { $in: productIds } // Pass productIds to $in operator
    });
    res.json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
