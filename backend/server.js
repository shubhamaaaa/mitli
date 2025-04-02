import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import productRoute from './routes/productRoute.js';
import cartRouter from './routes/cartRoutes.js';
import couponRouter from './routes/coupanRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import router from './routes/subscribeRoutes.js';
import contactRouter from './routes/contactRoutes.js';


const app=express();

app.use(cors({ origin: "*" }));
app.use(express.json())
app.use(bodyParser.json())


connectDB();
connectCloudinary();




app.use('/api/auth',authRoutes)
app.use('/api/product',productRoute);
app.use('/api/cart',cartRouter)
app.use('/api/coupon',couponRouter)
app.use('/api/order',orderRouter)
app.use('/api',router)
app.use('/api/contact',contactRouter)


const PORT =process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})