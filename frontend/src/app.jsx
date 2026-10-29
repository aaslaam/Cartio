import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./pages/home";
import Contact from "./pages/contact";
import Collection from "./pages/collection";
import About from "./pages/about";
import Login from "./pages/login";
import PlaceOrder from "./pages/placeorder";
import Orders from "./pages/orders";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Nav from "./components/nav";
import Footer from "./components/footer";
import SearchBar from "./components/searchbar";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Nav />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
