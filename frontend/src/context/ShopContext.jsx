import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { products } from "../assets/assets";


export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const currency = '₹'
    const delivery_fee = 10
    const [ShowSearch, SetShowSearch] = useState(false)
    const [Search, SetSearch] = useState('')
    const [CartItems, SetCartItems] = useState({})
    const Navigate = useNavigate()

    {/* add to cart */}
    const AddToCart = async (ItemId, quantity = 1) => {
        let CartData = structuredClone(CartItems)
        if (CartData[ItemId]) {
            CartData[ItemId] += quantity
        } else {
            CartData[ItemId] = quantity
        }
        SetCartItems(CartData)
    }

    {/* update quantity or remove item */}
    const UpdateQuantity = async (ItemId, quantity) => {
        let CartData = structuredClone(CartItems)
        if (quantity <= 0) {
            delete CartData[ItemId]
        } else {
            CartData[ItemId] = quantity
        }
        SetCartItems(CartData)
    }

    {/* get count cart items */}
    const CartCount = () => {
        let count = 0
        for (const items in CartItems) {
            if (CartItems[items] > 0) {
                count += CartItems[items]
            }
        }
        return count
    }

    {/* get total price of cart items */}
    const GetTotal = () => {
        let TotalAmount = 0
        for (const items in CartItems) {
            let itemInfo = products.find((product) => product._id === items)
            if (itemInfo && CartItems[items] > 0) {
                TotalAmount += itemInfo.price * CartItems[items]
            }
        }
        return TotalAmount
    }

    useEffect(() => {
        console.log(CartItems);
    }, [CartItems])

    const value = {
        products, currency, delivery_fee, ShowSearch, SetShowSearch, Search, SetSearch, AddToCart, UpdateQuantity, CartItems, CartCount, GetTotal,Navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider