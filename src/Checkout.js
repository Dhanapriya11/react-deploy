// import { useState } from "react";
// import { useCart } from "./CartContext"; // Import cart context
// import paytmQR from "./paytmQR.jpg"; // Your Paytm QR code image

// const Checkout = () => {
//     const { totalPrice } = useCart(); // Get total cart price
//     const [showQR, setShowQR] = useState(false);

//     const handlePaymentClick = () => {
//         setShowQR(true);
//     };

//     return (
//         <div className="checkout">
//             <h2>Checkout</h2>
//             <p><strong>Total Amount: ₹{totalPrice}</strong></p> {/* Display total price */}

//             {!showQR ? (
//                 <button onClick={handlePaymentClick} className="pay-button">
//                     Pay Now
//                 </button>
//             ) : (
//                 <div className="qr-section">
//                     <h3>Scan & Pay with Paytm</h3>
//                     <img src={paytmQR} alt="Paytm QR Code" className="qr-code" />
//                     <p>After payment, upload your screenshot below.</p>
//                     <input type="file" accept="image/*" />
//                     <button className="confirm-button">Confirm Payment</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Checkout;
