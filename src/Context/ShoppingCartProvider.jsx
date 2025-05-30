import {  createContext, useState, useEffect } from "react"

export const ShoppingCartContext = createContext()

function ShoppingCartProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
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
  console.log(products)
  useEffect(() => {
    fetchData()
  }, [])
  return <ShoppingCartContext.Provider value={{
    products,
    loading,
    error
  }}>
    {children}
  </ShoppingCartContext.Provider>
}

export default ShoppingCartProvider
