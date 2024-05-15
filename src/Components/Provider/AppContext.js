'use client';
import {SessionProvider} from "next-auth/react";
import {createContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import { UserProfile } from "../UserProfile/UserProfile";

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
  
  const [cartProducts, setCartProducts] = useState([]);

  //console.log(cartProducts,"cartProducts=======")
  const { data } = UserProfile();
  //console.log(data,"data")
  const userEmail = data?.email
  //console.log(userEmail ,"USER_EMAIL")
  const ls = typeof window !== 'undefined' ? window.localStorage : null;
 //console.log(ls,"ls======================ls")
//   useEffect(() => {
//     if (ls && ls.getItem('cart')) {
//       setCartProducts( JSON.parse( ls.getItem('cart') ) );
//     }
//   }, []);
useEffect(() => {
  if (ls && ls.getItem('cart')) {
    const storedCart = JSON.parse(ls.getItem('cart'));
    //console.log(storedCart,"cart================")
    // Check if the stored cart belongs to the logged-in user
    if (storedCart.email === userEmail) {
      setCartProducts(storedCart.cartProducts);
    }
  }
}, [userEmail]); 
  
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

  function saveCartProductsToLocalStorage(cartProducts, email) {
    const dataToSave = {
      cartProducts: cartProducts,
      email: email
    };
    //console.log(dataToSave,"dataToSave");
    if (ls) {
      ls.setItem('cart', JSON.stringify(dataToSave));
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
      //console.log(prevProducts,"prevProducts")
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      //console.log(newProducts,"new products =======================from new products");
      saveCartProductsToLocalStorage(newProducts,email);
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