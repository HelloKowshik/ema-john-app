import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import StripePayment from './StripePayment';
import SplitForm from './SplitForm';


const stripePromise = loadStripe('pk_test_51HeMpYFpbMAXSiLmVKg4QFcPNqlUrREu64PEMOc8hLKUKiCAETyehE2GZJcDcyVFrG2nv2nGXmE7tYkHRXMMFzSm00xLWKkjh3');
const Payment = ({handlePayment}) => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <StripePayment handlePayment={handlePayment} />
      </Elements>
    </div>
  );
};

export default Payment;
