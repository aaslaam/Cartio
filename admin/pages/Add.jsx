// add products

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { assets } from "../assets/assets";
import { backendUrl } from "../src/App";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Ceramic");
  const [subCategory, setSubCategory] = useState("Dinner Plates");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // append existing data with new data
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", desc);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDesc("");
        setPrice("");
        setBestseller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full max-w-96 px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Type here..."
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className="w-full max-w-96 px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Type here..."
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 w-full">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-40 px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Ceramic">Ceramic</option>
            <option value="Porcelain">Porcelain</option>
            <option value="Melamine">Melamine</option>
          </select>
        </div>

        <div>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-40 px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Dinner Plates">Dinner Plates</option>
            <option value="Side Plates">Side Plates</option>
            <option value="Serving Bowls">Serving Bowls</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full sm:w-32 px-3 py-2 border border-gray-300 rounded-md"
            type="number"
            placeholder="25"
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add To Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 cursor-pointer bg-black text-white"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
