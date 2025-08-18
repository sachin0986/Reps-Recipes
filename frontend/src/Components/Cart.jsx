import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Load cart items from localStorage
        const loadCartItems = () => {
            const items = JSON.parse(localStorage.getItem('cartItems')) || [];
            setCartItems(items);
        };

        // Initial load
        loadCartItems();

        // Listen for cart updates
        window.addEventListener('cartUpdated', loadCartItems);

        return () => {
            window.removeEventListener('cartUpdated', loadCartItems);
        };
    }, []);

    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        window.dispatchEvent(new Event('cartUpdated'));
        
        toast.success('Item removed from cart!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        
        const updatedCart = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseInt(item.priceforHalf) || parseInt(item.price);
            return total + (price * (item.quantity || 1));
        }, 0);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
                
                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Your cart is empty</p>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <li key={item.id} className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img 
                                                src={item.imageURL} 
                                                alt={item.name}
                                                className="h-20 w-20 object-cover rounded-lg"
                                            />
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-500">Category: {item.category}</p>
                                                <p className="text-sm text-gray-500">
                                                    Price: ₹{item.priceforHalf || item.price}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                                                    className="px-2 py-1 border rounded hover:bg-gray-100"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center">{item.quantity || 1}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                                                    className="px-2 py-1 border rounded hover:bg-gray-100"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-medium text-gray-900">
                                    Total Items: {cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}
                                </span>
                                <span className="text-lg font-medium text-gray-900">
                                    Total: ₹{calculateTotal()}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage; 