import React, { useContext, useState } from 'react'

import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets'

const Collection = () => {
  const [showFilter,SetShowFilter] = useState(true)
  const {products} = useContext(ShopContext)
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter */}
      <div className='min-w-60'>
        <p  onClick={()=>{
          SetShowFilter(!showFilter)
        }} className='my-2 flex items-center cursor-pointer text-xl gap-2'>Filters
        <img  className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="dropdown_icon" />
        </p>
        {/* category filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Categories</p>
          <div className='flex flex-col gap-2 font-light text-sm text-gray-700'>
            <p className='flex gap-2 '>
              <input type="checkbox"  className='w-3 cursor-pointer' value={'men'} />MEN        
            </p>
             <p className='flex gap-2'>
              <input type="checkbox"  className='w-3 cursor-pointer' value={'women'} />WOMEN
              </p>
               <p className='flex gap-2'>
              <input type="checkbox"  className='w-3 cursor-pointer' value={'kids'} />KIDS
              </p>

          </div>
        </div>
         {/* SubCategory filter */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPES</p>
          <div className='flex flex-col gap-2 font-light text-sm text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox"  className='w-3 cursor-pointer' value={'topwear'} />TOPWEAR    
            </p>
             <p className='flex gap-2'>
              <input type="checkbox"  className='w-3 cursor-pointer' value={'bottomware'} />BOTTOMWEAR
              </p>
               <p className='flex gap-2'>
              <input type="checkbox"  className='w-3 cursor-pointer' value={'winterwear'} />WINTERWEAR
              </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection