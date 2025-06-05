const CartCard = ({ id, name, price, priceEach, imageUrl, quantity, handleQuantityChange, handleRemoveFromCart}) => {
  return (
    <div className="item-container">
      <div className="item-details-container">
        <div className="item-image-container">
          <img 
            className="item-image"
            src={imageUrl} 
            alt={`${name} product image`} 
          />
        </div>
        <div className="item-name-and-qty">
          <div className="item-name">
            <h3>{name}</h3>
          </div>
          <div className="qty-button">
            <button 
              disabled={quantity === 1}
              onClick={() => handleQuantityChange(id, 'decrease')}
            >-</button>
            <span>{quantity}</span>
            <button 
              onClick={() => handleQuantityChange(id, 'increase')}
            >+</button>
          </div>
        </div>
      </div>
      <div className="item-price-container">
        <div className="item-price">
          <h3>${parseFloat(price).toFixed(2)}</h3>
          <p>${parseFloat(priceEach).toFixed(2)}</p>
        </div>
        <button 
          className="remove-button" 
          onClick={() => handleRemoveFromCart(id)}
        >
          <span>✕</span>
          <span>Remove</span>
        </button>
      </div>
    </div>
  )
}

export default CartCard