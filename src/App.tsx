import React, { Component } from 'react';
import { Login } from './Login';
import { Main } from './Main';
export default class App extends Component
{
  state = { login: true }

  render()
  {
    return (
      <div className="app" id="app">
        {
          this.state.login ?
          <Login onLogin={() => this.setState( { login: false } )} /> :
          <Main />
        }
      </div>
    );
  }
}
