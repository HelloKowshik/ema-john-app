import React, { useState, useEffect } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../assets/images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const removeProduct = productKey => {
        const newCart = cart.filter(item => item.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://salty-crag-04652.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                setCart(data);
            });
        console.log(cart);
        // const cartProducts = productKeys.map(key => {
        //     const product = fakeData.find(product => product.key === key);
        //     product.quantity = savedCart[key];
        //     return product;
        // });
        // setCart(cartProducts);
    }, []);
    // console.log(cart);

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt='Thank You' />;
    }

    const handleProceedOrder = () => {
        history.push('/shipment');
    }

    return (
        <div className='shop-container'>
            <div className='product-container'>
            {
                cart.map((item, i) => (<ReviewItem item={item} key={i} removeProduct={removeProduct}/>))
            }
            {
                cart.length === 0 && orderPlaced === false ? <h1>Your cart is empty. <a href="/shop">Keep shopping</a></h1> : ''
                    
            }
                {
                    thankYou
                }
            </div>
            
            <div className="cart-container">
                <Cart cart={cart}>
                <button className='add-to-cart-btn' onClick={handleProceedOrder} >Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;