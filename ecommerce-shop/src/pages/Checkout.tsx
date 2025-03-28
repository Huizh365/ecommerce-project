import { useState, useEffect, FormEvent, useCallback } from 'react';
import {loadStripe} from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js'
import { CustomerCreate } from '../types/Customer'
import { useCustomers } from '../hooks/useCustomers'
import { ChangeEvent } from 'react'
import { OrderCreate, OrderItemCreate } from '../types/Order';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import axios from 'axios';


const stripePromise = loadStripe('pk_test_51R4GtGLXMXfp1X0Luq3XRc5atnzyrApfXMCRVHgvPCDZtZxt13xgOkDTfqhYJKxZwtLMStsHzpttDCQJdkioGqjY00ZdahA5zH')

export const Checkout = () => {
    const [customer, setCustomer] = useState<CustomerCreate>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        street_address: "",
        postal_code: "",
        city: "",
        country: ""
      })
    
    const [customerID, setCustomerID] = useState<number | null>(null)
    const [orderId, setOrderId] = useState<string>("")
    const [showPayment, setShowPayment] = useState(false);
    const [isCheckoutReady, setIsCheckoutReady] = useState(false); 
    const {cart} = useCart()
    const { handleCreateOrder } = useOrders()

    
    useEffect(() =>{
      const savedCustomerInfo = localStorage.getItem("customer")
      if(savedCustomerInfo) {
        setCustomer(JSON.parse(savedCustomerInfo))
      }
    },[])

    
    const {navigate, fetchCustomerByEmailHandler, createCustomerHandler, isLoading, error, setError} = useCustomers()
    
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setCustomer(customer => {
          const updatedCustomer = {...customer, [e.target.id]: e.target.value}
          localStorage.setItem("customer", JSON.stringify(updatedCustomer))
          return updatedCustomer
        })  
    }
    
    const handleCustomer = async () => {
      try{
        const result = await fetchCustomerByEmailHandler(customer.email)
        if(result && 'message' in result) {
          const newCustomer = await createCustomerHandler(customer)
          setCustomerID(newCustomer.id)
          return newCustomer.id
        } else if ("id" in result) {
          setCustomerID(result.id)
          return result.id
        } else {
          throw new Error("Unexpected error")
        }     
      } catch (error) {
        setError("Error handling customer.")
      }
    }

    const fetchClientSecret = useCallback(async() => {
      if(!orderId) {
        throw new Error("Order ID not exist");
      }
      try{
        const payload = {
          order_id: orderId,
          line_items: cart.map(item => ({
            price_data: {
              currency: "SEK",
              product_data: {
                name: item.product.name,
                images: [item.product.image]
              },
              unit_amount: item.product.price * 100
            },
            quantity: item.quantity
          }))
        }
        const response = await axios.post("http://localhost:3000/stripe/create-checkout-session-embedded", payload)
        console.log(response)
        return response.data.clientSecret
      } catch (error) {
        setError("Faild to initialize payment")
      }  
    }, [orderId, cart]);

    const handleOrder = async (e:FormEvent) => {
      e.preventDefault()
      setError("")
      try {
        const customerId = await handleCustomer()
        if (!customerId) {
          throw new Error("Failed to get customer ID")
        }
        const orderItems: OrderItemCreate[] = cart.map(item =>({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          unit_price: item.product.price
        })) 
        const newOrder: OrderCreate = {
          customer_id: customerId,
          payment_status: "unpaid",
          payment_id: "",
          order_status: "pending",
          order_items: orderItems
        }
        const createdOrder = await handleCreateOrder(newOrder)
        setOrderId(createdOrder.id)
        setIsCheckoutReady(true)
        setShowPayment(true)
      } catch (error) {
        setError("Checkout failed")
      } 
    }

    
      return (
        <div id="checkout">
          {!showPayment ? (
          <form onSubmit={handleOrder}>
            <label htmlFor="firstname">Firstname
            <input id="firstname" type="text" value={customer.firstname} onChange={handleChange} required></input>
            </label>
            
            <label htmlFor="lastname">Lastname
            <input id="lastname" type="text" value={customer.lastname} onChange={handleChange} required></input>
            </label>

            <label htmlFor="email">Email
            <input id="email" type="text" value={customer.email} onChange={handleChange} required></input>
            </label>

            <label htmlFor="phone">Phone
            <input id="phone" type="text" value={customer.phone} onChange={handleChange} required></input>
            </label>

            <label htmlFor="postal_code">Postal-code
            <input id="postal_code" type="text" value={customer.postal_code} onChange={handleChange} required></input>
            </label>

            <label id="address-label" htmlFor="street_address">Address
            <input id="street_address" type="text" value={customer.street_address} onChange={handleChange} required></input>
            </label>

            <label htmlFor="city">City
            <input id="city" type="text" value={customer.city} onChange={handleChange} required></input>
            </label>

            <label htmlFor="country">Country
            <input id="country" type="text" value={customer.country} onChange={handleChange} required></input>
            </label>

            <button className="submit-btn" type="submit" disabled={isLoading}>Pay</button>
            <button className="cancel-btn" type="button" onClick={()=>navigate("/cart")}>Back</button>
            {error && <p>{error}</p>}

        </form> 
        ) : (
        <div>
        {isCheckoutReady && orderId && (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        )}

        </div>
        )}

        </div>

      )
} 