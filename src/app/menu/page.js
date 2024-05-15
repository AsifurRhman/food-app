'use client';

import SectionHeaders from "@/Components/Layout/SectionHeaders";
import { CartContext } from "@/Components/Provider/AppContext";
import MenuItem from "@/Components/Menu/MenuItem";
import { useContext, useEffect, useState} from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  //console.log(menuItems,"menuItems====================menuItems")
  const { addToCart, removeCartProduct } = useContext(CartContext);
  //console.log(addToCart, "addToCart from menu page")
  
  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => setCategories(categories))
    });
    fetch('/api/menuItem').then(res => {
      res.json().then(menuItems => setMenuItems(menuItems));
    });
  }, []);

 //console.log(addToCart);
  
  return (
    <section className="mt-8">
      {categories?.length > 0 && categories.map(c => (
        <div key={c._id}>
          <div className="text-center font-times">
            <SectionHeaders mainHeader={c.name} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
            {menuItems.filter(item => item.category === c._id).map(item => (
              <MenuItem key={item._id} menuItem={item} addToCart={addToCart} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}