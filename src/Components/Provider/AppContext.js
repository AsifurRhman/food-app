'use client';
import {SessionProvider} from "next-auth/react";
import {createContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

export function AppProvider({ children }) {
  
  const [cartProducts,setCartProducts] = useState([]);

  const ls = typeof window !== 'undefined' ? window.localStorage : null;
////console.log(ls,"ls======================ls")
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts( JSON.parse( ls.getItem('cart') ) );
    }
  }, []);

  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove) {
    setCartProducts(prevCartProducts => {
      const newCartProducts = prevCartProducts
        .filter((v,index) => index !== indexToRemove);
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success('Product removed');
  }

  function saveCartProductsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }

  // function addToCart(product, size = null, extras = []) {
  //   //console.log("enter add to cart")
  //   setCartProducts(prevProducts => {
  //     const cartProduct = {...product, size, extras};
  //     const newProducts = [...prevProducts, cartProduct];
  //     saveCartProductsToLocalStorage(newProducts);
  //     return newProducts;
  //   });
  // }
  const addToCart = (product, size = null, extras = [],email) => {
    //console.log("enter add to cart");
    //console.log(email,"email===========from add to cart")
    setCartProducts(prevProducts => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      //console.log(newProducts,"new products =======================from new products");
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  };
 
  
  const contextValue = {
    cartProducts,
    addToCart,
    removeCartProduct,
    clearCart,
  };
  return (
    <SessionProvider>
      <CartContext.Provider value={contextValue}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}