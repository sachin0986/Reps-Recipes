import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Trash2, Plus, Minus } from 'lucide-react';

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
        const updatedItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        window.dispatchEvent(new Event('cartUpdated'));
        toast.success('Item removed from cart!');
    };

    const updateQuantity = (itemId, change) => {
        const updatedItems = cartItems.map(item => {
            if (item.id === itemId) {
                const newQuantity = Math.max(1, (item.quantity || 1) + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.priceforHalf || item.price || 0;
            const quantity = item.quantity || 1;
            return total + (price * quantity);
        }, 0);
    };

    const handleCheckout = () => {
        // Clear the cart
        setCartItems([]);
        localStorage.removeItem('cartItems');
        window.dispatchEvent(new Event('cartUpdated'));
        
        // Show success message
        toast.success('Order Placed Successfully! 🎉', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
                        <p className="mt-2 text-gray-600">Add some items to your cart to see them here!</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
                
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    {cartItems.map((item) => (
                        <div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={item.imageURL} 
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                        <p className="text-lg font-medium text-blue-600">
                                            ₹{(item.priceforHalf || item.price || 0) * (item.quantity || 1)}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="p-1 rounded-full hover:bg-gray-100"
                                        >
                                            <Minus className="w-5 h-5 text-gray-600" />
                                        </button>
                                        <span className="text-lg font-medium">{item.quantity || 1}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="p-1 rounded-full hover:bg-gray-100"
                                        >
                                            <Plus className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                    
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-lg font-medium text-gray-900">
                                Total Items: {cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}
                            </p>
                            <p className="text-2xl font-bold text-blue-600">
                                Total: ₹{calculateTotal()}
                            </p>
                        </div>
                        <button 
                            onClick={handleCheckout}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage; 