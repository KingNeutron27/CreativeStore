
const CartCard = ({ name, price, priceEach, imageUrl, quantity, onQuantityChange, onRemove }) => {
  return (
    <div className="item-container">
      <div className="item-details-container">
        <div className={"item-image-container"}>
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
            <button onClick={() => onQuantityChange('decrease')}>-</button>
            <span>{quantity}</span>
            <button onClick={() => onQuantityChange('increase')}>+</button>
          </div>
        </div>
      </div>
      <div className="item-price-container">
        <div className="item-price">
          <h3>{price}</h3>
          <p>{priceEach}</p>
        </div>
        <button className="remove-button" onClick={onRemove}>
          <span>✕</span>
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
};

export default CartCard