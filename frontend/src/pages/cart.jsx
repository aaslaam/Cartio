import React, { useContext, useState, useEffect } from 'react'

import { ShopContext } from '../context/ShopContext'
import Tittle from '../components/Title'
import CartTotal from '../components/CartTotal'


const Cart = () => {
  const { currency, CartItems, products, UpdateQuantity } = useContext(ShopContext)

  const [CartData, SetCartData] = useState([])

  useEffect(() => {
    const TempData = []
    for (const itemId in CartItems) {
      if (CartItems[itemId] > 0) {
        TempData.push({
          _id: itemId,
          quantity: CartItems[itemId]
        })
      }
    }
    SetCartData(TempData)
  }, [CartItems])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Tittle text1='YOUR' text2='CART' />
      </div>

      <div>
        {CartData.map((item) => {
          const productData = products.find((product) => product._id === item._id)

          if (!productData) return null

          return (
            <div key={item._id} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <p className='mt-1'>{currency}{productData.price.toFixed(2)}</p>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <button
                  onClick={() => UpdateQuantity(item._id, item.quantity - 1)}
                  className='w-7 h-7 border border-gray-400 flex items-center justify-center cursor-pointer'
                >
                  -
                </button>
                <p className='w-6 text-center'>{item.quantity}</p>
                <button
                  onClick={() => UpdateQuantity(item._id, item.quantity + 1)}
                  className='w-7 h-7 border border-gray-400 flex items-center justify-center cursor-pointer'
                >
                  +
                </button>
              </div>

              <img
                onClick={() => UpdateQuantity(item._id, 0)}
                className='w-4 mr-4 sm:w-5 cursor-pointer'
                src="/src/assets/bin_icon.png"
                alt="remove"
              />
            </div>
          )
        })}
      </div>

      {CartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart