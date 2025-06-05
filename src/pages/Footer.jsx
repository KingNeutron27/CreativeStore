import '../css/Footer.css'
import { useState, useContext } from 'react'
import { X } from 'lucide-react';
import { ShoppingCartContext } from '../Context/ShoppingCartProvider';

function Footer() {
  const [showPopup, setShowPopup] = useState(false);
  // Get copy functionality from context
  const { copyAccountNumber, copyStatus } = useContext(ShoppingCartContext)

  const handleCopyAccountNumber = (e) => {
    e.preventDefault(); 
    setShowPopup(true);
    // Use context function to copy account number
    copyAccountNumber('8141656446', 'Opay Bank');
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <footer>
      <h1>Stay Updated</h1>
      {/* <p>Subscribe to get the latest updates on new products and exclusive offers</p> */}
      <p>if you're feeling generous abeg credit my opay</p>
      <form className="subscribe-container">
        <input 
          type="email" 
          placeholder="8141656446"
          readOnly
        />
        <button type="submit" onClick={handleCopyAccountNumber}>Get Account</button>
      </form>
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
    </footer>
  )
}

export default Footer