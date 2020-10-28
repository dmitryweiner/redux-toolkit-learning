import React from 'react';
import './App.css';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import AuthView from './features/auth/AuthView';
import RegistrationView from './features/registration/RegistrationView';
import UserView from './features/user/UserView';
import { useSelector } from 'react-redux';
import { selectIsLogged } from './features/auth/authSlice';

function PrivateRoute({ children, ...rest }) {
    const isLogged = useSelector(selectIsLogged);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLogged ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/auth",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Link to="/auth">Логин</Link>
          <Link to="/registration">Регистрация</Link>
          <Link to="/user">Профиль</Link>
          <Switch>
              <Route path="/auth" component={AuthView} />
              <Route path="/registration" component={RegistrationView} />
              <PrivateRoute path="/user"><UserView/></PrivateRoute>
              <Redirect from="/" to="/auth" />
          </Switch>
      </header>
    </div>
  );
}

export default App;
