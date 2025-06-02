import '../css/Home.css'
import { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
    }
  return (
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
          <Link to={'/'} className="link">Home</Link>
          <Link to={'/product/:1'} className="link">Products</Link>
          <Link to={'cart'} className="link">Carts <FaShoppingCart className="cartIcon" /></Link> 
        </ul>
      </nav> 
  )
}

export default NavBar
