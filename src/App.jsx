
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/product/:id' element={<ProductDetails />}/>
        <Route path='/cart' element={<Cart />}/>
      </Routes>
    </>
  )
}

export default App
