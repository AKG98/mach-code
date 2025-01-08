import React, { useEffect, useState, useRef, useCallback } from "react";

const ProductSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="aspect-video bg-gray-200" />
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
      <div className="h-4 bg-gray-200 rounded mb-4 w-1/2" />
      <div className="h-8 bg-gray-200 rounded mb-4" />
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-gray-200 rounded" />
        <div className="flex-1 h-10 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

const ProductCard = ({ item }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="aspect-video relative overflow-hidden">
      <img 
        src={item.thumbnail} 
        alt={item.title}
        className="object-cover transition-opacity duration-300"
        loading="lazy"  
      />
    </div>
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2 line-clamp-1">{item.title}</h2>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
      <p className="text-xl font-bold text-blue-600 mb-4">${item.price}</p>
      <div className="flex gap-2">
        <button className="flex-1 bg-stone-100 hover:bg-stone-200 rounded-lg p-2 transition-colors">
          Add to cart
        </button>
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition-colors">
          Buy now
        </button>
      </div>
    </div>
  </div>
);

export default function InfiniteScroll() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Create a ref for the intersection observer
  const observerRef = useRef(null);
  const loadingRef = useRef(null);

  async function fetchProducts(page) {
    try {
      setLoading(true);
      setError(null);
      
      let url;
      if (searchValue.trim()) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchValue)}&limit=10&skip=${(page - 1) * 10}`;
      } else {
        url = `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data?.products) {
        if (page === 1) {
          setProducts(data.products);
        } else {
          setProducts(prev => [...prev, ...data.products]);
        }
        setTotalPages(Math.ceil(data.total / 10));
      }
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }

  // Callback for intersection observer
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [loading, currentPage, totalPages]);

  // Set up intersection observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);
    
    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  // Handle search and initial load
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      fetchProducts(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  // Handle pagination
  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts(currentPage);
    }
  }, [currentPage]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="w-full min-h-screen bg-stone-200 flex flex-col items-center p-4 md:p-10">
      <div className="w-full max-w-2xl mb-8">
        <input
          className="w-full h-10 border border-stone-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search products..."
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>

      {error && (
        <div className="w-full max-w-6xl p-4 mb-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {[1, 2, 3].map((n) => (
            <ProductSkeleton key={n} />
          ))}
        </div>
      )}

      {/* Intersection observer target */}
      {!loading && currentPage < totalPages && (
        <div ref={loadingRef} className="h-10 w-full" />
      )}

      {/* End of results message */}
      {currentPage === totalPages && products.length > 0 && (
        <div className="text-gray-600 mt-8">
          No more products to load
        </div>
      )}
    </div>
  );
}