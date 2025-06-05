import { useContext, useState, useEffect } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartContext } from '../Context/ShoppingCartProvider';
import CreativeStore from '../asssets/CreativeStore.png'

function NavBar() {
  const { itemCount } = useContext(ShoppingCartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav>
      <div className="logo-container">
        <img 
          src={CreativeStore} 
          alt="Creative Store Logo" 
          className="logo-image"
        />
        <h1 className='logo'>CreativeStore</h1>
      </div>
      
      <div className="menu-container" onClick={toggleMenu}>
        <IoMenu 
          className={isMenuOpen ? 'close-menu' : 'hamburger-menu'}
        />
        <IoCloseSharp 
          className={isMenuOpen ? 'hamburger-menu' : 'close-menu'}
        />
      </div>

      <ul className={isMenuOpen ? 'mobile' : ''}>
        <Link to={'/'} className="link" onClick={closeMenu}>
          Home
        </Link>
        <Link to={'/about'} className="link" onClick={closeMenu}>
          About
        </Link>
        <Link to={'/cart'} className="link" onClick={closeMenu}>
          Cart
          <FaShoppingCart className="cartIcon" />
          {itemCount > 0 && (
            <div className="cart-quantity">{itemCount}</div>
          )}
        </Link>
      </ul>
    </nav>
  );
}

export default NavBar;