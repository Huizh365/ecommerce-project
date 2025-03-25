import dotenv from "dotenv";
import express,  { Request, Response } from "express";
import {connectDB} from "./config/db";
import cors from "cors";

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
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)
app.use('/order-items', orderItemRouter)


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
app.post('/stripe/create-checkout-session-embedded', async (req: Request, res: Response) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'SEK',
          product_data: {
            name: 'Rikards Tårta',
            images: ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fusercontent.one%2Fwp%2Fwww.foodbylaven.se%2Fwp-content%2Fuploads%2F2020%2F10%2FDBB2DADD-264D-4003-9BD5-245331785548-1300x1300.jpg&f=1&nofb=1&ipt=260d639620b12c5ea5985f74668df5b56cde82438205e5a518014ebf502ea279&ipo=images']
          },
          unit_amount: 5 * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: 'http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}',
    client_reference_id: '123'
  });

  res.send({clientSecret: session.client_secret});
});



app.post('/stripe/webhook', (req: Request, res: Response) => {
  const event = req.body;

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log(session);
      
      // Update order with confirmed payment
      // -- payment_status = "Paid"
      // -- payment_id = session.id
      // -- order_status = "Received"

      // Update product stock

      // Send confirmation email to customer

      // Sen purchase to accounting service
      console.log(event.type.object);
   
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
