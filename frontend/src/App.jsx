import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shop from './pages/Shop.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import LoginSignUp from './pages/LoginSignUp.jsx'
import ShopCategory from './pages/ShopCategory.jsx'
import Footer from './components/footer/Footer.jsx'
import men_banner from './assets/banner_mens.png'
import women_banner from './assets/banner_women.png'
import kid_banner from './assets/banner_kids.png'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>}></Route>
          <Route path='/men' element={<ShopCategory category='men' banner={men_banner}/>}></Route>
          <Route path='/women' element={<ShopCategory category='women' banner={women_banner}/>}></Route>
          <Route path='/kids' element={<ShopCategory category='kid' banner={kid_banner}/>}></Route>
          <Route path='product' element={<Product/>}> 
            <Route path=':productId' element={<Product/>}></Route>
          </Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/login' element={<LoginSignUp/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
