import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>

        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            <div>
                <img className='mb-5 w-32'  src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>Stay connected with us for exclusive offers, latest collections, and updates. Subscribe to our newsletter and follow us on social media for style inspiration and special deals.</p>
            </div>

            <div>
                <p className='text-x1 font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>

                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>

                </ul>
            </div>


            <div>
                <p className='text-x1 font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 9150186733</li>
                    <li>arockiajones2003@gmail.com</li>
                    
                </ul>
            </div>

             
        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2026@ E-Commerce App - All rights reserved.</p>
        </div>

    </div>
  )
}

export default Footer