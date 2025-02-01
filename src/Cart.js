// import { useCart } from "./CartContext";
// import { Link } from "react-router-dom";

// const Cart = () => {
//     const { cart, removeFromCart } = useCart();

//     return (
//         <div>
//             <h2>Shopping Cart</h2>
//             {cart.length === 0 ? <p>Your cart is empty</p> : (
//                 cart.map((item, index) => (
//                     <div key={index}>
//                         <h4>{item.name}</h4>
//                         <p>₹{item.price}</p>
//                         <button onClick={() => removeFromCart(item._id)}>Remove</button>
//                     </div>
//                 ))
//             )}
//             <Link to="/checkout">Proceed to Checkout</Link>
//         </div>
//     );
// };
// export default Cart;
