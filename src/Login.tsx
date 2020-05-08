import React, { Component } from 'react';
import { proxy } from './proxy';
import { TextInput } from './TextInput';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import App from './App';
import { findDOMNode } from 'react-dom';

export interface LoginOptions 
{
    onLogin: () => void;
}

export class Login extends Component<LoginOptions>
{
    state = { email: "", password: "", displayName: "", register: false };

    render()
    {
        return (
        <div className="login">
            <img src="logo512.png" width="256" />
            { this.state.register &&
                <TextInput type="text" placeholder="Display Name (Agent Smith)" 
                    value={ this.state.displayName }
                    onChange={ e => this.setState( { displayName: e } ) } 
                    autofocus={ true } 
                    onEnter={ () => this.onClick() } 
                    key={ this.state.displayName } /> 
            }
            <TextInput type="email" placeholder="Email (someone@example.com)" 
                value={ this.state.email }
                onChange={ e => 
                { 
                    if (e == "H4O0I6") { this.setState( { displayName: "Botond" } ); } 
                    this.setState( { email: e } ) 
                }}
                autofocus={ !this.state.register } 
                onEnter={ () => this.onClick() } />
            <TextInput type="password" placeholder="Password" 
                value={ this.state.password }
                onChange={ e => this.setState( { password: e } ) } 
                onEnter={ () => this.onClick() } />
            <button type="button" onClick={ () => this.onClick() }>
                { this.state.register ? "Register" : "Login" }
            </button>
            <p>{ this.state.register ? "Switch back to " : "Have no account yet? Go and " }
                <a href="" onClick={ e => { e.preventDefault(); this.setState( { register: !this.state.register } ); } }>
                    { this.state.register ? "Login" : "Register" }
                </a>
            </p>
            <a href="https://www.google.hu/search?q=privacy">Privacy Policy</a>
        </div> 
        );
    }

    private onClick()
    {
        if ( this.state.register )
            proxy.sendPacket( { 
                type: "register", 
                email: this.state.email, 
                password: this.state.password,
                displayName: this.state.displayName, 
                staySignedIn: false 
            } );
        else
            proxy.sendPacket( { 
                type: "login", 
                email: this.state.email, 
                password: this.state.password,
                staySignedIn: false 
            } );
    }    

    componentDidMount()
    {
        proxy.addEventListener( "login", this.props.onLogin, this );
    }

    componentWillUnmount()
    {
        proxy.removeAllEventListener( this );
    }
}