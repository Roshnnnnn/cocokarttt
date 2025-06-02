'use client'

import React, { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, doc, serverTimestamp, onSnapshot } from '@firebase/firestore'
import { db } from '../../../src/firebase/config'
import Image from 'next/image'
import { FiFilter, FiX, FiShoppingCart } from 'react-icons/fi'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={`text-base ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-200'}`}>
      ★
    </span>
  ));
  return <div className="flex items-center">{stars}</div>;
};

const ProductCard = ({ product, view = 'grid', onAddToCart }) => (
  <div className="bg-white rounded-lg border hover:shadow-lg transition-all duration-300 h-full">
    {/* Mobile layout (horizontal card) */}
    <div className="sm:hidden flex">
      <div className="relative h-32 w-32 flex-shrink-0 bg-gray-50 border-r">
        {/* <Image
          src={product.images.image}
          alt={product.brand}
          fill={true}
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw"
          priority={undefined}
        /> */}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <div className="mb-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-0.5 line-clamp-1">{product.name}</h3>
          <p className="text-xs text-gray-500 uppercase">{product.brand}</p>
        </div>
        
        <div className="flex items-center gap-1 mb-1">
          <StarRating rating={product.rating || 0} />
          <span className="text-xs text-gray-500">({product.rating})</span>
        </div>

        <p className="text-xs text-gray-600 mb-2">{product.description}</p>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <div className="text-base font-bold text-orange-500">
              ₹{product.price?.toFixed(2)}
            </div>
            <div className="text-xs text-green-600 font-medium">
              {Math.floor(Math.random() * 35) + 5}% off
            </div>
          </div>

          <button 
            onClick={() => onAddToCart(product)}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-all duration-300 flex items-center justify-center text-xs font-medium shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <FiShoppingCart className="w-4 h-4 mr-1" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>

    {/* Desktop layout (vertical card) */}
    <div className="hidden sm:block">
      <div className="relative h-48 w-full bg-gray-50 border-b group">
        {/* <Image
          src={product.images.image}
          alt={product.brand}
          fill={true}
          className="object-contain p-4"
          sizes="(max-width: 1200px) 50vw, 33vw"
          priority={undefined}
        /> */}
      </div>
      <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
        <div className="mb-2">
          <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 uppercase">{product.brand}</p>
        </div>
        
        <div className="flex items-center gap-1.5 mb-2">
          <StarRating rating={product.rating || 0} />
          <span className="text-sm text-gray-500">({product.rating})</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <div className="text-lg font-bold text-orange-500">
              ₹{product.price?.toFixed(2)}
            </div>
            <div className="text-xs text-green-600 font-medium">
              {Math.floor(Math.random() * 35) + 5}% off
            </div>
          </div>

          <button 
            onClick={() => onAddToCart(product)}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-all duration-300 flex items-center justify-center text-sm font-medium shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <FiShoppingCart className="w-4 h-4 mr-1" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  </div>
)

