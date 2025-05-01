import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDb.js';
import userRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import myListRouter from './routes/mylist.route.js';
import addressRouter from './routes/address.route.js';
import paymentRouter from './routes/payment.route.js';
import orderRouter from './routes/order.route.js';
import productColorRouter from './routes/productColor.route.js';


const app = express();
app.use(cors());

app.options('*', cors());

app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'))
app.use(helmet({
    crossOriginResourcePolicy : false
}))

app.get("/", (request, response) => {
    /// server to client
    response.json({
        message: "Server is running " + process.env.PORT
    });
});

app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/myList',myListRouter)
app.use('/api/address',addressRouter)
app.use('/api/productColor',productColorRouter)
app.use('/api/payment', paymentRouter);
app.use('/api/order', orderRouter);

connectDB().then(()=> {
    app.listen(process.env.PORT, () => {
        console.log("Server is running", process.env.PORT);
    })
})
