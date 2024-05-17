//navbarss
'use client';


import React, { useContext, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Bars3 from '../Icons/Bars3'
import {signOut, useSession} from "next-auth/react";
import ShoppingCart from '../Icons/ShoppingCart';
import { CartContext } from '../Provider/AppContext';


function AuthLinks({status, userName}) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-emerald-500 rounded-full text-white px-8 py-2">
          Logout
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'} className="bg-emerald-500 rounded-full text-white px-8 py-2">
          Register
        </Link>
      </>
    );
  }
}

export default function Navbar() {
  const session = useSession();
  //console.log(session,"session")
  const status = session?.status;
  //console.log(status, "status")
  const { cartProducts } = useContext(CartContext);
  //console.log(cartProducts, "cartProducts==============================")
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }
  return (
      <div>
     <header>
      <div className="flex items-center md:hidden justify-between">
        <Link className="text-emerald-500 font-semibold text-2xl" href={'/'}>
          FamilY Kitchen
        </Link>
        <div className="flex gap-8 items-center">
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-emerald-500 text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen(prev => !prev)}>
            <Bars3 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-emerald-500 font-semibold text-2xl" href={'/'}>
          FamilY Kitchen
          </Link>
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} />
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-emerald-500 text-white text-xs py-1 px-1 rounded-full leading-3">
            {cartProducts.length}
          </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
    </div>
  )
}
