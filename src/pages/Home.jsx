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
  const [activeCategory, setactiveCategory] = useState('all')
  const [filteredProductsList, setFilteredProductsList] = useState([])

  const filteredProducts = (category) => {
    if (products && products.length > 0) {
      const filterCategory = products.filter(product => product.category === category)
      setFilteredProductsList(filterCategory)
      setactiveCategory(category)
    }
    setIsFiltered(true)
  }

  const showAllProducts = () => {
    setIsFiltered(false)
    setactiveCategory('all')
  }

  

  return (
    <>
      <NavBar />
      <section>
        <div className="banner">
          <div className="banner-details">
            <h1>Discover Amazing Products</h1>
            <p>Shop the latest trends with unbeatable prices</p>
            <input className="search-input" type="text" placeholder='8141656446(Opay)' />
            <button className="shop-btn">Shop Now</button>
          </div>
        </div>
        <div className="filter">
          <button 
            onClick={showAllProducts}
            className={activeCategory === 'all' ? 'ative' : ''}>All products
          </button>
          <button 
            className={activeCategory === 'beauty' ? 'ative' : ''}
            onClick={() => filteredProducts('beauty')}>Beauty
          </button>
          <button 
            className={activeCategory === 'groceries' ? 'ative' : ''}
            onClick={() => filteredProducts('groceries')}>Groceries
          </button>
          <button 
            className={activeCategory === 'fragrances' ? 'ative' : ''}
            onClick={() => filteredProducts('fragrances')}>Fragrance
          </button>
          <button 
            className={activeCategory === 'furniture' ? 'ative' : ''}
            onClick={() => filteredProducts('furniture')}>Furniture
          </button>
        </div>
        <section className='product-container'>
          
          {
           error 
              ? (
                <div className='error'> 
                  <BiSolidError className='error-icon'/>
                  <p className='error-message'><span>Error:</span>{error}</p>
                </div>
              ) 
              : (loading) 
            ? (<Spinner loading={loading}/>)
            : (isFiltered ? (
            filteredProductsList && filteredProductsList.length > 0
              ? (filteredProductsList.map((filteredItem, i )=> <ProductCard key={i} product={filteredItem}/>))
              : <p>No Filtered item Found</p>
           )
           : (
              products && products.length > 0
              ? (products.map(product => <ProductCard key={product.id} product={product}/>))
              : <p>No Product found</p>
           ))
          }
        </section>
        
      </section>
      <Footer />
    </>
  )
}

export default Home
