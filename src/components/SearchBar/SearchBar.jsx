import React, { useEffect, useState } from "react";

export default function SearchBar() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchValue, setSearchValue] = useState('');
  
    async function fetchProducts() {
      try {
        let url;
        if (searchValue.trim()) {
          // Use the search endpoint when there's a search value
          url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchValue)}&limit=10&skip=${(currentPage - 1) * 10}`;
        } else {
          // Use the main products endpoint when there's no search
          url = `https://dummyjson.com/products?limit=10&skip=${(currentPage - 1) * 10}`;
        }
  
        const response = await fetch(url);
        const data = await response.json();
        
        if (data?.products) {
          setProducts(data.products);
          setTotalPages(Math.ceil(data.total / 10));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  
    useEffect(() => {
      // Add a small delay to avoid too many API calls while typing
      const timeoutId = setTimeout(() => {
        fetchProducts();
      }, 300);
  
      return () => clearTimeout(timeoutId);
    }, [currentPage, searchValue]);
  
    const handleSearchChange = (e) => {
      setSearchValue(e.target.value);
      setCurrentPage(1);
    };
  return (
    <div className="w-screen h-screen bg-stone-200 flex flex-col items-center p-10 overflow-x-hidden">
      <input
        className="w-[50dvw] h-10 border border-stone-300 rounded-lg p-2 mb-5"
        type="text"
        placeholder="Search here"
        value={searchValue}
        onChange={handleSearchChange} // Trigger handleSearchChange on input change
      />
      <div className="w-full flex gap-5 flex-wrap justify-center">
        {products?.map((item) => (
          <div key={item.id} className="p-2 md:w-1/4 w-1/2 bg-white mb-2 rounded-lg border">
            <img src={item.thumbnail} alt={item.brand} />
            <div className="p-5">
              <h1 className="text-lg font-bold">{item.title}</h1>
              <p className="text-sm">{item.description}</p>
              <p className="font-bold text-xl my-2 ">{item.price}$</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-stone-300 w-full rounded-lg p-2">Add to cart</button>
              <button className="bg-stone-500 w-full rounded-lg p-2 text-white">Buy now</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-5 mt-5">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`h-10 w-10 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-stone-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
