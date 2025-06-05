import '../css/Home.css'
import ProductCard from "../components/ProductCard";
import Footer from "./Footer";
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../Context/ShoppingCartProvider";
import Spinner from "../components/Spinner";
import NavBar from '../components/NavBar';
import { BiSolidError } from "react-icons/bi";

function Home() {
  const { products, loading, error } = useContext(ShoppingCartContext)
  const [isFiltered, setIsFiltered] = useState(false) 
  const [activeCategory, setActiveCategory] = useState('all')
  const [filteredProductsList, setFilteredProductsList] = useState([])
  const [searchInput, setSearchInput] = useState('') 
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const filteredProducts = (category) => {
    if (products && products.length > 0) {
      const filterCategory = products.filter(product => product.category === category)
      setFilteredProductsList(filterCategory)
      setActiveCategory(category)
    }
    setIsFiltered(true)
    // Clear search when filtering by category
    setSearchResults([])
    setIsSearching(false)
  }

  const searchQuery = async (query) => {
    if (!query || !query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}`)
      const result = await response.json()
      
      if (result && result.products) {
        setSearchResults(result.products)
        setIsSearching(true)
        // Clear category filtering when searching
        setIsFiltered(false)
        setActiveCategory('all')
      } else {
        setSearchResults([])
        setIsSearching(true)
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
      setIsSearching(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchInput && searchInput.trim()) {
      searchQuery(searchInput)
    }
    setSearchInput('')
  }

  const showAllProducts = () => {
    setIsFiltered(false)
    setActiveCategory('all')
    setSearchResults([])
    setIsSearching(false)
    setSearchInput('')
  }

  // Determine which products to display
  const getProductsToDisplay = () => {
    if (isSearching) {
      return searchResults
    } else if (isFiltered) {
      return filteredProductsList
    } else {
      return products
    }
  }

  const productsToShow = getProductsToDisplay()

  return (
    <>
      <NavBar />
      <section>
        <div className="banner">
          <div className="banner-details">
            <h1>Discover Amazing Products</h1>
            <p>Shop the latest trends with unbeatable prices</p>
            <form onSubmit={handleSubmit}>
              <input 
                className="search-input" 
                type="text" 
                placeholder='Search products...' 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
            <button className="shop-btn">Shop Now</button>
          </div>
        </div>
        
        <div className="filter">
          <button 
            onClick={showAllProducts}
            className={activeCategory === 'all' && !isSearching ? 'active' : ''}>
            All products
          </button>
          <button 
            className={activeCategory === 'beauty' && !isSearching ? 'active' : ''}
            onClick={() => filteredProducts('beauty')}>
            Beauty
          </button>
          <button 
            className={activeCategory === 'groceries' && !isSearching ? 'active' : ''}
            onClick={() => filteredProducts('groceries')}>
            Groceries
          </button>
          <button 
            className={activeCategory === 'fragrances' && !isSearching ? 'active' : ''}
            onClick={() => filteredProducts('fragrances')}>
            Fragrance
          </button>
          <button 
            className={activeCategory === 'furniture' && !isSearching ? 'active' : ''}
            onClick={() => filteredProducts('furniture')}>
            Furniture
          </button>
        </div>
        
        {isSearching && (
          <div className="search-info">
            <p>Search results for: "{searchInput}"</p>
          </div>
        )}
        
        <section className='product-container'>
          {error ? (
            <div className='error'> 
              <BiSolidError className='error-icon'/>
              <p className='error-message'>
                <span>Error: </span>{error}
              </p>
            </div>
          ) : loading ? (
            <Spinner loading={loading}/>
          ) : productsToShow && productsToShow.length > 0 ? (
            productsToShow.map((product, i) => 
              <ProductCard key={product.id || i} product={product}/>
            )
          ) : (
            <div className="error">
              <p className="error-message">
                {isSearching ? 'No search results found' : 
                 isFiltered ? 'No filtered items found' : 
                 'No products found'}
              </p>
            </div>
          )}
        </section>
      </section>
      <Footer />
    </>
  )
}

export default Home