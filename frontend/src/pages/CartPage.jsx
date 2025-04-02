import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const CartPage = () => {
    const { 
        cartItems = {}, 
        products = [], 
        currency = '$', 
        delivery_fee = 0, 
        updateCartItemQuantity, 
        removeFromCart 
    } = useContext(ShopContext);

    const getCartProducts = () => {
        if (!cartItems || typeof cartItems !== 'object') return [];

        return Object.keys(cartItems).map((itemId) => {
            const product = products.find((p) => p._id === itemId);
            if (!product) return null;
            return { 
                ...product, 
                quantity: cartItems[itemId], 
                price: product.discountedprice ?? 0
            };
        }).filter(Boolean);
    };

    const cartProducts = getCartProducts();

    const getCartAmount = () => {
        return cartProducts.reduce((total, product) => {
            return total + ((product.discountedprice ?? 0) * product.quantity);
        }, 0);
    };

    const subtotal = getCartAmount();
    const total = subtotal + (delivery_fee ?? 0);

    return (
        <div className="container mx-auto mt-10 px-4 lg:px-0">
            <h1 className="text-4xl font-bold text-center mb-10 text-[#6F4D38] ">Your Shopping Cart</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
                    {cartProducts.length > 0 ? (
                        cartProducts.map((product) => (
                            <div key={product._id} className="flex justify-between items-center mb-6 pb-4 border-b transition-transform transform hover:scale-105">
                                <div className="flex items-center">
                                    <img src={product.image?.[0] || '/placeholder.jpg'} 
                                         alt={product.name || 'Product'} 
                                         className="w-24 h-24 object-cover rounded-lg border shadow-sm" />
                                    <div className="ml-6">
                                        <h2 className="text-lg font-semibold text-gray-800">{product.name || 'Unknown Product'}</h2>
                                        <p className="text-gray-500 mt-1">Price: {currency}{(product.discountedprice ?? 0).toFixed(2)}</p>
                                        <div className="flex items-center mt-3">
                                            <button 
                                                onClick={() => updateCartItemQuantity(product._id, product.quantity - 1)}
                                                disabled={product.quantity <= 1}
                                                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 rounded-l-lg transition-colors duration-200"
                                            >
                                                <FaMinus className="text-gray-600" />
                                            </button>
                                            <span className="px-5 py-2 border text-lg font-semibold text-gray-700">{product.quantity}</span>
                                            <button 
                                                onClick={() => updateCartItemQuantity(product._id, product.quantity + 1)}
                                                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-r-lg transition-colors duration-200"
                                            >
                                                <FaPlus className="text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(product._id)} 
                                    className="text-red-500 hover:text-red-700 text-xl transition-colors duration-200"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    )}
                </div>

                {/* Cart Totals Section */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
                    <div className="flex justify-between mb-3 text-lg">
                        <p className="text-gray-600">Subtotal</p>
                        <p className="text-gray-800">{currency}{subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between mb-3 text-lg">
                        <p className="text-gray-600">Shipping Fee</p>
                        <p className="text-gray-800">{currency}{(delivery_fee ?? 0).toFixed(2)}</p>
                    </div>
                    <hr className="my-3 border-gray-200" />
                    <div className="flex justify-between text-xl font-bold">
                        <p className="text-gray-800">Total</p>
                        <p className="text-gray-800">{currency}{total.toFixed(2)}</p>
                    </div>
                   <NavLink to='/placeorder'><button className="w-full mt-6 py-3 bg-[#6F4D38]  text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105">
                        Proceed to Checkout
                    </button></NavLink> 
                </div>
            </div>
        </div>
    );
};

export default CartPage;