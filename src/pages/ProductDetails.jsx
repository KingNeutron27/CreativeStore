import React from 'react';
import '../css/ProductDetails.css';

function ProductDetails({ product }) {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <h1 className="logo">CreativeStore</h1>
          <div>
            <a href="#" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Home</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Products</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Cart</a>
          </div>
        </nav>
      </header>

      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="#">Home</a> /
          <a href="#">Beauty</a> /
          <span>Essence Mascara Lash Princess</span>
        </nav>

        {/* Main Product Details */}
        <section className="product-details">
          <div className="product-main">
            {/* Image Gallery */}
            <div className="image-gallery">
              <div className="main-image">
                <img src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png" alt="Essence Mascara Lash Princess" id="mainImage" />
                <div className="discount-badge">18.7% OFF</div>
              </div>
              <div className="thumbnail-gallery">
                <div className="thumbnail active" onClick={() => {}}>
                  <img src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png" alt="Thumbnail 1" />
                </div>
                <div className="thumbnail" onClick={() => {}}>
                  <img src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/2.png" alt="Thumbnail 2" />
                </div>
                <div className="thumbnail" onClick={() => {}}>
                  <img src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/3.png" alt="Thumbnail 3" />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-category">Beauty</div>
              <h1 className="product-title">Essence Mascara Lash Princess</h1>
              
              <div className="rating-section">
                <div className="stars">
                  ⭐ 4.94
                </div>
                <span className="rating-count">(152 reviews)</span>
              </div>

              <div className="price-section">
                <span className="current-price">$9.99</span>
                <span className="original-price">$12.29</span>
                <span className="savings">Save $2.30</span>
              </div>

              <div className="stock-status">
                <div className="stock-indicator"></div>
                <span className="stock-text">In Stock (5 remaining)</span>
              </div>

              <p className="product-description">
                The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. 
                Achieve dramatic lashes with this long-lasting, smudge-proof formula that separates and defines each lash 
                for a bold, beautiful look.
              </p>

              <div className="action-section">
                <div className="quantity-selector">
                  <span className="quantity-label">Quantity:</span>
                  <div className="quantity-controls">
                    <button className="quantity-btn" onClick={() => {}}>-</button>
                    <input type="number" className="quantity-input" defaultValue="1" min="1" max="5" id="quantity" />
                    <button className="quantity-btn" onClick={() => {}}>+</button>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="btn btn-primary">Add to Cart</button>
                  <button className="btn btn-secondary">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Specifications */}
        <section className="specifications">
          <h2 className="spec-title">Product Specifications</h2>
          <div className="spec-grid">
            <div className="spec-item">
              <span className="spec-label">Brand</span>
              <span className="spec-value">Essence</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Category</span>
              <span className="spec-value">Beauty</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Weight</span>
              <span className="spec-value">15ml</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Dimensions</span>
              <span className="spec-value">12 x 2 x 2 cm</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">SKU</span>
              <span className="spec-value">ESS-MLC-001</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Warranty</span>
              <span className="spec-value">1 Year</span>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="reviews">
          <div className="reviews-header">
            <h2 className="spec-title">Customer Reviews</h2>
            <button className="btn btn-secondary" style={{ flex: 'none', padding: '0.5rem 1rem' }}>Write a Review</button>
          </div>

          <div className="review-item">
            <div className="review-header">
              <span className="reviewer-name">Sarah Johnson</span>
              <span className="review-date">March 15, 2024</span>
            </div>
            <div className="review-rating">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="review-text">
              Amazing mascara! It really does give you princess lashes. The formula is perfect - not too wet, not too dry. 
              It separates each lash beautifully and gives incredible volume without clumping.
            </p>
          </div>

          <div className="review-item">
            <div className="review-header">
              <span className="reviewer-name">Emily Davis</span>
              <span className="review-date">March 10, 2024</span>
            </div>
            <div className="review-rating">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="review-text">
              Best drugstore mascara I've ever used! The brush is perfect for getting every single lash, 
              and it doesn't flake or smudge throughout the day. Highly recommend!
            </p>
          </div>

          <div className="review-item">
            <div className="review-header">
              <span className="reviewer-name">Jessica Wilson</span>
              <span className="review-date">March 5, 2024</span>
            </div>
            <div className="review-rating">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <p className="review-text">
              This mascara is incredible for the price! It gives me the dramatic lashes I want without 
              breaking the bank. The staying power is excellent too.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default ProductDetails;