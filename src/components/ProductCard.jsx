import '../css/ProductCard.css'

function ProductCard() {
  return (
    <section className='product-container'>
      <div className='card'>
        <div className="card-info">
          <div className="image-container">
          <img src="https://i.pinimg.com/736x/a8/33/7f/a8337f50ffaf22a9f4c350ed63362ec8.jpg" alt="Headphone" />
          <p className="discount-percentage">-14%</p>
        </div>
        <div className="card-details">
          <h3>Premuim Wireless Headphones</h3>
          <p className='rating'><span>⭐</span>4.8</p>
          <h1>$299.99
            <span className='discounted-price'>$399.99</span></h1>
        </div>
          <button className='add-to-cart'>Add to cart</button>
        </div>
      </div>
      <div className='card'>
        <div className="card-info">
            <div className="image-container">
            <img src="https://i.pinimg.com/736x/a8/33/7f/a8337f50ffaf22a9f4c350ed63362ec8.jpg" alt="Headphone" />
            <p className="discount-percentage">-14%</p>
          </div>
          <div className="card-details">
            <h3>Premuim Wireless Headphones</h3>
            <p className='rating'><span>⭐</span>4.8</p>
            <h1>$299.99
              <span className='discounted-price'>$399.99</span>
            </h1>
          </div>
            <button className='add-to-cart'>Add to cart</button>
        </div>
      </div>
      <div className='card'>
        <div className="card-info">
          <div className="image-container">
            <img src="https://i.pinimg.com/736x/28/8e/29/288e29982e1cdfa01e1aba6b62e74d3c.jpg" alt="Headphone" />
            <p className="discount-percentage">-14%</p>
          </div>
          <div className="card-details">
            <h3>Premuim Wireless Headphones</h3>
            <p className='rating'><span>⭐</span>4.8</p>
            <h1>$299.99
              <span className='discounted-price'>$399.99</span>
            </h1>
          </div>
          <button className='add-to-cart'>Add to cart</button>
        </div>
      </div>
      <div className='card'>
        <div className="card-info">
          <div className="image-container">
            <img src="https://i.pinimg.com/736x/37/a8/ae/37a8ae2095512429d5d0ffa5d8675378.jpg" alt="Headphone" />
            <p className="discount-percentage">-14%</p>
          </div>
          <div className="card-details">
            <h3>Premuim Wireless Headphones</h3>
            <p className='rating'><span>⭐</span>4.8</p>
            <h1>$299.99
              <span className='discounted-price'>$399.99</span>
            </h1>
          </div>
          <button className='add-to-cart'>Add to cart</button>
        </div>
      </div>
      <div className='card'>
        <div className="card-info">
          <div className="image-container">
            <img src="https://i.pinimg.com/736x/ba/b4/ce/bab4ce5eb146f5bafc156767623b6dec.jpg" alt="Headphone" />
            <p className="discount-percentage">-14%</p>
          </div>
          <div className="card-details">
            <h3>Premuim Wireless Headphones</h3>
            <p className='rating'><span>⭐</span>4.8</p>
            <h1>$299.99
              <span className='discounted-price'>$399.99</span>
            </h1>
          </div>
          <button className='add-to-cart'>Add to cart</button>
        </div>
      </div>
    </section>
  )
}

export default ProductCard
