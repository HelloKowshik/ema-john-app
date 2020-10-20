import React from 'react';


const Cart = props => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total, product) => total + product.price * (product.quantity || 1), 0);
    let shipping = 0;
    let tax = Number((totalPrice / 10).toFixed(3));
    if (totalPrice > 35) {
        shipping = 0;
    }
    else if (totalPrice>15) {
        shipping = 4.99;
    }
    else if (totalPrice>0) {
        shipping = 12.99;
    }
    
  return (
    <div>
          <h3>Order Summary</h3>
          <p>Items ordered:{cart.length} </p>
          <p>Items: ${Number(totalPrice.toFixed(3))}</p>
          <p>Shipping Cost: ${shipping}</p>
          <p>Total before TAX: ${Number((totalPrice+shipping).toFixed(3))}</p>
          <p>Estimated TAX: ${tax}</p>
          <h3>Order Total: ${Number((totalPrice + shipping + tax).toFixed(3))}</h3>
          {
            props.children
          }
    </div>
  );
};

export default Cart;
