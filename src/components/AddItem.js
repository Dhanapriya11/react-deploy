// import React, { useState } from "react";
// import axios from "axios";

// const AddItem = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "",
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("description", formData.description);
//     data.append("category", formData.category);
//     data.append("image", formData.image);

//     await axios.post("http://localhost:5000/api/items/add", data);
//     alert("Item added successfully!");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="name" placeholder="Name" onChange={handleChange} />
//       <textarea name="description" placeholder="Description" onChange={handleChange} />
//       <input type="text" name="category" placeholder="Category" onChange={handleChange} />
//       <input type="file" name="image" onChange={handleImageChange} />
//       <button type="submit">Add Item</button>
//     </form>
//   );
// };

// export default AddItem;
