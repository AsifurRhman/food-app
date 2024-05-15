'use client';


import {useState} from "react";
import AddressInputs from "./AddressInputs";
import { UserProfile } from "../UserProfile/UserProfile";
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import Image from "next/image";
import NoImage from '../../no-image.png'
export default function UserForm({ user, onSave }) {
  //console.log(user,"user")
 const[userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  //console.log(image, "image")
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const {data:loggedInUserData} = UserProfile();

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'city') setCity(value);
    if (propName === 'country') setCountry(value);
  }
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
    <div className="md:flex gap-4">
      
      <form
        className="grow"
        onSubmit={ev =>
          onSave(ev, {
            name:userName, image, phone, admin,
            streetAddress, city, country, postalCode,
          })
        }
      >
        <label>
          First and last name
        </label>
        <input
          type="text" placeholder="First and last name"
          value={userName} onChange={ev => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={user?.email}
          placeholder={'email'}
        />
        <AddressInputs
          addressProps={{phone, streetAddress, postalCode, city, country}}
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
              <input
                id="adminCb" type="checkbox" className="" value={'1'}
                checked={admin}
                onChange={ev => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px] ">
         
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
         
        </div>
        <span className=" block border border-gray-300 rounded-lg p-2 text-center m-5">Click on image for change</span>
      </div>
    </div>
  );
}