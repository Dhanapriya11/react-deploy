import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DressDetails.css";
import { useCart } from "./CartContext";
import { FaShoppingCart, FaMoneyBillWave, FaTshirt } from 'react-icons/fa';

const DressDetails = () => {
    const { id } = useParams();
    const [dress, setDress] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { addToCart } = useCart();
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`http://localhost:4000/dresses/${id}`)
            .then(response => setDress(response.data))
            .catch(error => console.error("Error fetching dress details:", error));

        axios.get(`http://localhost:4000/comments/${id}`)
            .then(response => setComments(response.data))
            .catch(error => console.error("Error fetching comments:", error));
    }, [id]);

    const handleAddComment = () => {
        if (newComment.trim() === "") return;
    
        axios.post(`http://localhost:4000/comments/${id}`, { 
            user: "Guest",
            text: newComment, 
            rating: 5
        })
        .then(response => {
            setComments([...comments, response.data]);
            setNewComment("");
        })
        .catch(error => console.error("Error adding comment:", error));
    };
    
    // const handleBuyNow = () => {
    //     navigate(`/checkout/${id}`);
    // };

    const handleVisualTryOn = () => {
        navigate(`/try-on/${id}`);
    };

    if (!dress) return <div className="loading">Loading...</div>;

    return (
        <div className="dress-details">
            <img src={dress.image} alt={dress.name} className="dress-image" />
            <h2>{dress.name}</h2>
            <p className="price">₹{dress.price}</p>
            <p className="description">{dress.description}</p>
            <p className="rating">Rating: {'⭐'.repeat(dress.rating)}</p>
            {dress.offers && <p className="offers">{dress.offers}</p>}

            <div className="buttons-container">
                <button onClick={() => addToCart(dress)} className="cart-button">
                    <FaShoppingCart className="button-icon" />
                    Add to Cart
                </button>
                <button onClick={() => addToCart(dress)}className="buy-button">
                    <FaMoneyBillWave className="button-icon" />
                    Buy Now
                </button>
                <button onClick={handleVisualTryOn} className="try-on-button">
                    <FaTshirt className="button-icon" />
                    Try It On
                </button>
            </div>
        
            <div className="comments">
                <h3>User Comments</h3>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <p key={index}><strong>{comment.user}:</strong> {comment.text}</p>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Submit</button>
            </div>
        </div>
    );
};

export default DressDetails;
