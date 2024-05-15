import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      const storedCartProducts = JSON.parse(ls.getItem("cart"));
      if (Array.isArray(storedCartProducts)) {
        setCartProducts(storedCartProducts);
      } else {
        console.error(
          "Invalid cart data in local storage:",
          ls.getItem("cart")
        );
      }
    }
  }, []);
  function addProduct(productId, selectedSize) {
    const product = { productId, selectedSize };
    setCartProducts((prev) => [...prev, product]);
  }

  function removeProduct(productId, selectedSize) {
    setCartProducts((prev) => {
      const position = prev.findIndex(
        (product) =>
          product.productId === productId &&
          product.selectedSize === selectedSize
      );
      if (position !== -1) {
        return prev.filter((_, index) => index !== position);
      }
      return prev;
    });
  }

  function clearCart() {
    if (ls) {
      ls.removeItem("cart");
    }
    setCartProducts([]);
  }
  return (
    <>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addProduct,
          removeProduct,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
