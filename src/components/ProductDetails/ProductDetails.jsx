import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = props => {
    const { productKey } = useParams();
    const [product, setProduct] = useState([]);
    // console.log(productKey);
    useEffect(() => {
        fetch(`https://salty-crag-04652.herokuapp.com/product/${productKey}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            });
    }, [productKey]);
    // const product = fakeData.find(singleProduct => singleProduct.key === productKey);
    // const { key, name, img, seller, price, stock, features } = product;
    // console.log(product);
    
    return (
        <div>
            <h1>Product Details</h1>
            <hr />
            <Product product={product} showAddToCart={false} />
            <Link to='/shop'><button className='add-to-cart-btn' >Go Back</button></Link>
        </div>
    );
};

export default ProductDetails;