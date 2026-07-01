import React, { useContext, useMemo, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const [showFilter, SetShowFilter] = useState(true)
  const { products } = useContext(ShopContext)
  const [Category, SetCategory] = useState([])
  const [SubCategory, SetSubCategory] = useState([])

  const toggleCategory = (e)=>{
    if(Category.includes(e.target.value)){
      SetCategory(prev=>prev.filter((item)=>item!==e.target.value))
    }else{
      SetCategory(prev=>[...prev,e.target.value])
    }
  }
  const toggleSubCategory = (e)=>{
    if(SubCategory.includes(e.target.value)){
      SetSubCategory(prev=>prev.filter((item)=>item!==e.target.value))
    }else{
      SetSubCategory(prev=>[...prev,e.target.value])
    }
  }

  const FilterProducts = useMemo(() => {
    let productsCopy = products.slice()
    if(Category.length>0){
      productsCopy = productsCopy.filter((item)=>Category.includes(item.category))
    }
    if(SubCategory.length>0){
      productsCopy = productsCopy.filter((item)=>SubCategory.includes(item.subCategory))
    }
    return productsCopy
  }, [products, Category, SubCategory])
 console.log('Category:', Category)
console.log('product category value:', products[0].category)

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter */}
      <div className='min-w-60'>
        <p onClick={() => SetShowFilter(!showFilter)} className='my-2 flex items-center cursor-pointer text-xl gap-2'>
          Filters
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="dropdown_icon" />
        </p>

        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 font-light text-sm text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'Men'} onChange={toggleCategory}/>MEN
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'Women'} onChange={toggleCategory} />WOMEN
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'Kids'} onChange={toggleCategory} />KIDS
            </p>
          </div>
        </div>

        {/* subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 font-light text-sm text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'Topwear'} onChange={toggleSubCategory}/>TOPWEAR
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'Bottomwear'} onChange={toggleSubCategory} />BOTTOMWEAR
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3 cursor-pointer' value={'Winterwear'} onChange={toggleSubCategory} />WINTERWEAR
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className='flex-1'>
        <div className='flex  items-center justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* sort */}
          <select className='border border-gray-300 text-sm py-2'>
            <option value="relevent">Sort by: Relevent</option>
            <option value="high-low">Sort by: High-Low</option>
            <option value="low-high">Sort by: Low-High</option>
          </select>
        </div>

        {/* all products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {FilterProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection