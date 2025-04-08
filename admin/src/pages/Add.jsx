import { useState } from "react";
import axios from "axios";

const Add = ({ token }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    Shortdescription: "",
    actualprice: "",
    discountedprice: "",
    category: "",
    offer: "",
    images: [], 
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files }); // Ensure correct field
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "images") {
        formDataToSend.append(key, formData[key]);
      }
    });

    formData.images.forEach((image, index) => {
      formDataToSend.append(`image${index + 1}`, image);
    });

    try {
      const response = await axios.post(
        "https://mitli.in/api/product/add",
        formDataToSend,
        {
          headers: { token, "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Error adding product");
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="Shortdescription"
          placeholder="Short Description"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
        <input
          type="number"
          name="actualprice"
          placeholder="Actual Price"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="discountedprice"
          placeholder="Discounted Price"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="offer"
          placeholder="Offer (Optional)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-3 flex-wrap">
          {previewImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="preview"
              className="w-24 h-24 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition-all"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
