import '../css/ProductDetails.css';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import Spinner from '../components/Spinner';
import { ShoppingCartContext } from '../Context/ShoppingCartProvider';
import { BiSolidError } from "react-icons/bi";

function ProductDetails() {
  const { id } = useParams()
  const {error, setError, loading, setLoading, productItem, setProductItem, handleAddToCart} = useContext(ShoppingCartContext)
  const ProductDetailsData = async () => {
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
  };
  
  useEffect(() => {
    if (id) {
      ProductDetailsData();
    }
  }, [id]);

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

  console.log(productItem);

  const discountPercentage = productItem.discountPercentage || 0;
  const originalPrice = discountPercentage > 0 && discountPercentage < 100 
    ? (productItem.price / (1 - discountPercentage / 100)).toFixed(2)
    : (productItem.price * 1.2).toFixed(2); // Default 20% markup if no valid discount

  const savings = (originalPrice - productItem.price).toFixed(2);
  const reviewCount = productItem.reviews ? productItem.reviews.length : 0;

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
                <img src={productItem.thumbnail} alt={productItem.title} id="mainImage" />
                <div className="discount-badge">{discountPercentage.toFixed(1)}% OFF</div>
              </div>
              <div className="thumbnail-gallery">
                {productItem.images && productItem.images.map((productPicture, i) => (
                  <div className="thumbnail" key={i} onClick={() => {}}>
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
                <span className="original-price">${originalPrice}</span>
                <span className="savings">Save ${savings}</span>
              </div>

              <div className="stock-status">
                <div className="stock-indicator"></div>
                <span className="stock-text">In Stock ({productItem.stock} remaining)</span>
              </div>

              <p className="product-description">
                {productItem.description}
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
                  <button 
                    onClick={() => handleAddToCart(productItem)}
                    className="btn btn-primary">Add to Cart</button>
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
              <span className="spec-value">{productItem.brand || 'N/A'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Category</span>
              <span className="spec-value">{productItem.category}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Weight</span>
              <span className="spec-value">{productItem.weight || 'N/A'}kg</span>
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
            <button className="btn btn-secondary" style={{ flex: 'none', padding: '0.5rem 1rem' }}>Write a Review</button>
          </div>

          {productItem.reviews && productItem.reviews.length > 0 ? (
            productItem.reviews.map((productReview, index) => (
              <div className="review-item" key={index}>
                <div className="review-header">
                  <span className="reviewer-name">{productReview.reviewerName}</span>
                  <span className="review-date">{new Date(productReview.date).toLocaleDateString()}</span>
                </div>
                <div className="review-rating">
                  <span>{'⭐'.repeat(Math.floor(productReview.rating))} ({productReview.rating})</span>
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