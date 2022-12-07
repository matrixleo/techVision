import React from 'react'
import {BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import OrderScreen from './screens/OrderScreen'
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import UserListScreen from './screens/UserListScreen';


function App() {
  return (

    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route exact path='/' element={<HomeScreen/>}/> 
            <Route exact path='/login' element={<LoginScreen/>}/>
            <Route exact path='/register' element={<RegisterScreen/>}/>
            <Route exact path='/shipping' element={<ShippingScreen/>}/>
            <Route exact path='/payment' element={<PaymentScreen/>}/>
            <Route exact path='/placeorder' element={<PlaceOrderScreen/>}/>
            <Route exact path='/order/:id' element={<OrderScreen/>}/>
            <Route exact path='/profile' element={<ProfileScreen/>}/>
            <Route exact path='/product/:id' element={<ProductScreen/>}/> 
            <Route exact path='/cart/:id' element={<CartScreen/>}/> 
            <Route exact path='/cart' element={<CartScreen/>}/> 
            <Route exact path='/admin/userlist' element={<UserListScreen/>}/>
          </Routes>
        </Container>
      </main>
      <Footer /> 
    </Router>
  );
}

export default App;
