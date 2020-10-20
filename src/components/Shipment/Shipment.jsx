import React, { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Payment from '../Payment/Payment';
import './Shipment.css';

const Shipment = () => {
  const [loggedUser, setLoggedUser] = useContext(UserContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const [shippingData, setShippingData] = useState(null);
  const history = useHistory();
  const savedCart = getDatabaseCart();
  const onSubmit = data => {
    setShippingData(data);
  };

  const handlePayment = paymentId => {
    const orderDetails = {
      ...loggedUser,
      products: savedCart,
      paymentId,
      shipment: shippingData,
      orderTime: new Date(),
    };
    fetch('https://salty-crag-04652.herokuapp.com/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          alert('Order Success!');
          history.push('/shop');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  // console.log(watch("example"));

  return (
    <div className='row'>
      <div className='col-md-6' style={{display: shippingData ? 'none' : 'block'}}>
        <form onSubmit={handleSubmit(onSubmit)} className='ship-form'>
          <input
            name='name'
            placeholder='Name'
            defaultValue={loggedUser.displayName}
            ref={register({ required: true })}
          />
          {errors.name && <span className='error'>Name field is required</span>}
          <input
            name='email'
            
            placeholder='Email'
            defaultValue={loggedUser.email}
            ref={register({ required: true })}
          />
          {errors.email && (
            <span className='error'>Email field is required</span>
          )}
          <input
            name='address'
            placeholder='Full Address'
            ref={register({ required: true })}
          />
          {errors.address && (
            <span className='error'>Address field is required</span>
          )}
          <input
            name='phone'
            placeholder='Phone Number'
            ref={register({ required: true })}
          />
          {errors.phone && (
            <span className='error'>Phone field is required</span>
          )}
          <input type='submit' />
        </form>
      </div>
      <div className='col-md-6 ml-3 mt-3' style={{display: shippingData ? 'block' : 'none'}}>
        <Payment handlePayment={handlePayment} />
      </div>
    </div>
  );
};

export default Shipment;
