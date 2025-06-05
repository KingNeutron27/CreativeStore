import '../css/About.css'
import { useState, useContext } from 'react';
import { Palette, Heart, Award, Users, ShoppingBag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { ShoppingCartContext } from '../Context/ShoppingCartProvider';

function About() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()
  
  // Get copy functionality from context
  const { copyAccountNumber, copyStatus } = useContext(ShoppingCartContext)

  const handleContactClick = () => {
    setShowPopup(true);
    // Use context function to copy account number
    copyAccountNumber('8141656446', 'Opay Bank');
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <NavBar />
      <section className="about-section">
        <div className="banner-container">
          <span className="palette"><Palette /></span>
          <h1>Creative Store</h1>
          <p>Where creativity meets quality. Your destination for unique products that inspire and empower your creative journey.</p>
          <div className="button-group">
            <button className="btn-primary">Shop Now</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>

        <div className='story-container'>
          <div className="story-content">
            <h1>Our Story</h1>
            <p>
              Creative Store began as a simple idea: everyone deserves access to products that fuel their imagination and help bring their creative visions to life.
            </p>
            <p>
              What started as a small collection of carefully curated items has grown into a comprehensive marketplace where creativity thrives. We believe the right tools can transform ordinary moments into extraordinary creations.
            </p>
            <div className="heart-icon">
              <span className="heart"><Heart /></span>
              <span className="heart-text">Founded with passion for creativity</span>
            </div>
          </div>
        </div>

        <div className="image-carriage">
          <div className="card">
            <div className="image-container">
              <img src="https://i.pinimg.com/736x/9e/ba/7c/9eba7cdbb91ec3cf67060cba7a593dec.jpg" alt="NIVEA Fresh Blends" />
            </div>
            <div className="image-details">
              <p>A Premium product made from the best stuff</p>
            </div>
          </div>
          <div className="card">
            <div className="image-container">
              <img src="https://i.pinimg.com/736x/25/ad/68/25ad6810d7b469e227182a45ca0ee5b1.jpg" alt="Cerave Tinted SunScreen" />
            </div>
            <div className="image-details">
              <p>The new Cerave tinted sunscreen ticks all the right boxes in terms of texture, feel and finish. It protects and hydrates while adding a sheer tint for healthy glow. No white cast here!</p>
            </div>
          </div>
          <div className="card">
            <div className="image-container">
              <img src="https://i.pinimg.com/736x/c4/bc/8a/c4bc8ae48cfbbde0fd5aeb14663955ae.jpg" alt="Neurogena" />
            </div>
            <div className="image-details">
              <p>The best drugstore and Amazon beauty products of the year under $30, according to the Harper's Bazaar Drugstore Awards and Bazaar's beauty editors</p>
            </div>
          </div>
        </div>

        <div className="about-founder">
          <h2>My name is Kingstein</h2>
          <p>
            This is a project that shows my front end design skills using React...kindly feel free to reach to me for any project you want to create
          </p>
        </div>

        <div className="about-company">
          <div className='icon-card'>
            <span className='icon-container'><Award className="icon"/></span>
            <h3>Premium Quality</h3>
            <p>Every product is carefully selected and tested for excellence</p>
          </div>
          <div className='icon-card'>
            <span className='icon-container'><Users className="icon"/></span>
            <h3>Creative Community</h3>
            <p>Join thousands of creators sharing inspiration and ideas</p>
          </div>
          <div className='icon-card'>
            <span className='icon-container'><ShoppingBag className="icon"/></span>
            <h3>Fast Shipping</h3>
            <p>Quick and reliable delivery so you can start creating sooner</p>
          </div>
          <div className='icon-card'>
            <span className='icon-container'><Heart className="icon"/></span>
            <h3>Customer Care</h3>
            <p>Dedicated support for your creative journey and satisfaction</p>
          </div>
        </div>

          <div className="footer-banner">
            <h1>Ready to Create Something Amazing?</h1>
            <p>Whether you're a seasoned artist or just beginning to explore your creative side, we're here to provide the tools and inspiration you need.</p>
            <div className="footer-buttons">
              <button className="btn-primary" onClick={() => navigate('/')}>Start Shopping</button>
              <button className="btn-secondary">Join Community</button>
            </div>
          </div>
        <footer>
          <div className="contacts-footer">
            <h3>Get in Touch</h3>
            <p>Have questions? We'd love to hear from you.</p>
            <ul>
              <li onClick={handleContactClick} className="contact-link">Contact Us</li>
              <li>Newsletter</li>
              <li>Follow Us</li>
            </ul>
          </div>
        </footer>
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
              <p><strong>Name:</strong>Esedebe Kingsley</p>
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
  );
}

export default About;