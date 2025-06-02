'use client';

import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  where,
  getDocs,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';

export const useDashboardData = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    onlinePayments: 0,
    codPayments: 0,
    activeUsers: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalProducts: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !db) {
      return;
    }

    const fetchData = async () => {
      try {
        // Get products
        const productsRef = collection(db, 'products');
        const productsSnapshot = await getDocs(productsRef);
        const productsData = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);

        // Get orders
        const ordersRef = collection(db, 'orders');
        const ordersQuery = query(ordersRef, orderBy('createdAt', 'desc'), limit(10));
        const ordersSnapshot = await getDocs(ordersQuery);
        const ordersData = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecentOrders(ordersData);

        // Get pending orders count
        const pendingOrdersQuery = query(ordersRef, where('status', '==', 'pending'));
        const pendingOrdersSnapshot = await getDocs(pendingOrdersQuery);
        const pendingOrdersCount = pendingOrdersSnapshot.size;

        // Calculate stats
        const totalRevenue = ordersData.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        const onlinePayments = ordersData.filter(order => order.paymentMethod === 'online').length;
        const codPayments = ordersData.filter(order => order.paymentMethod === 'cod').length;

        setStats(prev => ({
          ...prev,
          totalRevenue,
          onlinePayments,
          codPayments,
          totalOrders: ordersData.length,
          pendingOrders: pendingOrdersCount,
          totalProducts: productsData.length
        }));

        // Listen for orders
        const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
          const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            payment: doc.data().paymentMethod || 'COD',
            createdAt: doc.data().createdAt || serverTimestamp(),
            items: doc.data().items || []
          }));
          setRecentOrders(orders);
        });

        // Listen for active users
        const activeUsersQuery = query(collection(db, 'users'), where('active', '==', true));
        const unsubscribeUsers = onSnapshot(activeUsersQuery, (snapshot) => {
          const users = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || 'Anonymous',
              email: data.email || '',
              lastActive: data.lastActive ? new Date(data.lastActive.toDate()).toLocaleString() : 'Unknown',
              cartItems: (data.cart && data.cart.length) || 0
            };
          });
          setActiveUsers(users);
        });

        setLoading(false);
        return () => {
          unsubscribeOrders();
          unsubscribeUsers();
        };
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { stats, recentOrders, activeUsers, loading, error };
};
