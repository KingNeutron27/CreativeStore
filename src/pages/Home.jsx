import { FaShoppingCart } from "react-icons/fa";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import '../css/Home.css'
import ProductCard from "../components/ProductCard";
import Footer from "./Footer";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav>
        <Link to='/'><h1 className="logo">CreativeStore</h1></Link>
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
          <button className="active">All products</button>
          <button>Electronics</button>
          <button>Fashion</button>
            <button>Accessories</button>
        </div>
       <ProductCard />
      </section>
      <Footer />
    </>
  )
}

export default Home
