import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import UserRegistration from './pages/UserRegistration';
import UserLogin from './pages/UserLogin';
import CouponRegistration from './pages/CouponRegistration';
import BusinessRegistration from './pages/BusinessRegistration';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact/>
            <Route component={Dashboard} path="/dashboard"/>
            <Route component={UserRegistration} path="/register"/>
            <Route component={UserLogin} path="/login"/>
            <Route component={CouponRegistration} path="/new-coupon"/>
            <Route component={BusinessRegistration} path="/new-business"/>
            <Redirect to="/" />
        </BrowserRouter>
    )
}

export default Routes;