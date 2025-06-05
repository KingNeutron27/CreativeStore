
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import About from './pages/About'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/product/:id' element={<ProductDetails />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/cart' element={<Cart />}/>
      </Routes>
    </>
  )
}

export default App
