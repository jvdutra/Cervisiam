import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './App.css';

import AuthApi from './services/auth';

import Routes from './routes';

function App() {
  const [auth, setAuth] = useState({
    logged: false,
    user: {
      id: 0
    }
  });

  function readCookie() {
    const cookie = Cookies.get('SESSION');
    const userId = Number(Cookies.get('USER_ID'));

    if(cookie)
      return setAuth({
        logged: true,
        user: {
          id: userId
        }
      });
  }

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div id="app">
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Routes/>
      </AuthApi.Provider>
    </div>
  );
}

export default App;
