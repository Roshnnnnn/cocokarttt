// 'use client';

// import { useState, useEffect } from 'react';
// import { db } from '../firebase/config';
// import { 
//   collection, 
//   query, 
//   orderBy, 
//   limit, 
//   onSnapshot,
//   where,
//   getDocs,
//   Timestamp,
//   serverTimestamp
// } from 'firebase/firestore';

// export const useDashboardData = () => {
//   const [stats, setStats] = useState({
//     totalRevenue: 0,
//     onlinePayments: 0,
//     codPayments: 0,
//     activeUsers: 0,
//     totalOrders: 0,
//     pendingOrders: 0,
//     totalProducts: 0
//   });
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [activeUsers, setActiveUsers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (typeof window === 'undefined' || !db) {
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         // Get products
//         const productsRef = collection(db, 'products');
//         const productsSnapshot = await getDocs(productsRef);
//         const productsData = productsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setProducts(productsData);

//         // Get orders
//         const ordersRef = collection(db, 'orders');
//         const ordersQuery = query(ordersRef, orderBy('createdAt', 'desc'), limit(10));
//         const pendingOrdersQuery = query(ordersRef, where('status', '==', 'pending'));
        
//         // Get users
//         const usersRef = collection(db, 'users');
//         const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
//         const activeUsersQuery = query(usersRef, where('lastActive', '>=', thirtyMinutesAgo));

//         // Get order stats
//         const ordersSnapshot = await getDocs(ordersRef);
//         let totalRevenue = 0;
//         let onlinePayments = 0;
//         let codPayments = 0;

//         ordersSnapshot.forEach(doc => {
//           const order = doc.data();
//           const amount = parseFloat(order.amount) || 0;
//           totalRevenue += amount;
//           if (order.paymentMethod === 'online') {
//             onlinePayments += amount;
//           } else {
//             codPayments += amount;
//           }
//         });

//         const pendingOrdersSnapshot = await getDocs(pendingOrdersQuery);
//         const activeUsersSnapshot = await getDocs(activeUsersQuery);

//         // Set stats
//         setStats({
//           totalRevenue,
//           onlinePayments,
//           codPayments,
//           activeUsers: activeUsersSnapshot.size,
//           totalOrders: ordersSnapshot.size,
//           pendingOrders: pendingOrdersSnapshot.size,
//           totalProducts: productsSnapshot.size
//         });

//         // Listen for recent orders
//         const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
//           const orders = snapshot.docs.map(doc => {
//             const data = doc.data();
//             return {
//               id: doc.id,
//               user: data.userName || 'Anonymous',
//               amount: parseFloat(data.amount) || 0,
//               status: data.status || 'Processing',
//               payment: data.paymentMethod || 'COD',
//               createdAt: data.createdAt || serverTimestamp(),
//               items: data.items || []
//             };
//           });
//           setRecentOrders(orders);
//         });

//         // Listen for active users
//         const unsubscribeUsers = onSnapshot(activeUsersQuery, (snapshot) => {
//           const users = snapshot.docs.map(doc => {
//             const data = doc.data();
//             return {
//               id: doc.id,
//               name: data.name || 'Anonymous',
//               email: data.email || '',
//               lastActive: data.lastActive ? new Date(data.lastActive.toDate()).toLocaleString() : 'Unknown',
//               cartItems: (data.cart && data.cart.length) || 0
//             };
//           });
//           setActiveUsers(users);
//         });

//         setLoading(false);
//         return () => {
//           unsubscribeOrders();
//           unsubscribeUsers();
//         };
//       } catch (err) {
//         console.error('Error fetching dashboard data:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { stats, recentOrders, activeUsers, loading, error };
// };
