import React from 'react'

import Title from '../components/Title'
import {assets} from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-10 my-10 mb-28">
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Get in Touch</p>
          <p className='text-gray-500'>
            Phone: (0123) 567-890 <br />
            Email: dev@example.com
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact