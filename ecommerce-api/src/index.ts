import dotenv from "dotenv";
import express,  { Request, Response } from "express";
import {connectDB} from "./config/db";
import cors from "cors";
import { IOrder } from "./models/IOrder";

dotenv.config();
const app = express();

// Middleware
app.use(express.json())
app.use(cors())

// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
import { updateOrder } from "./controllers/orderController";
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)
app.use('/order-items', orderItemRouter)


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
app.post('/stripe/create-checkout-session-embedded', async (req: Request, res: Response) => {
  const { order_id, line_items } = req.body
  const session = await stripe.checkout.sessions.create({
    //get line_items (order_items info) and order_id from client req: Request
    line_items,
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: 'http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}',
    client_reference_id: order_id
  });

  res.send({clientSecret: session.client_secret});
});



app.post('/stripe/webhook', async (req: Request, res: Response) => {
  const event = req.body;

  switch (event.type) {
    case 'checkout.session.created': {
      const session = event.data.object
      await updateOrder(
        {params: {id: session.client_reference_id}, 
         body: {
          payment_id: session.id,
          payment_status: "unpaid",
          order_status: "pending",
        }} as any, {json: () => {}, status: () => {json: () => {}}} as any
      )
      break
      
    }

    case 'checkout.session.completed': {
      const session = event.data.object;
      
      await updateOrder(
        {params: {id: session.client_reference_id}, 
         body: {
          payment_id: session.id,
          payment_status: "paid",
          order_status: "received",
        }} as any, {json: () => {}, status: () => {json: () => {}}} as any
      )


      // Update product stock

      break
    }
      
   
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({received: true});
});

// Attempt to connect to the database
connectDB()
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
})
