import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import UserRegistration from './pages/UserRegistration';
import UserLogin from './pages/UserLogin';
import Businesses from './pages/Businesses';

import AuthApi from './services/auth';

const Routes = () => {
    const Auth = React.useContext(AuthApi);

    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact/>
            <ProtectedAuthentication component={UserRegistration} path="/register"/>
            <ProtectedAuthentication component={UserLogin} path="/login"/>

            <ProtectedRoute isAuthenticated={Auth.auth} component={Dashboard} path="/dashboard"/>
            <ProtectedRoute isAuthenticated={Auth.auth} component={Businesses} path="/businesses"/>
            <Redirect to="/" />
        </BrowserRouter>
    )
}

const ProtectedRoute = ({component, isAuthenticated, ...rest}: any) => {
    const routeComponent = (props: any) => (
        isAuthenticated
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/login'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};


const ProtectedAuthentication = ({component, isAuthenticated, ...rest}: any) => {
    const routeComponent = (props: any) => (
        !isAuthenticated
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/dashboard'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};

export default Routes;