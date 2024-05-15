


import {useEffect, useState} from "react";
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import Image from "next/image";
import MenuItemPriceProps from "./MenuItemPriceProps ";
import NoImage from '../../food-upload.jpg'
export default function MenuItemForm({onSubmit,menuItem}) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [categories, setCategories] = useState([]);
  const [
    extraIngredientPrices,
    setExtraIngredientPrices,
  ] = useState(menuItem?.extraIngredientPrices || []);

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  }, []);
  const handleImageUpload = (result) => {
    //console.log("result: ", result);
    const info = result.info;

    if ("secure_url" in info && "public_id" in info) {
        const url = info.secure_url;
        const public_id = info.public_id;
      setImageUrl(url);
      setImage(url)
        setPublicId(public_id);
        //console.log("url: ", url);
        //console.log("public_id: ", public_id);
    }
};
  return (
    <form
      onSubmit={ev =>
        onSubmit(ev, {
          image,name,description,basePrice,sizes,extraIngredientPrices,category,
        })
      }
      className="mt-8 max-w-2xl mx-auto">
      <div
        className="md:grid items-start gap-4"
        style={{gridTemplateColumns:'.3fr .7fr'}}>
        <div>
        <CldUploadButton
  onUpload={handleImageUpload}
uploadPreset = {process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
className = {`h-60 w-60 border-2 mt-4 border-dotted grid place-items-center bg-slate-100 rounded-md relative 
}`} >
             <div>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

    </div>
    
    {
  imageUrl ? (
    <Image
      src={imageUrl}
      width={550}
      height={550}
      className="absolute object-contain"
      alt="Image not found"
      Layout="fixed"
    />
  ) : image ? (
    <Image
      className="absolute object-contain"
      src={image}
      width={550}
      height={550}
      alt={'avatar'}
      Layout="fixed"
    />
  ) : (
    <Image
      className="absolute object-contain"
      src={NoImage}
      width={550}
      height={550}
      alt={'avatar'}
      Layout="fixed"
    />
  )
}
          </CldUploadButton>
          <span className=" block border border-gray-300 rounded-lg p-2 text-center m-5">Click on image for change</span>
        </div>
        <div className="">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
          <label>Description</label>
          <textarea
            rows="10" cols="40"
            type="text"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            {categories?.length > 0 && categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={ev => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProps name={'Sizes'}
                              addLabel={'Add item size'}
                              props={sizes}
                              setProps={setSizes} />
          <MenuItemPriceProps name={'Extra ingredients'}
                              addLabel={'Add ingredients prices'}
                              props={extraIngredientPrices}
                              setProps={setExtraIngredientPrices}/>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}