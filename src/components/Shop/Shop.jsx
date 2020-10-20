import React, { useEffect, useState } from 'react';
import './Shop.css';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    // const firstFifteen = fakeData.slice(0, 15);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState([]);
    useEffect(() => { 
        fetch(`http://127.0.0.1:4141/products?search=${search}`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [search]);

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
        // if (products.length) {
        //     const previousCart = productKeys.map(existingKey => {
        //         // const product = fakeData.find(pd => pd.key === existingKey);
        //         const product = products.find(pd => pd.key === existingKey);
        //         product.quantity = savedCart[existingKey];
        //         return product;
        //     })
        //     setCart(previousCart);
        // }
    }, []);

    const handleAddProduct = product => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(prd => prd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    const handleSearch = e => {
        setSearch(e.target.value);
    }
    
    return (
        <div className='shop-container'>
            <div className="product-container">
                <input type="text" placeholder='Search Product By Name' onBlur={handleSearch} style={{height:'20px',width:'100%'}}/>
                {
                    products.length === 0 && <p>Loading...</p>
                }
                {
                    products.map(product => (<Product key={product.key} product={product} handleAddProduct={handleAddProduct} showAddToCart={true} />))
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'><button className='add-to-cart-btn' >Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;