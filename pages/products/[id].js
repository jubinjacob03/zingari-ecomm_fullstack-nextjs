import { useState } from "react";
import { CartContext } from "@/lib/CartContext";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import toast from "react-hot-toast";
import { SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import dynamic from "next/dynamic";
import "swiper/css";
import "swiper/css/pagination";
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState("M");
  if (product) {
    return (
      <section className="mt-20 md:mt-6 mb-5 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image section */}
          <div className=" hidden md:grid md:grid-cols-2 lg:grid-cols-1 lg:gap-y-4 px-2 gap-4">
            <div className="lg:rounded-lg overflow-hidden px-4 md:px-2">
              <img
                src={product.images[0]}
                alt={product.images[0]}
                className="w-full h-full object-cover object-center border border-primary rounded-lg"
              />
            </div>
            {product.images.slice(1, 2).map((image, index) => (
              <div key={index} className="lg:overflow-hidden lg:rounded-lg ">
                <img
                  src={image}
                  alt={image}
                  className="w-full h-full object-cover object-center border rounded-lg border-secondary p-4"
                />
              </div>
            ))}
          </div>
          <div className="hidden md:grid md:grid-cols-2 lg:grid lg:grid-cols-1 lg:gap-y-4 px-2 gap-4 md:px-2">
            {product.images.slice(2, 5).map((image, index) => (
              <div key={index} className="lg:overflow-hidden lg:rounded-lg ">
                <img
                  src={image}
                  alt={image}
                  className="w-full h-full object-contain object-center border rounded-lg border-secondary p-4"
                />
              </div>
            ))}
          </div>
          {/*Mobile View*/}
          <div className="md:hidden px-2 ">
            <Swiper
              pagination={true}
              modules={[Pagination]}
              className="mySwiper"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Slide ${index}`}
                    className="w-full h-full object-contain object-center border rounded-lg border-secondary p-2"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product info */}
          <div className="p-4 lg:p-8 border">
            <h1 className="text-3xl font-semibold text-gray-900">
              {product.title}
            </h1>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Description
              </h2>
              <p className="mt-2 text-gray-700">{product.description}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Details</h2>
              <p className="mt-2 text-gray-700 list-disc list-inside">
                {product?.details}
              </p>
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 my-3">
              <div>
                <label className="text-text font-semibold">Brand</label>
                <p className="mt-2 text-accent list-disc list-inside">
                  {product?.brand}
                </p>
              </div>

              <div>
                <label className="text-text font-semibold">Gender</label>
                <p className="mt-2 text-accent list-disc list-inside">
                  {product?.gender}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 my-3">
              <div>
                <label className="text-text font-semibold">Product ID</label>
                <p className="mt-2 text-accent list-disc list-inside">
                  {product?.productId}
                </p>
              </div>
              <div>
                <label className="text-text font-semibold">Stock</label>
                <p className="mt-2 text-accent list-disc list-inside">
                  {product?.stock === 0 ? "Out of Stock" : product?.stock}
                </p>
              </div>
            </div>

            <div>
              <label className="text-text font-semibold">Sizes</label>
              <fieldset class="flex flex-wrap gap-3 mt-2">
                <legend class="sr-only">Size</legend>

                {product?.sizes.split(",").map((size, index) => (
                  <div
                    key={index}
                    className={`size-block ${
                      selectedSize === size ? "bg-primary" : "bg-white"
                    } rounded-full`}
                  >
                    <input
                      type="radio"
                      id={`size-${index}`}
                      name="sizeOption"
                      value={size.trim()}
                      className="sr-only"
                      checked={selectedSize === size.trim()}
                      onChange={() => setSelectedSize(size.trim())}
                    />
                    <label
                      htmlFor={`size-${index}`}
                      class="flex cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-inherit px-3 py-2 text-gray-900 hover:border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
                    >
                      <p
                        class="text-sm font-medium"
                        className={`size-block ${
                          selectedSize === size ? "text-white" : "text-black"
                        }`}
                      >
                        {size.trim()}
                      </p>
                    </label>
                  </div>
                ))}
              </fieldset>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Price</h2>
              <p className="mt-2 text-primary font-semibold text-lg">
                Rs {formatPrice(product.price)}
              </p>
            </div>
            <div className="w-full">
              <button
                className={`py-2 px-4 mt-4 rounded-md w-full ${
                  product?.stock === 0
                    ? "bg-red-200 text-gray-100 cursor-not-allowed"
                    : "bg-secondary text-white hover:bg-primary"
                }`}
                onClick={() => {
                  addProduct(product._id, selectedSize);
                  toast.success("Item added to cart !!");
                }}
                disabled={product?.stock === 0 ? true : false}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <p>Product not found.</p>;
}

export async function getServerSideProps(context) {
  try {
    await mongooseConnect();
    const { id } = context.query;
    const product = await Product.findById(id);
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
      },
    };
  } catch (error) {
    // Handle error
    console.error(error);
    return {
      notFound: true,
    };
  }
}
