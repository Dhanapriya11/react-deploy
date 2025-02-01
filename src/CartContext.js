import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        const existingItem = cart.find(i => i._id === item._id);
        if (existingItem) {
            // If item exists, increase quantity
            const updatedCart = cart.map(i => 
                i._id === item._id 
                    ? { ...i, quantity: (i.quantity || 1) + 1 }
                    : i
            );
            setCart(updatedCart);
        } else {
            // If item doesn't exist, add it with quantity 1
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item._id !== id));
    };

    const totalPrice = cart.reduce((total, item) => 
        total + item.price * (item.quantity || 1), 0
    );

    return (
        <CartContext.Provider value={{ 
            cart, 
            setCart,
            addToCart, 
            removeFromCart, 
            totalPrice 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
