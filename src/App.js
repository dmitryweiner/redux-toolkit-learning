import React from 'react';
import './App.css';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import AuthView from './features/auth/AuthView';
import RegistrationView from './features/registration/RegistrationView';
import UserView from './features/user/UserView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Link to="/auth">Логин</Link>&nbsp;
          <Link to="/registration">Регистрация</Link>&nbsp;
          <Switch>
              <Route path="/auth" component={AuthView} />
              <Route path="/registration" component={RegistrationView} />
              <Route path="/user" component={UserView} />
              <Redirect from="/" to="/auth" />
          </Switch>
      </header>
    </div>
  );
}

export default App;
