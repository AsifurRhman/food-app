import React from 'react'
import Right from '../Icons/Right'
import Image from 'next/image'
import Link from 'next/link'

export default function CoverSection() {
  return (
    <div className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          Everything<br />
          is better<br />
          with a&nbsp;
          <span className="text-emerald-500">
            Pizza
          </span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life
        </p>
        <div className="flex gap-4 text-sm">
          <button className="flex justify-center bg-emerald-500 uppercase  items-center gap-2 text-white px-4 py-2 rounded-full">
            
            <Link href='/menu'>Order now</Link>
            <Right />
          </button>
          <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image src={'/pizza.png'} Layout={'fill'} objectFit={'contain'} alt={'pizza'} width={500} height={500} />
      </div>
    </div>
  )
}
