import React, {useEffect, useState} from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import AuthRouter from './router/authRouter';
import Router from './router/router';
import { isLogged } from './services/auth.service';
import loginStore from './store/loginStore';
import routeStore from './store/routeStore';

import NavBar from './components/navBar/navBar.component';

function App() {

  const [checkingLogin, setCheckingLogin] = useState(true);
  const [socketRef, setSocketRef] = useState(true);
  const login = loginStore(state => state.login);
  const setLogin = loginStore(state => state.setLogin);
  const route = routeStore(state => state.route);

  useEffect(() => {
    console.log('ROUTE APPP', route);
  }, [route])

  useEffect(() => {
    isLogged().then(res => {
      console.log('res', res);
      setLogin(true);
    }).catch(err => {
      setLogin(false);
    }).finally(() => setCheckingLogin(false));
  }, [])

  return (
        <div className="App">
          <BrowserRouter>
            {(login && route !== '/rating') &&
            <div className={'containerNav'}>
              <NavBar/>
            </div>
            }

            <div className={(login && route !== '/rating') ? 'containerRouter' : 'containerRouterNoNav'}>
              {login ?
                  <Router socket={value => setSocketRef(value)}/>
                  :
                  <AuthRouter/>
              }
            </div>
          </BrowserRouter>
        </div>
  );
}

export default App;
