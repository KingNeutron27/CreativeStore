import {  createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const ShoppingCartContext = createContext()

function ShoppingCartProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [productItem, setProductItem] = useState(null);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://dummyjson.com/products');
      const result = await response.json();
      if(result?.products.length > 0) {
        setProducts(result.products)
      }
    } catch (error){
      setLoading(false)
      console.error(error);
      setError('Trouble fetching the data')
    } finally{
      setLoading(false)
    }
  }

  const handleAddToCart = (getProductItem) => {
    console.log(getProductItem)
    const copyExistingItem = [...cartItems]
    //check if the item has been added to cart
    const findCurrentIndex = copyExistingItem.findIndex(item =>item.id === getProductItem.id)
    // console.log(findCurrentIndex) 
    if (findCurrentIndex === -1) {
      //push the the current quantity and total price
      copyExistingItem.push({
        ...getProductItem,
        quantity: 1,
        totalPrice : getProductItem?.price
      })
    } else {
      console.log('it is coming here')
    }
    setCartItems(copyExistingItem)
    console.log('copyExistingItem', copyExistingItem)
    localStorage.setItem('cartProduct', JSON.stringify(copyExistingItem))
    navigate('/cart')
  }

  console.log(cartItems)
  // console.log(products)
  useEffect(() => {
    fetchData()
  }, [])
  return <ShoppingCartContext.Provider value={{
    products,
    loading,
    error,
    setLoading,
    setError,
    productItem, 
    setProductItem,
    handleAddToCart,
    cartItems
  }}>
    {children}
  </ShoppingCartContext.Provider>
}

export default ShoppingCartProvider
