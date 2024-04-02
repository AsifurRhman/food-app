"use client" 


import Image from "next/image";
import toast from "react-hot-toast";
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from "react";


export default function EditableImage({ link, setLink }) {

  const [imageUrl, setImageUrl] = useState("");
    const [publicId, setPublicId] = useState("");
  
  // async function handleFileChange(ev, setLink) {
  //   const files = ev.target.files;
  //   console.log(files, "files");
  // console.log(files[0],"files[0")
  //   if (files?.length === 1) {
  //     const data = new FormData();
  //     console.log(data, "data from data");
  
  //     data.set('file', files[0]);
  //     console.log(data.set('file', files[0]), "data after setting file");
  
  //     // const uploadPromise = fetch('/api/upload', {
  //     //   method: 'POST',
  //     //   body: data,
  //     // }).then(response => {
  //     //   if (response.ok) {
  //     //     return response.json().then(link => {
  //     //       setLink(link);
  //     //     });
  //     //   }
  //     //   throw new Error('Something went wrong');
  //     // });
  
  //     // await toast.promise(uploadPromise, {
  //     //   loading: 'Uploading...',
  //     //   success: 'Upload complete',
  //     //   error: 'Upload error',
  //     // });
  //   }
  // }
  
  const handleImageUpload = (result) => {
    console.log("result: ", result);
    const info = result.info;

    if ("secure_url" in info && "public_id" in info) {
        const url = info.secure_url;
        const public_id = info.public_id;
        setImageUrl(url);
        setPublicId(public_id);
        console.log("url: ", url);
        console.log("public_id: ", public_id);
    }
};

  return (
    <>
      
      {/* {link && (
        <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
      </label> */}

      
{/* <CldUploadWidget uploadPreset="xczxb9gu">
        {({ open }) => (
          <button onClick={() => open(handleFileChange)}>Upload an Image</button>
        )}
      </CldUploadWidget>
      {link && <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />} */}
      
{/* 
      <CldUploadButton
  onUpload={handleImageUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        lassName = {`h-72 border-2 mt-4 border-dotted grid place-items-center bg-slate-100 rounded-md relative ${
          imageUrl && "pointer-events-none"
        }`} >

             <div>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

    </div>
    
    {imageUrl ? (
      <Image
        src={imageUrl}
  
            className="rounded-lg w-full h-full mb-1" 
          width={550} height={550}
            alt="Image not found"
            
      />
        )
          :

          <Image className="rounded-lg w-full h-full mb-1" src={link} width={350} height={550} alt={'avatar'} />
      }
          </CldUploadButton> */}
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
    
    { imageUrl ? (
      <Image
        src={imageUrl}
        width={550} height={550}
        className="absolute object-cover inset-0"
        alt="Image not found"
      />
        )
          :
          <Image className="absolute object-cover inset-0" src={link} width={550} height={550} alt={'avatar'} />
      }
          </CldUploadButton>
      {/* {link && <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />} */}
    </>
  );
}