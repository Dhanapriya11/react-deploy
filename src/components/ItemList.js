// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ItemList = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/items").then((response) => {
//       setItems(response.data);
//     });
//   }, []);

//   return (
//     <div>
//       {items.map((item) => (
//         <div key={item._id}>
//           <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} />
//           <h3>{item.name}</h3>
//           <p>{item.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ItemList;
