import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../lib/CartContext";
import axios from "axios";
import Link from "next/link";
import Spinner from "../components/Spinner";
import { signIn, signOut, useSession } from "next-auth/react";
import Success from "../components/Success";
import toast from "react-hot-toast";

export default function Cart() {
  const { cartProducts, removeProduct, addProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    console.log("Cart Products:", cartProducts);
    if (cartProducts.length > 0) {
      setLoading(true);
      axios
        .post("/api/cart", {
          ids: cartProducts.map((product) => product.productId),
        })
        .then((response) => {
          const updatedProducts = [];

          response.data.forEach((product) => {
            const cartProductEntries = cartProducts.filter(
              (cp) => cp.productId === product._id
            );

            cartProductEntries.forEach((entry) => {
              const existingProduct = updatedProducts.find(
                (p) =>
                  p._id === product._id && p.selectedSize === entry.selectedSize
              );
              if (existingProduct) {
                existingProduct.quantity += 1;
              } else {
                updatedProducts.push({
                  ...product,
                  selectedSize: entry.selectedSize,
                  quantity: 1,
                });
              }
            });
          });

          // Adjust quantities based on stock
          const adjustedProducts = updatedProducts.map((product) => {
            const totalQuantityInCart = cartProducts.filter(
              (item) =>
                item.productId === product._id &&
                item.selectedSize === product.selectedSize
            ).length;

            if (totalQuantityInCart > product.stock) {
              // Remove excess products from cart
              for (let i = totalQuantityInCart; i > product.stock; i--) {
                decreaseProduct(
                  product._id,
                  product.selectedSize,
                  "Product reached maximum stock !!"
                );
              }

              product.quantity = product.stock;
            } else {
              product.quantity = totalQuantityInCart;
            }

            return product;
          });

          setProducts(adjustedProducts);
          console.log("Products:", adjustedProducts);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  let total = 0;
  for (const item of cartProducts) {
    const price = products.find((p) => p._id === item.productId)?.price || 0;
    total += price;
  }

  function increaseProduct(id, selectedSize) {
    addProduct(id, selectedSize);
  }

  function decreaseProduct(id, selectedSize, message) {
    removeProduct(id, selectedSize);
    toast.success(message);
  }

  function deleteCart() {
    clearCart();
    setLoading(false);
    setProducts([]);
    toast.success("Cart cleared !!");
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  async function stripeCheckout() {
    const response = await axios.post("/api/checkout", {
      email: session.user.email,
      name: session.user.name,
      phone,
      address,
      state,
      zip,
      city,
      cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    } else {
      toast.error("An error ocurred !!");
    }
  }

  if (isSuccess) {
    return (
      <>
        <Success />
      </>
    );
  }

  if (session) {
    return (
      <>
        <section className="flex justify-between max-md:flex-col space-x-4 ">
          <div className=" md:w-2/3  px-4">
            <div className=" mt-16 md:mt-6 ">
              <header className="text-center flex justify-between w-full">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Your Cart
                </h1>
              </header>
              {loading ? (
                <div className="flex justify-center items-center h-screen">
                  <Spinner />
                </div>
              ) : !products?.length ? (
                <p className="my-6 text-center ">Your cart is empty</p>
              ) : (
                <>
                  {products?.length > 0 &&
                    products.map((product) => (
                      <div key={product._id} className="mt-8">
                        <ul className="space-y-4">
                          <li className="flex items-center gap-4 justify-between">
                            <img
                              src={product.images[0]}
                              alt=""
                              className="h-16 w-16 rounded object-cover"
                            />

                            <div>
                              <h3 className="text-md text-text max-w-md">
                                {product.title}
                              </h3>
                              <p className="text-[12px] text-gray-600">
                                Size : {product.selectedSize}
                              </p>

                              <dl className="mt-0.5 space-y-px text-sm text-text">
                                <p>
                                  Rs .
                                  {cartProducts.filter(
                                    (item) =>
                                      item.productId === product._id &&
                                      item.selectedSize === product.selectedSize
                                  ).length * product.price}
                                </p>
                              </dl>
                            </div>
                            {/* {console.log("Selected Size:", product.selectedSize)} */}
                            <div>
                              <label htmlFor="Quantity" className="sr-only">
                                {" "}
                                Quantity{" "}
                              </label>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border rounded-md "
                                  onClick={() =>
                                    decreaseProduct(
                                      product._id,
                                      product.selectedSize,
                                      "Product removed from cart !!"
                                    )
                                  }
                                >
                                  -
                                </button>

                                <input
                                  type="number"
                                  id="Quantity"
                                  value={
                                    cartProducts.filter(
                                      (item) =>
                                        item.productId === product._id &&
                                        item.selectedSize ===
                                          product.selectedSize
                                    ).length
                                  }
                                  className="h-10 w-16 rounded border border-secondary text-primary font-bold text-center [-moz-appearance:_textfield] sm:text-md [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                />

                                <button
                                  type="button"
                                  className="w-10 h-10 leading-10 text-text transition hover:opacity-75 border rounded-md"
                                  onClick={() =>
                                    increaseProduct(
                                      product._id,
                                      product.selectedSize
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    ))}

                  <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                    <div className=" max-w-md space-y-4">
                      <dl className="space-y-0.5 text-md text-gray-700">
                        <div className="flex justify-end text-red-400 border-b mb-3">
                          <button onClick={deleteCart}>Clear Cart</button>
                        </div>
                        <div className="flex justify-between">
                          <dt>Subtotal</dt>
                          <dd>Rs. {formatPrice(total)}</dd>
                        </div>

                        <strike className="flex justify-between">
                          <dt>Delivery Charges</dt>
                          <dd>
                            Rs.{" "}
                            {formatPrice(
                              Number(
                                Math.min(130, (60 + total * 0.02).toFixed(3))
                              )
                            )}
                          </dd>
                        </strike>

                        <div className="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>Rs. {formatPrice(total)}</dd>
                        </div>
                      </dl>

                      <div className="flex justify-end">
                        <Link
                          class="group flex items-center justify-between gap-4 rounded-lg border border-current px-4 py-2 text-orange-600 transition-colors hover:bg-orange-600 focus:outline-none focus:ring active:bg-orange-500"
                          href="/products"
                        >
                          <span class="font-medium transition-colors group-hover:text-white">
                            Continue shopping
                          </span>

                          <span class="shrink-0 rounded-full border border-orange-600 bg-white p-2 group-active:border-orange-500">
                            <svg
                              class="h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {!products.length ? (
            ""
          ) : (
            <div className="md:1/3 mt-16 md:mt-6">
              <header className="text-start flex flex-col w-full">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                  Delivery details
                </h1>
                <p className="mt-2 text-text text-lg">
                  We use your account details for delivery.
                </p>
              </header>
              <div class="mx-auto max-w-xl p-4 border shadow-xl my-3">
                <div class="space-y-5">
                  <div class="grid grid-cols-12 gap-5">
                    <div class="col-span-6">
                      <label class="mb-1 block text-sm font-medium text-text">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        value={session.user.email}
                        placeholder="Email"
                      />
                    </div>
                    <div class="col-span-6">
                      <label class="mb-1 block text-sm font-medium text-text">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        value={session.user.name}
                        placeholder="Full name"
                      />
                    </div>
                    <div class="col-span-12">
                      <label class="mb-1 block text-sm font-medium text-text">
                        Address
                      </label>
                      <textarea
                        type="text"
                        name="address"
                        class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Enter your delivery address"
                        value={address}
                        onChange={(ev) => setAddress(ev.target.value)}
                        required
                        rows={2}
                      />
                    </div>
                    <div class="col-span-12">
                      <label class="mb-1 block text-sm font-medium text-text">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(ev) => {
                          const value = ev.target.value;
                          if (/^[0-9+\- ]*$/.test(value)) {
                            setPhone(value);
                          }
                        }}
                        required
                      />
                    </div>
                    <div class="col-span-4">
                      <label class="mb-1 block text-sm font-medium text-text">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder=""
                        value={city}
                        onChange={(ev) => setCity(ev.target.value)}
                        required
                      />
                    </div>
                    <div class="col-span-4">
                      <label class="mb-1 block text-sm font-medium text-text">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder=""
                        value={state}
                        onChange={(ev) => setState(ev.target.value)}
                        required
                      />
                    </div>
                    <div class="col-span-4">
                      <label class="mb-1 block text-sm font-medium text-text">
                        Zip
                      </label>
                      <input
                        type="text"
                        name="zip"
                        class="block w-full rounded-md p-3 border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder=""
                        value={zip}
                        onChange={(ev) => setZip(ev.target.value)}
                        required
                      />
                    </div>
                    <div class="col-span-12 text-center w-full">
                      <button
                        onClick={stripeCheckout}
                        className="disabled block bg-secondary px-5 py-3 text-md text-text transition hover:bg-primary hover:text-white w-full rounded-lg"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </>
    );
  }

  return (
    <>
      <div className="grid h-screen px-4 bg-white place-content-center">
        <div className="text-center">
          <p className="mt-4 text-text text-2xl">
            You should Sign In to view cart Items
          </p>

          <button
            onClick={() => signIn("google")}
            className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-secondary rounded-md hover:bg-primary focus:outline-none focus:ring"
          >
            Login / Register
          </button>
        </div>
      </div>
    </>
  );
}
