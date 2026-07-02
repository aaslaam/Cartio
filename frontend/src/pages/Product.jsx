import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import ProductReviews from '../components/ProductReviews'


const Product = () => {
  const { productId } = useParams()
  const { products, currency } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')


  const FetchProductData = async () => {
    {/* checks product id */}
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
      return null
    })
  }

  useEffect(() => {
    FetchProductData()
  }, [productId, products])

  return productData ? (
    <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* product img */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer'
                alt={productData.name}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt={productData.name} />
          </div>
        </div>
        {/* product details */}
        <div className='flex-1'>
          <h1 className='text-2xl mt-2 font-medium'>{productData.name}</h1>
          {/* product rating */}

          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="star_icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star_icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star_icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star_icon" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="star_dull_icon" className="w-3 5" />
            <p className="pl-2">(122)</p>
            {/* product rating end */}
          </div>
          <p className="mt-5 font-medium 3xl">{currency}{productData.price.toFixed(2)}</p>
          <p className="mt-3 md:w-3/4 text-gray-400">{productData.description}</p>
        {/* product details end */}

          <button className='bg-black text-white px-8 py-3 text-sm mt-5 active:bg-gray-800 cursor-pointer'>
            ADD TO CART
          </button>
          <hr className='mt-8 w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% original product</p>
            <p>COD is available</p>
            <p>Easy return and exchange</p>
          </div>
        </div>
      </div>

      {/* desc and review sec */}
      <ProductReviews description={productData.description} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product