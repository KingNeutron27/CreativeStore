import NavBar from "../components/NavBar";
import CartCard from "../components/CartCard"
import { FaCartShopping, FaLock } from "react-icons/fa6";
import '../css/Cart.css';
import { useContext } from "react";
import { ShoppingCartContext } from "../Context/ShoppingCartProvider";


function Cart() {
  const { cartItems } = useContext(ShoppingCartContext)
  return (
    <>
      <NavBar />
      <section className="main-container">
        <div className="header-section">
          <h1 className="title">Shopping Cart</h1>
          <p className="no-of-items">2 items in your cart</p>
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
                  name={item?.title} 
                  price={item?.totalPrice.toFixed(2)}
                  priceEach={item?.price} 
                  imageUrl={item?.thumbnail} 
                  quantity={item.quantity}
                />)
              : <p>No item found in the cart <FaCartShopping /></p>
            }

            <div className="horizontal-rule-and-item-sumtotal">
              {/* <hr /> */}
              <p>Items (2)</p>
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
                <p>$24.98</p>
              </div>
              <div>
                <p>Tax (8%)</p>
                <p>$2.00</p>
              </div>
              <div>
                <p>Shipping</p>
                <p>$9.99</p>
              </div>
              <div className="free-shipping">
                <p>Add $75.02 more for free shipping!</p>
              </div>
            </div>
            <div className="total">
              <hr />
              <div>
                <h2>Total</h2>
                <h2>$36.97</h2>
              </div>
            </div>
            <div className="checkout-and-shopping">
              <button>
                <span className="card-icon">💳</span>
                <span>Proceed to Checkout</span>
              </button>
              <button>
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
    </>
  );
}

export default Cart;