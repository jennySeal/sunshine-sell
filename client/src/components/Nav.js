import React from 'react'
import {Link} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { emptyCartForSale, selectCart } from './../slice_reducers/cartSlice';
import { selectCustomer, loggedOutOfCustomerDb, talkingToCustomerDbFailed } from './../slice_reducers/customerSlice';
import API_Endpoint from './../config/server';
import './../styles/nav.css';

const axios = require('axios');

const Nav = () => {

    const cart = useSelector(selectCart)
    const cartCounter = cart.data.length;
    const customerInfo = useSelector(selectCustomer);
    const loggedIndicator = customerInfo.isLoggedin;
    
    const dispatch = useDispatch();
    
    const logoutOfDb = async() => { 
      try {
      const response = await axios.get(`${API_Endpoint}/logout`)
      if (response.status === 200) {
      dispatch(loggedOutOfCustomerDb(response.data)) 
      dispatch(emptyCartForSale())   
    }}
      catch (error) {
      dispatch(talkingToCustomerDbFailed)
    };
    };
    
    const logout = (e) => {
      e.preventDefault()
      logoutOfDb()
    }
    

    return (
        <div>
        <nav>
              <Link to="/"><img src="/images/homeIcon.png" alt="Homepage Icon" id="icon"/></Link>
              <div id='cartCounterFlex'><Link to="/cart"><img src="/images/shoppingBagIcon.png" alt="Shopping Bag Icon for Cart" id="icon"/><span id="cartCounter">{cartCounter}</span></Link></div>
              {!loggedIndicator && <Link to={{pathname:'/login', state: {fromCart: false}}}><p>Log In / Register</p></Link>}
              {loggedIndicator &&  <div id='hiAndLogout'><Link to="/account">{customerInfo.data.first_name}'s account </Link><button onClick={logout}>Logout</button></div>}
    
              </nav>
       
        </div>
    )
}

export default Nav
