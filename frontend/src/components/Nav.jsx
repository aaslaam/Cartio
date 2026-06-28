import React from 'react'

import {assets}from '../assets/assets'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
return(
    // navbar start
<div className='flex items-center justify-between py-5 font-medium'>
<img src={assets.logo} alt="Logo" className='w-36' />
{/* nav left side */}
<ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
    <NavLink className='flex flex-col items-center gap-1' to='/'>
    <p>Home</p>
    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
    </NavLink>
     <NavLink className='flex flex-col items-center gap-1' to='/collection'>
    <p>Collection</p>
    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
    </NavLink>
     <NavLink className='flex flex-col items-center gap-1' to='/about'>
    <p>About</p>
    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
    </NavLink>
    <NavLink className='flex flex-col items-center gap-1' to='/contact'>
    <p>Contact</p>
    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
    </NavLink>
</ul>
{/* nav left end */}

{/* nav right side */}
<div className='flex items-center gap-6'>
    <img src={assets.search_icon} alt="search" className='w-5 cursor-pointer'/>
    <div className='group relative'>
    <img src={assets.profile_icon} alt="profile" className='w-5 cursor-pointer'/>
    <div className='group-hover:block hidden right-0 absolute dropdown-menu pt-4 '>

    </div>
{/* dropdown close */}
</div>
{/* profile div close */}
</div>
{/* search div close */}
</div>
{/* nav close */}
)

}
export default Navbar