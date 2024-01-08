import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
      <div>
          <header className="flex items-center justify-between">
        <Link href="" className='text-emerald-500 font-semibold text-2xl'>CLOUD Kitchen</Link>
        <nav className='flex items-center gap-8'>
          <Link href={""}>Home</Link>
          <Link href={""}>Menu</Link>
          <Link href={""}>About</Link>
          <Link href={""}>Contact</Link>
          <Link href={""} className='bg-emerald-500 text-white px-8 py-2 rounded-full'>Login</Link>
        </nav>
     </header>
    </div>
  )
}
