import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './index.css'

import Home from './pages/Home'
import Contact from './pages/Contact'
import Collection from './pages/Collection'
import About from './pages/About'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Nav from './components/nav'


const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </div>
  )
}

export default App