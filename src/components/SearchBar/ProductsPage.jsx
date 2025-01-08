import React, { useEffect, useState } from "react";

const ProductSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse p-4 w-1/4">
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
  <div className="p-2 md:w-1/4 w-1/2 bg-white mb-2 rounded-lg border">
    <img src={item.thumbnail} alt={item.brand} loading="lazy" />
    <div className="p-5">
      <h1 className="text-lg font-bold">{item.title}</h1>
      <p className="text-sm">{item.description}</p>
      <p className="font-bold text-xl my-2">{item.price}$</p>
    </div>
    <div className="flex gap-2">
      <button className="flex-1 bg-stone-100 hover:bg-stone-200 rounded-lg p-2 transition-colors">
        Add to cart
      </button>
      <button className="flex-1 bg-stone-600 hover:bg-stone-700 text-white rounded-lg p-2 transition-colors">
        Buy now
      </button>
    </div>
  </div>
);

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      let url;
      if (searchValue.trim()) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
          searchValue
        )}&limit=9&skip=${(currentPage - 1) * 9}`;
      } else {
        url = `https://dummyjson.com/products?limit=9&skip=${(currentPage - 1) * 9}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data?.products) {
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / 9));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
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
        onChange={handleSearchChange}
      />
      <div className="w-full flex gap-5 flex-wrap justify-center">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : products.map((item) => <ProductCard key={item.id} item={item} />)}
      </div>
      <div className="flex gap-5 mt-5">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`h-10 w-10 rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-stone-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
