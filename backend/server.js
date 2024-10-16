const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
// const cors = require('cors');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
connectDB();
const app = express();

//Middleware cors
// app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const { notfound, errorHandler } = require('./middleware/errorHandler');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
app.get('/', (req, res) => {
  res.send('api is running');
});
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.get('/api/config/paypal',(req,res)=>{
  res.send({clientId:process.env.PAYPAL_CLIENT_ID});
})
app.use(notfound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`); // log the server status message to the console when the server starts.  // 5000 is the port number we set up for our server.  // 'Server running on port 5000' is the message we're logging to the console.  // This line will be executed once the server has started.  // The server is now ready to receive and respond to HTTP requests.  // The server listens for incoming requests on port 5000.  // When a request comes in, the server will execute the corresponding route handler and send the response.  // The route handler is defined in the app.get() method below.  // The route handler function takes two arguments: req (the request object) and res (the response object).  // The res.send() method sends a response with the provided status code and body.  // In this case, the server sends
});
