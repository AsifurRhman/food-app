"use client"


import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import MenuHeader from './MenuHeader'
import MenuItem from './MenuItem'
import { CartContext } from '../Provider/AppContext'

export default function Menu() {
  const [bestSellers, setBestSellers] = useState([]);
  const { addToCart, removeCartProduct } = useContext(CartContext);
  useEffect(() => {
    fetch('/api/menuItem').then(res => {
      res.json().then(menuItems => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);
  return (
      <div>
            <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={'/sallad1.png'} width={109} height={189}  alt={'sallad'} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'} />
        </div>
      </div>
       <div className="text-center mb-4">
        <MenuHeader
          subHeader={'check out'}
          mainHeader={'Our Best Sell items'} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 && bestSellers.map(item => (
          <MenuItem key={item._id} menuItem={item} addToCart={addToCart} />
        ))}
            
              
      </div>
    </div>
  )
}
