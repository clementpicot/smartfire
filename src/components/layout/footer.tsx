import Link from 'next/link'
import React from 'react'
import Logo from './logo'

export default function Footer() {
  return (
    <footer className='bg-accent w-full'>
        <div className='md:flex justify-between gap-8 py-10 px-6 md:px-10'>
            <div className='sm:flex items-center gap-8'>
                <div>
                    <Logo variant='invert' />
                </div>
                <p className='text-white text-xs font-medium mt-4 sm:mt-0'>© 2025 Repubic GROUP Trademarks and brands are the property of their respective owners.</p>
            </div>
            <div className='flex items-center gap-8 *:text-white *:uppercase *:font-extrabold *:text-xs mt-8 md:mt-0'>
                <p><Link href="">Privacy Policy</Link></p>
                <p><Link href="">Legal Informations</Link></p>
            </div>
        </div>
    </footer>
  )
}
