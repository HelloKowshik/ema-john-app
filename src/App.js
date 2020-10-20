import React, { useState } from 'react';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NoMatch from './components/NoMatch/NoMatch';
import ProductDetails from './components/ProductDetails/ProductDetails';
import './App.css';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = React.createContext();


function App() {
  const [loggedUser, setLoggedUser] = useState({});
  // console.log(loggedUser);
  return (
    <UserContext.Provider value={[loggedUser, setLoggedUser]}>
      <h3>EMAIL:{loggedUser.email}</h3>
      <BrowserRouter>
      <Header />
        <Switch>
          <Route path='/shop'>
          <Shop />
          </Route>
          <Route path='/review'>
            <Review />
          </Route>
          <PrivateRoute path='/inventory'>
            <Inventory />
          </PrivateRoute>
          {
          //   <Route path='/inventory'>
          //   <Inventory />
          // </Route> 
            // <Route path='/shipment'>
            // <Shipment />
            // </Route>
          }
          <PrivateRoute path='/shipment'>
            <Shipment />
          </PrivateRoute>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/' exact>
          <Shop />
          </Route>
          <Route path='/product/:productKey'>
            <ProductDetails />
          </Route>
          <Route path='*'>
          <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
