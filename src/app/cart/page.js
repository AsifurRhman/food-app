'use client';

import AddressInputs from "@/Components/Layout/AddressInputs";
import SectionHeaders from "@/Components/Layout/SectionHeaders";
import CartProduct from "@/Components/Menu/CartProduct";
import { CartContext, cartProductPrice } from "@/Components/Provider/AppContext";
import { UserProfile } from "@/Components/UserProfile/UserProfile";



import Image from "next/image";
import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  console.log(cartProducts,"cartProducts============cartProducts============")
  const [address, setAddress] = useState({});
  const {data:profileData} = UserProfile();;
  const { data } = UserProfile();
  const email = data?.email;
  console.log(email,"email================email from cart page")
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 😔');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country,  } = profileData;
      const email = data?.email;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
   
      };
      console.log(addressFromProfile,"addressFromProfile===========addressFromProfile")
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }
  function handleAddressChange(propName, value) {
    setAddress(prevAddress => ({...prevAddress, [propName]:value}));
  }
  const proceedToCheckout = async (ev) => {
    ev.preventDefault();
    // address and shopping cart products
    console.log(cartProducts, "cartProducts=========cartProducts");
    const promise = new Promise((resolve, reject) => {
      console.log(address, "address==============address");
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {

        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });
  };
  

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 && cartProducts.map((product, index) => (
            <CartProduct
              key={index}
              product={product}
              onRemove={removeCartProduct}
              index={index}
            />
          ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal:<br />
              Delivery Fee:<br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              {subtotal}/- <br />
              100/- <br />
              {subtotal + 100}/-
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <input
    type="email"
    disabled={true}
    value={email}
    placeholder={'email'}
  />
            <button type="submit">Pay {subtotal+100}/-</button>
          </form>
        </div>
      </div>
    </section>
  );
}