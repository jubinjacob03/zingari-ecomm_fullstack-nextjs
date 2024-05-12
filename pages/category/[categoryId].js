// pages/category/[categoryId].js

import { CartContext } from "@/lib/CartContext";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import Link from "next/link";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function CategoryPage({ categoryProducts }) {
  const router = useRouter();
  const { addProduct } = useContext(CartContext);

  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(categoryProducts);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    setFilteredProducts(categoryProducts);
  }, [categoryProducts]);

  useEffect(() => {
    function getName() {
      const fullPath = router.asPath;
      const encodedcategoryName = fullPath.split("?")[1];
      setCategoryName(decodeURIComponent(encodedcategoryName));
      console.log(categoryName);
    }
    getName();
  }, [router]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex justify-center min-h-screen w-full">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen w-full">
          <Spinner />
        </div>
      ) : (
        <div className="mt-14 md:mt-6 w-full px-4 md:p-0">
          <div className="flex w-full justify-center">
            <h2 className="max-w-2xl py-4 px-3 capitalize flex border-b-2 flex-col text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-orange-400 to-yellow-600 items-center justify-center">
              {categoryName}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-3 md:gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 xl:gap-x-8 px-8 py-8">
            {filteredProducts.map((product) => (
              <div key={product._id}>
                <div className="group block overflow-hidden border border-accent rounded-xl border-opacity-10">
                  <div className="">
                    <div className="relative md:h-[300px] h-[200px]">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="absolute inset-0 h-full w-full object-contain opacity-100 group-hover:opacity-0"
                      />
                      <img
                        src={product.images[1]}
                        alt=""
                        className="absolute inset-0 h-full w-full object-contain opacity-0 group-hover:opacity-100"
                      />
                    </div>

                    <div className="relative p-3 border-t">
                      <Link href={"/products/" + product._id}>
                        <h3 className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4 truncate">
                          {product.title}
                        </h3>
                      </Link>

                      <div className="mt-1.5 flex flex-col items-center justify-between text-text">
                        <p className="tracking-wide text-primary text-sm md:text-md">
                          Rs. {formatPrice(product.price)}
                        </p>

                        <div className="col-span-12 text-center w-full mt-3">
                          <button
                            onClick={() => {
                              addProduct(product._id);
                              toast.success("Item added to cart!");
                            }}
                            className="disabled block rounded bg-secondary px-5 py-3 text-md text-text w-full transition hover:bg-primary hover:text-white"
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const categoryId = context.params.categoryId;
  await mongooseConnect();
  const categoryProducts = await Product.find({ category: categoryId }, null, {
    sort: { _id: 1 },
  });

  return {
    props: {
      categoryProducts: JSON.parse(JSON.stringify(categoryProducts)),
    },
  };
}
