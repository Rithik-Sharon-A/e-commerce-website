import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products,search,showSearch, } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  /* ================= CATEGORY TOGGLE ================= */

  const toggleCategory = (e) => {
    const value = e.target.value;

    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  /* ================= SUB-CATEGORY TOGGLE ================= */

  const toggleSubCategory = (e) => {
    const value = e.target.value;

    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  /* ================= FILTER + SORT (SINGLE SOURCE) ================= */

  const applyFilterAndSort = () => {
    let productsCopy = [...products];

    // SEARCH FILTER
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // CATEGORY FILTER
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      );
    }

    // SUB-CATEGORY FILTER
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      );
    }

    // SORT
    if (sortType === 'low-high') {
      productsCopy = [...productsCopy].sort((a, b) => a.price - b.price);
    }

    if (sortType === 'high-low') {
      productsCopy = [...productsCopy].sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productsCopy);
  };

  /* ================= RUN FILTER & SORT ================= */

  useEffect(() => {
    applyFilterAndSort();
  }, [category, subCategory, sortType, products, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* ================= FILTER SECTION ================= */}

      <div className="min-w-60">

        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* -------- CATEGORY -------- */}

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <label className="flex gap-2">
              <input type="checkbox" value="Men" onChange={toggleCategory} />
              Men
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="Women" onChange={toggleCategory} />
              Women
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="Kids" onChange={toggleCategory} />
              Kids
            </label>
          </div>
        </div>

        {/* -------- SUB-CATEGORY -------- */}

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <label className="flex gap-2">
              <input type="checkbox" value="Topwear" onChange={toggleSubCategory} />
              Topwear
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="Bottomwear" onChange={toggleSubCategory} />
              Bottomwear
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="Winterwear" onChange={toggleSubCategory} />
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* ================= PRODUCT SECTION ================= */}

      <div className="flex-1">

        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="All" text2="COLLECTIONS" />

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map(item => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Collection;






























































































































































































