const Products = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  // Listen to cart changes
  useEffect(() => {
    if (!user) return;

    const cartRef = collection(db, 'users', user.uid, 'cart');
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCartItems(items);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddToCart = async (product) => {
    console.log('Adding to cart:', product);
    
    if (!user) {
      console.log('User not logged in');
      toast.error('Please login to add items to cart', {
        description: 'Redirecting to login page...'
      });
      router.push('/login');
      return;
    }

    try {
      console.log('Current user:', user.uid);
      // Get user's cart reference
      const cartRef = collection(db, 'users', user.uid, 'cart');
      console.log('Cart reference:', cartRef);
      
      // Check if item already exists in cart
      const cartSnapshot = await getDocs(cartRef);
      console.log('Cart snapshot:', cartSnapshot.docs.map(doc => doc.data()));
      
      const existingItem = cartSnapshot.docs.find(doc => doc.data().productId === product.id);
      console.log('Existing item:', existingItem?.data());

      if (existingItem) {
        // If item exists, update quantity
        const newQuantity = existingItem.data().quantity + 1;
        console.log('Updating quantity to:', newQuantity);
        
        await updateDoc(existingItem.ref, {
          quantity: newQuantity
        });
        console.log('Successfully updated quantity');
      } else {
        // If item doesn't exist, add new item
        const newItem = {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          description: product.description,
          brand: product.brand,
          rating: product.rating,
          image: product.images?.image,
          createdAt: serverTimestamp()
        };
        console.log('Adding new item:', newItem);
        
        const docRef = await addDoc(cartRef, newItem);
        console.log('Successfully added new item with ID:', docRef.id);
      }

      toast.success('Added to cart!', {
        description: `${product.name} has been added to your cart`
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      toast.error('Failed to add item', {
        description: 'Please try again later'
      });
    }
  };
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filters, setFilters] = useState({
    sortBy: 'name-asc',
    brand: 'all',
    view: 'all' // 'all', 'new-arrivals', or 'random'
  })
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]
    
    // Brand filter
    if (filters.brand !== 'all') {
      result = result.filter(product => 
        product.brand?.toLowerCase() === filters.brand.toLowerCase()
      )
    }

    // View filter
    if (filters.view === 'new-arrivals') {
      // Sort by newest first (assuming there's a timestamp or id that can be used)
      // For demo purposes, we'll just take the first 8 items
      result = result.slice(0, 8)
    } else if (filters.view === 'random') {
      // Shuffle array and take first 8 items
      result = result.sort(() => 0.5 - Math.random()).slice(0, 8)
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
        break
      case 'name-desc':
        result.sort((a, b) => (b.name || '').localeCompare(a.name || ''))
        break
    }

    setFilteredProducts(result)
  }, [products, filters])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        console.log('Database instance:', db);
        
        const chocolatesRef = collection(db, 'chocolates');
        console.log('Collection reference:', chocolatesRef);
        
        const querySnapshot = await getDocs(chocolatesRef);
        console.log('Query snapshot:', querySnapshot);
        
        const productsData = querySnapshot.docs.map(doc => {
          console.log('Document data:', doc.data());
          return {
            id: doc.id,
            ...doc.data()
          }
        })
        
        console.log('Processed products:', productsData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts()
  }, [])

  const uniqueBrands = [...new Set(products.map(p => p.brand).filter(Boolean))]

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster richColors position="top-center" expand={true} />
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Our Products</h1>

        {/* Mobile Filter Button */}
        <div className="fixed bottom-6 right-6 z-40 sm:hidden">
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-orange-500 text-white px-5 py-3 rounded-full shadow-xl hover:bg-orange-600 active:bg-orange-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Filters</span>
          </button>
        </div>
        
        {/* Mobile Filter Modal */}
        {isFilterModalOpen && (
          <div className="fixed inset-0 z-50 sm:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsFilterModalOpen(false)}
            ></div>
            
            {/* Modal Content */}
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg transform transition-transform duration-300 ease-out">
              <div className="px-4 py-5">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                  </div>
                  <button 
                    onClick={() => setIsFilterModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Filter Options */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">View</label>
                    <select
                      value={filters.view}
                      onChange={(e) => setFilters(prev => ({ ...prev, view: e.target.value }))}
                      className="w-full px-3 py-3 border rounded-lg text-sm text-gray-800 bg-white focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="all">All Products</option>
                      <option value="new-arrivals">New Arrivals</option>
                      <option value="random">Featured Items</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">Brand</label>
                    <select
                      value={filters.brand}
                      onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                      className="w-full px-3 py-3 border rounded-lg text-sm text-gray-800 bg-white focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="all">All Brands</option>
                      {uniqueBrands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">Sort By</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                      className="w-full px-3 py-3 border rounded-lg text-sm text-gray-800 bg-white focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="name-asc">Name (A-Z)</option>
                      <option value="name-desc">Name (Z-A)</option>
                      <option value="price-asc">Price (Low to High)</option>
                      <option value="price-desc">Price (High to Low)</option>
                    </select>
                  </div>
                </div>
                
                {/* Apply Button */}
                <button 
                  onClick={() => setIsFilterModalOpen(false)}
                  className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 active:bg-orange-700 transition-colors duration-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No spacing needed for floating button */}

        <div className="flex flex-col sm:flex-row gap-6 relative">
          {/* Desktop Filters - Sidebar */}
          <div className="hidden sm:block w-64 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto bg-white p-5 rounded-lg border self-start">
            <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>

            

              <div>
                <label className="block text-sm font-medium text-black mb-2">View</label>
                <select
                  value={filters.view}
                  onChange={(e) => setFilters(prev => ({ ...prev, view: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md text-sm text-gray-900 bg-white focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Products</option>
                  <option value="new-arrivals">New Arrivals</option>
                  <option value="random">Featured Items</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md text-sm text-gray-900 bg-white focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Brands</option>
                  {uniqueBrands.map(brand => (
                    <option key={brand} value={brand} className="text-black">{brand}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md text-sm text-gray-900 bg-white focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-fr">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  view={filters.view}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-black">
                No products match your filters
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;