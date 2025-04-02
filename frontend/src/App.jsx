import React from 'react'
import Banner from './components/banner'
import Navbar from './components/Navbar'
import { Route, Routes,  } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CartPage from './pages/CartPage'
import Placeorder from './pages/Placeorder'
import Orders from './pages/Orders'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer/>
       <Banner/>
       <Navbar/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:productId' element={<ProductDetail/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        <Route path='/placeorder' element={<Placeorder/>}/>
        <Route path='/orders' element={<Orders/>}/>
        </Routes>
        <Footer/>
    </div>
  )
}

export default App
