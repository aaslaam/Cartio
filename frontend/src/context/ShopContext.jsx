import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const currency = '₹'
    const delivery_fee = 10
    const [ShowSearch, SetShowSearch] = useState(false)
    const [Search, SetSearch] = useState('')
    const [CartItems, SetCartItems] = useState({})

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

    useEffect(() => {
        console.log(CartItems);
    }, [CartItems])

    const value = {
        products, currency, delivery_fee, ShowSearch, SetShowSearch, Search, SetSearch, AddToCart, CartItems, CartCount
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider