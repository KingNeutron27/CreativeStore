import { FaShoppingCart } from "react-icons/fa";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import '../css/Home.css'
import ProductCard from "../components/ProductCard";
import Footer from "./Footer";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../Context/ShoppingCartProvider";
import Spinner from "../components/Spinner";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { products, loading } = useContext(ShoppingCartContext)
  const [isFiltered, setIsFiltered] = useState(false) 
  const [activeCategory, setactiveCategory] = useState('all')
  const [filteredProductsList, setFilteredProductsList] = useState([])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
      <nav>
        <h1 className="logo">CreativeStore</h1>
          <div 
            className="menu-container">
            <IoMenu 
              onClick={toggleMenu}
              className={isMenuOpen ? 'close-menu': 'hamburger-menu'}/>
            <IoCloseSharp 
              onClick={toggleMenu}
              className={isMenuOpen ? 'hamburger-menu': 'close-menu'}
            />
          </div>
        <ul className={isMenuOpen ? 'mobile': ''}>
          <Link className="link">Home</Link>
          <Link className="link">Products</Link>
          <Link className="link">Carts <FaShoppingCart className="cartIcon" /></Link> 
        </ul>
      </nav>
      <section>
        <div className="banner">
          <div className="banner-details">
            <h1>Discover Amazing Products</h1>
            <p>Shop the latest trends with unbeatable prices</p>
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
           loading 
            ? (<Spinner loading={loading}/>)
            : (isFiltered ? (
            filteredProductsList && filteredProductsList.length > 0
              ? (filteredProductsList.map(filteredItem => <ProductCard key={filteredItem} product={filteredItem}/>))
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
