// import React, { useEffect, useRef, useState } from "react";
// import { fabric } from "fabric";

// const VirtualTryOn = () => {
//   const canvasRef = useRef(null);
//   const [canvas, setCanvas] = useState(null);
//   const [userImage, setUserImage] = useState(null);
//   const [itemImage, setItemImage] = useState(null);

//   // Initialize the canvas
//   useEffect(() => {
//     const fabricCanvas = new fabric.Canvas(canvasRef.current, {
//       width: 600,
//       height: 600,
//       backgroundColor: "#f3f3f3",
//     });
//     setCanvas(fabricCanvas);
//   }, []);

//   // Load user image on the canvas
//   useEffect(() => {
//     if (canvas && userImage) {
//       fabric.Image.fromURL(userImage, (img) => {
//         img.scaleToWidth(600); // Scale to fit the canvas width
//         img.selectable = false; // Lock the background image
//         canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
//       });
//     }
//   }, [canvas, userImage]);

//   // Add item to the canvas
//   const addItemToCanvas = (imageUrl) => {
//     fabric.Image.fromURL(imageUrl, (img) => {
//       img.scaleToWidth(200); // Scale the item to a smaller size
//       img.top = canvas.height / 2 - 100; // Center the item vertically
//       img.left = canvas.width / 2 - 100; // Center the item horizontally
//       img.hasBorders = true; // Allow resizing
//       canvas.add(img).setActiveObject(img);
//       canvas.renderAll();
//     });
//   };

//   // Handle user image upload
//   const handleUserImageUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => setUserImage(reader.result);
//     reader.readAsDataURL(file);
//   };

//   // Handle item image upload
//   const handleItemImageUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       setItemImage(reader.result);
//       addItemToCanvas(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div>
//       <h1>Virtual Try-On</h1>
//       <div>
//         <label>
//           Upload User Image:
//           <input type="file" accept="image/*" onChange={handleUserImageUpload} />
//         </label>
//       </div>
//       <div>
//         <label>
//           Upload Item Image:
//           <input type="file" accept="image/*" onChange={handleItemImageUpload} />
//         </label>
//       </div>
//       <div style={{ marginTop: "20px" }}>
//         <canvas ref={canvasRef} />
//       </div>
//       <button
//         style={{
//           marginTop: "10px",
//           padding: "10px 20px",
//           background: "#4CAF50",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//         onClick={() => {
//           const dataURL = canvas.toDataURL();
//           const link = document.createElement("a");
//           link.href = dataURL;
//           link.download = "virtual-try-on.png";
//           link.click();
//         }}
//       >
//         Download Try-On Image
//       </button>
//     </div>
//   );
// };

// export default VirtualTryOn;
