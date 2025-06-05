import NavBar from "../components/NavBar";
import CartCard from "../components/CartCard"
import { FaCartShopping, FaLock } from "react-icons/fa6";
import '../css/Cart.css';
import { useContext, useState } from "react";
import { ShoppingCartContext } from "../Context/ShoppingCartProvider";
import { useNavigate } from "react-router-dom";
import { X } from 'lucide-react';



function Cart() {
  const { cartItems, handleRemoveFromCart, handleQuantityChange, copyAccountNumber, copyStatus  } = useContext(ShoppingCartContext)
  const navigate = useNavigate()

  const [showPopup, setShowPopup] = useState(false);

  
    const handleCopyAccountNumber = () => {
      setShowPopup(true);
      // Use context function to copy account number
      copyAccountNumber('8141656446', 'Opay Bank');
    };
  
    const closePopup = () => {
      setShowPopup(false);
    };

  const subTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const tax = subTotal * 0.08
  const shipping = subTotal >= 100 ? 0 : 9.99 
  const total = subTotal + tax + shipping
  const freeShippingThreshold = 100 - subTotal

  return (
    <>
      {
      itemCount === 0 ? 
      <div className="empty-cart-container">
          <span>
            <FaCartShopping className="empty-cart" />
          </span>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <button onClick={() => navigate('/')}>
            Start Shopping
          </button>
        </div>: (
        <>
          <NavBar />
      <section className="main-container">
        <div className="header-section">
          <h1 className="title">Shopping Cart</h1>
          <p className="no-of-items">{itemCount} item{itemCount > 1 ? 's': ''} in your cart</p>
        </div>

        <div className="cart-and-order-container">
          {/* Cart Items Section */}
          <div className="cart-items-container">
            <h3>
              <span className="cart-icon"><FaCartShopping /></span>
              Cart Items
            </h3>

            {
            cartItems && cartItems.length > 0 
              ? cartItems.map(item => 
                <CartCard 
                  key={item.id}
                  id={item.id} 
                  name={item?.title} 
                  price={item?.totalPrice.toFixed(2)}
                  priceEach={item?.price} 
                  imageUrl={item?.thumbnail} 
                  quantity={item.quantity}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleQuantityChange={handleQuantityChange}
                />)
              : <div>
                <p>No item found in the cart <FaCartShopping /></p>
              </div>
            }

            <div className="horizontal-rule-and-item-sumtotal">
              {/* <hr /> */}
              <p>item{itemCount > 1 ? 's': ''} ({itemCount})</p>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="order-summary-container">
            <div className="order-title">
              <h1>
                <span className="lock-icon"><FaLock /></span>
                Order Summary
              </h1>
            </div>
            <div className="order-calculations">
              <div>
                <p>Subtotal</p>
                <p>${subTotal.toFixed(2)}</p>
              </div>
              <div>
                <p>Tax (8%)</p>
                <p>${tax.toFixed(2)}</p>
              </div>
              <div>
                <p>Shipping</p>
                <p>{shipping==='0.00' ? 'FREE': `$${shipping.toFixed(2)}`}</p>
              </div>
              {freeShippingThreshold > 0 && (
                <div className="free-shipping">
                  <p>Add ${freeShippingThreshold} more for free shipping!</p>
                </div>
              )}
            </div>
            <div className="total">
              <hr />
              <div>
                <h2>Total</h2>
                <h2>${total.toFixed(2)}</h2>
              </div>
            </div>
            <div className="checkout-and-shopping">
              <button onClick={handleCopyAccountNumber}>
                <span className="card-icon">💳</span>
                <span>Proceed to Checkout</span>
              </button>
              <button onClick={() =>navigate('/')}>
                <span>←</span>
                <span>Continue Shopping</span>
              </button>
            </div>
            <div className="secure-checkout">
              <hr />
              <p>
                <span>✓</span>
                <span>Secure Checkout</span>
              </p>
            </div>
          </div>
        </div>
      </section>
       {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-btn" onClick={closePopup}>
              <X size={24} />
            </button>
            <h3>Contact Information</h3>
            <div className="contact-info">
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Bank:</strong> Opay Bank</p>
              <p><strong>Account Number:</strong> 8141656446</p>
            </div>
            {copyStatus.copied && (
              <div className="success-message">
                ✓ {copyStatus.message}
              </div>
            )}
            <button className="btn-primary" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
        </>
      )
      }
      
    </>
  );
}

export default Cart;