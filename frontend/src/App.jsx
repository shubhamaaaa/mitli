import React from 'react'
import Banner from './components/Banner'
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
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import CustomerSupport from './pages/CustomerSupport'
import ShippingPolicy from './pages/ShippingPolicy'
import Terms from './pages/Terms'
import WhatsAppChatButton from './components/WhatsAppChatButton'

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
        <Route path='/privacy' element={<PrivacyPolicy/>}/>
        <Route path='/refund' element={<RefundPolicy/>}/>
        <Route path='/customer' element={<CustomerSupport/>}/>
        <Route path='/shipping' element={<ShippingPolicy/>}/>
        <Route path='/term' element={<Terms/>}/>
        </Routes>
        <Footer/>
        <WhatsAppChatButton/>
    </div>
  )
}

export default App
