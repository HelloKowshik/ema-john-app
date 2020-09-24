import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(watch("example")); 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='ship-form'>
        <input name="name" placeholder='Name' defaultValue={loggedUser.displayName} ref={register({ required: true })} />
          {errors.name && <span className='error'>Name field is required</span>}
        <input name="email"disabled placeholder='Email' defaultValue={loggedUser.email} ref={register({ required: true })} />
          {errors.email && <span className='error'>Email field is required</span>}
        <input name="address" placeholder='Full Address' ref={register({ required: true })} />
          {errors.address && <span className='error'>Address field is required</span>} 
        <input name="phone" placeholder='Phone Number' ref={register({ required: true })} />
          {errors.phone && <span className='error'>Phone field is required</span>}  
    <input type="submit" />
    </form>
  );
};

export default Shipment;