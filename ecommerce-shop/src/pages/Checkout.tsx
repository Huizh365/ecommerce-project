import React, { useState, useEffect, FormEvent } from 'react';
// import {loadStripe} from '@stripe/stripe-js'
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout
// } from '@stripe/react-stripe-js'
import { CustomerCreate } from '../types/Customer'
import { useCustomers } from '../hooks/useCustomers'
import { ChangeEvent } from 'react'

// const stripePromise = loadStripe('pk_test_51R4GtGLXMXfp1X0Luq3XRc5atnzyrApfXMCRVHgvPCDZtZxt13xgOkDTfqhYJKxZwtLMStsHzpttDCQJdkioGqjY00ZdahA5zH')

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
          localStorage.setItem("customer", JSON.stringify(newCustomer))
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

    const handleOrder = async (e:FormEvent) => {
      e.preventDefault()
      const id = await handleCustomer()
      console.log(id)
        //createOrder: customerID, cart, payment_status, etc
        //return orderID
    }


    // const fetchClientSecret = React.useCallback(() => {
    //     // Create a Checkout Session



    //     return fetch("http://localhost:3000/stripe/create-checkout-session-embedded", {
    //       method: "POST",
    //     })
    //       .then((res) => res.json())
    //       .then((data) => data.clientSecret);
    //   }, []);
    


    //   const options = {fetchClientSecret};
    
      return (
        <div id="checkout">
        <form onSubmit={handleOrder}>
            <label htmlFor="firstname">Firstname
            <input id="firstname" type="text" value={customer.firstname} onChange={handleChange}></input>
            </label>
            
            <label htmlFor="lastname">Lastname
            <input id="lastname" type="text" value={customer.lastname} onChange={handleChange}></input>
            </label>

            <label htmlFor="email">Email
            <input id="email" type="text" value={customer.email} onChange={handleChange}></input>
            </label>

            <label htmlFor="phone">Phone
            <input id="phone" type="text" value={customer.phone} onChange={handleChange}></input>
            </label>

            <label htmlFor="postal_code">Postal-code
            <input id="postal_code" type="text" value={customer.postal_code} onChange={handleChange}></input>
            </label>

            <label id="address-label" htmlFor="street_address">Address
            <input id="street_address" type="text" value={customer.street_address} onChange={handleChange}></input>
            </label>

            <label htmlFor="city">City
            <input id="city" type="text" value={customer.city} onChange={handleChange}></input>
            </label>

            <label htmlFor="country">Country
            <input id="country" type="text" value={customer.country} onChange={handleChange}></input>
            </label>

            <button className="submit-btn" type="submit">Pay</button>
            <button className="cancel-btn" type="button" onClick={()=>navigate("/cart")}>Back</button>

        </form> 
    



          <h3>Betalning</h3>
          {/* <EmbeddedCheckoutProvider
            stripe={stripePromise}
            // options={options}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider> */}
        </div>
      )
}