import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-5 font-medium'>

      {/* nav start */}
      <img src={assets.logo} alt="Logo" className='w-36' />

      {/* nav left side */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink className='flex flex-col items-center gap-1' to='/'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1' to='/collection'>
          <p>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1' to='/about'>
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1' to='/contact'>
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>
      {/* nav left end */}

      {/* nav right side */}
      <div className='flex items-center gap-6'>
        <img src={assets.search_icon} alt="search" className='w-5 cursor-pointer' />
      {/* profile dropdown start */}
        <div className='group relative'>
          <img src={assets.profile_icon} alt="profile" className='w-5 cursor-pointer' />
            <div className='group-hover:block hidden right-0 absolute dropdown-menu pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-lg shadow-lg'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>
      {/* profile dropdown end */}
      <Link to='/cart' className='relative'>
        <img src={assets.Cart_icon} alt="cart" className='w-5 min-w-5 cursor-pointer' />
        <p className='absolute right-[-5px] bottom-[-5px] bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center'>0</p>
      </Link>
      </div>
      {/* nav right end */}
    </div>
  )
}

export default Navbar