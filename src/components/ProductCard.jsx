import { useNavigate } from 'react-router-dom';
import '../css/ProductCard.css';
import { useContext } from 'react';
import { ShoppingCartContext } from '../Context/ShoppingCartProvider';


function ProductCard({ product }) {
  const {handleAddToCart} = useContext(ShoppingCartContext)
  const navigate = useNavigate()
  const handleViewDetails = (getCurrentId) => {
    navigate(`/product/${getCurrentId}`);
  };
 

  return (
    <div className="card">
      <div className="card-info">
        <div className="image-container">
          <img src={product.thumbnail} alt={product.title} />
          {product.discountPercentage > 0 && (
            <p className="discount-percentage">{product.discountPercentage.toFixed(1)}%</p>
          )}
        </div>
        <div className="card-details">
          <h2 className="category">{product.category}</h2>
          <h3>{product.title}</h3>
          <p className="rating">
            <span>⭐</span> {product.rating.toFixed(1)}
          </p>
          <div className="price">
            ${product.price.toFixed(2)}
            {product.discountPercentage > 0 && product.discountPercentage < 100 ? (
              <span className="discounted-price">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            ) : (
              <span className="discounted-price">
                ${(product.price * 1.15).toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <button 
          onClick={() => handleViewDetails(product.id)}
          className="view-details">View Details</button>
        <button 
          onClick={() => handleAddToCart(product)}
          className="add-to-cart" aria-label={`Add ${product.title} to cart`}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;