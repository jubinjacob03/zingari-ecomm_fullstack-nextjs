import { mongooseConnect } from "@/lib/mongoose";
import Hero from "./components/Hero";
import { Product } from "@/models/Product";
import Products from "./components/Products";
import Collection from "./components/Collection";

export default function Home({
  featuredProduct,
  newProducts,
  collectionProduct,
}) {
  return (
    <main className={`min-h-screen p-6 bg-background `}>
      <Hero product={featuredProduct} />

      <hr class="my-1 h-px border-0 bg-gray-300" />

      <Products products={newProducts} />
      <hr class="my-1 h-px border-0 bg-gray-300" />
      <Collection product={collectionProduct} />
    </main>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredId = process.env.FEATURED_PRODUCT_ID;
  const collectionId = process.env.COLLECTION_PRODUCT_ID;

  const featuredProduct = await Product.findById(featuredId);
  const collectionProduct = await Product.findById(collectionId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 5,
  });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      collectionProduct: JSON.parse(JSON.stringify(collectionProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
