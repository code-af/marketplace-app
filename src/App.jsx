import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './Components/Header/Header'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Products from './Pages/Products/Products'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Sell from './Pages/Sell/Sell'
import Profile from './Pages/Profile/Profile'
import './App.css'

function App() {
  const location = useLocation()
  const hideHeader = ['/login', '/signup', '/profile'].includes(location.pathname)
  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/sell' element={<Sell />} />
          <Route path='/profile' element={<Profile />} />
      </Routes>
    </>    
  )
}

export default App
