
import React from 'react'

import {assets} from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
    <div>
        <img src={assets.logo} className='mb-5 w-32' alt="logo" />
        <p className='w-full md:w-2/3 text-gray-500'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ipsam eum aspernatur, iure eius ducimus omnis illo ad. Earum nesciunt perspiciatis non autem iusto perferendis soluta aliquid. Nobis, aperiam repellendus!
        </p>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privicy Policy</li>

          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>Get In Touch</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1 2255-5522</li>
            <li>contact@example.com</li>

          </ul>
        </div>
        <div>
<hr />
<p className='py-5 text-sm text-center'>All rights reserved</p>
</div>
        
    </div>
  )
}

export default Footer
