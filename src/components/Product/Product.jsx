import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = props => {
    const { key, name, img, seller, price, stock, features } = props.product;
    const handleClick = () => props.handleAddProduct(props.product);
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={img} alt='product-related' />
            </div>
            <div className='product-des'>
                <h4 className='product-name'><Link to={'/product/'+key}>{name}</Link></h4>
                <p><small>by {seller}</small></p>
                <p>${price}</p>
                <p>only {stock} left in stock-order soon</p>
                {
                    features  ? <ul>{features.map((feature, index) => (<li key={index} >{feature.description}-{feature.value}</li>))}</ul> : <p>Features Not Available</p>
                }
                {
                    props.showAddToCart && <button className='add-to-cart-btn' onClick={handleClick}> <FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</button>
                }
            </div>
        </div>
    );
};

export default Product;