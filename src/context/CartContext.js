// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [cartTotal, setCartTotal] = useState(0);

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       const parsedCart = JSON.parse(savedCart);
//       setCartItems(parsedCart.items);
//       setCartTotal(parsedCart.total);
//     }
//   }, []);

//   // Save cart to localStorage on change
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify({
//       items: cartItems,
//       total: cartTotal
//     }));
//   }, [cartItems, cartTotal]);

//   const addToCart = (product) => {
//     const existingItem = cartItems.find(item => item.id === product.id);
    
//     if (existingItem) {
//       // If item already exists, increase quantity
//       setCartItems(cartItems.map(item => 
//         item.id === product.id 
//           ? { ...item, quantity: item.quantity + 1 } 
//           : item
//       ));
//     } else {
//       // If item doesn't exist, add it with quantity 1
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     }

//     // Update cart total
//     const newTotal = cartTotal + (product.price || 0);
//     setCartTotal(newTotal);
//   };

//   const removeFromCart = (itemId) => {
//     const updatedItems = cartItems.filter(item => item.id !== itemId);
//     setCartItems(updatedItems);
    
//     // Update cart total
//     const removedItem = cartItems.find(item => item.id === itemId);
//     if (removedItem) {
//       setCartTotal(cartTotal - (removedItem.price * removedItem.quantity));
//     }
//   };

//   const updateQuantity = (itemId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(itemId);
//       return;
//     }

//     setCartItems(cartItems.map(item => 
//       item.id === itemId 
//         ? { ...item, quantity: newQuantity } 
//         : item
//     ));

//     // Update cart total
//     const oldItem = cartItems.find(item => item.id === itemId);
//     const priceDiff = oldItem.price * (newQuantity - oldItem.quantity);
//     setCartTotal(cartTotal + priceDiff);
//   };

//   return (
//     <CartContext.Provider value={{
//       cartItems,
//       cartTotal,
//       addToCart,
//       removeFromCart,
//       updateQuantity
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };
