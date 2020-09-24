import React from 'react';

const ReviewItem = props => {
    const { key, name, quantity, price } = props.item;
    const handleRemove = () => {
        props.removeProduct(key);
    };
    return (
        <div className='review-item'>
            <h5 className='product-name'>Product Name: {name}</h5>
            <h6>Quantity:{quantity}</h6>
            <h6>Unit Price: {price}</h6>
            <button className='add-to-cart-btn' onClick={handleRemove}>Remove Item</button>
        </div>
    );
};

export default ReviewItem;