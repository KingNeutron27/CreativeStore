import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const ShoppingCartContext = createContext()

function ShoppingCartProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [productItem, setProductItem] = useState(null);
  const [copyStatus, setCopyStatus] = useState({ copied: false, message: '' })
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

  // Copy to clipboard functionality
  const copyToClipboard = async (text, successMessage = 'Copied to clipboard!') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyStatus({ copied: true, message: successMessage })
      
      // Clear the status after 3 seconds
      setTimeout(() => {
        setCopyStatus({ copied: false, message: '' })
      }, 3000)
      
      return true
    } catch (error) {
      console.error('Failed to copy text: ', error)
      setCopyStatus({ copied: false, message: 'Failed to copy' })
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setCopyStatus({ copied: false, message: '' })
      }, 3000)
      
      return false
    }
  }

  // Specific function for copying account numbers
  const copyAccountNumber = async (accountNumber, bankName = '') => {
    const message = bankName 
      ? `${bankName} account number copied!` 
      : 'Account number copied!'
    
    return await copyToClipboard(accountNumber, message)
  }

  // Generic function for copying any text with custom message
  const copyText = async (text, customMessage) => {
    return await copyToClipboard(text, customMessage)
  }

  const handleAddToCart = (getProductItem) => {
    // console.log(getProductItem)
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
       // Item already exists, increase quantity and update total price
      copyExistingItem[findCurrentIndex].quantity += 1
      copyExistingItem[findCurrentIndex].totalPrice = copyExistingItem[findCurrentIndex].quantity * copyExistingItem[findCurrentIndex].price
    }
    setCartItems(copyExistingItem)
    // console.log('copyExistingItem', copyExistingItem)
    localStorage.setItem('cartProduct', JSON.stringify(copyExistingItem))
    navigate('/cart')
  }

  const handleRemoveFromCart = (productId) => {
  let copyExistingItem = [...cartItems]
  const findCurrentIndex = copyExistingItem.findIndex(item => item.id === productId)
  if (findCurrentIndex !== -1) {
    copyExistingItem.splice(findCurrentIndex, 1)
    setCartItems(copyExistingItem)
    localStorage.setItem('cartProduct', JSON.stringify(copyExistingItem))
  }
}

  const handleQuantityChange = (productId, action) => {
    const copyExistingItem = [...cartItems]
    const findCurrentIndex = copyExistingItem.findIndex(item => item.id === productId)
    
    if (findCurrentIndex !== -1) {
      const currentItem = copyExistingItem[findCurrentIndex]
      if (action === 'increase') {
        currentItem.quantity += 1
      } else if (action === 'decrease' && currentItem.quantity > 1) {
        currentItem.quantity -= 1
      }
      currentItem.totalPrice = currentItem.quantity * currentItem.price
      setCartItems(copyExistingItem)
      localStorage.setItem('cartProduct', JSON.stringify(copyExistingItem))
    }
  }

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)  

  // console.log(cartItems)
  // console.log(products)
  useEffect(() => {
    fetchData()
    // get cart items from localStorage on page load
    const storedCart = JSON.parse(localStorage.getItem('cartProduct') || '[]')
    setCartItems(storedCart)
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
    cartItems,
    handleRemoveFromCart,
    handleQuantityChange,
    itemCount,
    // Copy functionality
    copyToClipboard,
    copyAccountNumber,
    copyText,
    copyStatus
  }}>
    {children}
  </ShoppingCartContext.Provider>
}

export default ShoppingCartProvider