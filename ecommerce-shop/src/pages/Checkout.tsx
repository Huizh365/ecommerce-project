import * as React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_51R4GtGLXMXfp1X0Luq3XRc5atnzyrApfXMCRVHgvPCDZtZxt13xgOkDTfqhYJKxZwtLMStsHzpttDCQJdkioGqjY00ZdahA5zH')

export const Checkout = () => {
    const fetchClientSecret = React.useCallback(() => {
        // Create a Checkout Session
        return fetch("http://localhost:3000/stripe/create-checkout-session-embedded", {
          method: "POST",
        })
          .then((res) => res.json())
          .then((data) => data.clientSecret);
      }, []);
    
      const options = {fetchClientSecret};
    
      return (
        <div id="checkout">
          <h1>Checkout (Embedded)</h1>
          
          <h3>Varukorg</h3>
          <p>...</p>
    
          <h3>Kund info (formulär)</h3>
          <p>...</p>
    
          <h3>Betalning</h3>
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={options}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      )
}