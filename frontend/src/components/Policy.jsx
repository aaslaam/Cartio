import React from 'react'

import {assets} from '../assets/assets'

const Policy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs small:text-sm md:text-base color-gray-700'>
        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-2' alt="exchange_icon" />
            <p className='font-semibold'>Lorem Ipsum</p>
            <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
     <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-2' alt="quality_icon" />
            <p className='font-semibold'>Lorem Ipsum</p>
            <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div>
            <img src={assets.support_img} className='w-12 m-auto mb-2' alt="support_img" />
            <p className='font-semibold'>Lorem Ipsum</p>
            <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        </div>
  )
}

export default Policy