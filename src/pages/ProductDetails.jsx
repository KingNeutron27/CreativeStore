import '../css/ProductDetails.css';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';
import { useEffect, useContext, useState, useCallback } from 'react';
import Spinner from '../components/Spinner';
import { ShoppingCartContext } from '../Context/ShoppingCartProvider';
import { BiSolidError } from "react-icons/bi";

function ProductDetails() {
  const { id } = useParams()
  const {error, setError, loading, setLoading, productItem, setProductItem, handleAddToCart, cartItems} = useContext(ShoppingCartContext)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Safe check for isInCart - only check if productItem exists
  const isInCart = productItem ? cartItems.some(item => item.id === productItem.id) : false;
  
  // Memoize the fetch function to avoid unnecessary re-renders
  const ProductDetailsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://dummyjson.com/products/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch Product');
      }

      const result = await response.json();

      if (result && result.id) {
        setProductItem(result);
      }
    } catch (error) {
      console.error(error);
      setError('Trouble fetching the data');
    } finally {
      setLoading(false);
    }
  }, [id, setLoading, setError, setProductItem]);
  
  useEffect(() => {
    if (id) {
      ProductDetailsData();
    }
  }, [id, ProductDetailsData]);

  // Handle thumbnail click to change main image
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <Spinner />
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className='error'> 
          <BiSolidError className='error-icon'/>
          <p className='error-message'><span>Error:</span>{error}</p>
        </div>
      </> 
    );
  }

  if (!productItem) {
    return (
      <>
        <NavBar />
        <p>No Product Found</p>
      </>
    );
  }

  // console.log(productItem);

  const discountPercentage = productItem.discountPercentage || 0;
  const originalPrice = discountPercentage > 0 && discountPercentage < 100 
    ? (productItem.price / (1 - discountPercentage / 100)).toFixed(2)
    : (productItem.price * 1.2).toFixed(2); // Default 20% markup if no valid discount

  const savings = (originalPrice - productItem.price).toFixed(2);
  const reviewCount = productItem.reviews ? productItem.reviews.length : 0;

  // Get the current main image (either selected thumbnail or default thumbnail)
  const mainImageSrc = productItem.images && productItem.images[selectedImageIndex] 
    ? productItem.images[selectedImageIndex] 
    : productItem.thumbnail;

  return ( 
    <>
      <NavBar />
      <div className="container">
        {/* Main Product Details */}
        <section className="product-details">
          <div className="product-main">
            {/* Image Gallery */}
            <div className="image-gallery">
              <div className="main-image">
                <img src={mainImageSrc} alt={productItem.title} id="mainImage" />
                {discountPercentage > 0 && (
                  <div className="discount-badge">{discountPercentage.toFixed(1)}% OFF</div>
                )}
              </div>
              <div className="thumbnail-gallery">
                {productItem.images && productItem.images.map((productPicture, i) => (
                  <div 
                    className={`thumbnail ${i === selectedImageIndex ? 'active' : ''}`} 
                    key={i} 
                    onClick={() => handleThumbnailClick(i)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={productPicture} alt={`${productItem.title} view ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-category">{productItem.category}</div>
              <h1 className="product-title">{productItem.title}</h1>
              
              <div className="rating-section">
                <div className="stars">
                  ⭐ {productItem.rating}
                </div>
                <span className="rating-count">({reviewCount} reviews)</span>
              </div>

              <div className="price-section">
                <span className="current-price">${productItem.price}</span>
                {discountPercentage > 0 && (
                  <>
                    <span className="original-price">${originalPrice}</span>
                    <span className="savings">Save ${savings}</span>
                  </>
                )}
              </div>

              <div className="stock-status">
                <div className="stock-indicator"></div>
                <span className="stock-text">
                  {productItem.stock > 0 
                    ? `In Stock (${productItem.stock} remaining)` 
                    : 'Out of Stock'
                  }
                </span>
              </div>

              <p className="product-description">
                {productItem.description}
              </p>

              <div className="action-section">
                <div className="action-buttons">
                  <button 
                    disabled={isInCart || productItem.stock === 0}
                    onClick={() => handleAddToCart(productItem)}
                    className={`btn btn-primary${(isInCart || productItem.stock === 0) ? 'disabled' : ''}`}
                    aria-label={`Add ${productItem.title} to cart`}
                  >
                    {productItem.stock === 0 
                      ? 'Out of Stock' 
                      : isInCart 
                        ? 'In Cart' 
                        : 'Add to Cart'
                    }
                  </button>
                  <button 
                    className="btn btn-secondary"
                    disabled={productItem.stock === 0}
                  >
                    Buy Now
                  </button>
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
              <span className="spec-value">{productItem.brand || 'N/A'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Category</span>
              <span className="spec-value">{productItem.category}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Weight</span>
              <span className="spec-value">{productItem.weight ? `${productItem.weight}kg` : 'N/A'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Dimensions</span>
              <span className="spec-value">
                {productItem.dimensions 
                  ? `${productItem.dimensions.width.toFixed(0)} x ${productItem.dimensions.height.toFixed(0)} x ${productItem.dimensions.depth.toFixed(0)}cm`
                  : 'N/A'
                }
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">SKU</span>
              <span className="spec-value">{productItem.sku || 'N/A'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Warranty</span>
              <span className="spec-value">{productItem.warrantyInformation || 'N/A'}</span>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="reviews">
          <div className="reviews-header">
            <h2 className="spec-title">Customer Reviews</h2>
            <button className="btn btn-secondary" style={{ flex: 'none', padding: '0.5rem 1rem' }}>
              Write a Review
            </button>
          </div>

          {productItem.reviews && productItem.reviews.length > 0 ? (
            productItem.reviews.map((productReview, index) => (
              <div className="review-item" key={index}>
                <div className="review-header">
                  <span className="reviewer-name">{productReview.reviewerName}</span>
                  <span className="review-date">
                    {new Date(productReview.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="review-rating">
                  <span>
                    {'⭐'.repeat(Math.floor(productReview.rating))} ({productReview.rating})
                  </span>
                </div>
                <p className="review-text">
                  {productReview.comment}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews available for this product.</p>
          )}
        </section>
      </div>
    </>
  );
}

export default ProductDetails;