import React, { Component } from 'react';

class Login extends Component{
    constructor(){
        super();

        this.state = {userName: "", password: ""};

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserNameChange(e){
        e.preventDefault();
        this.setState({userName: e.target.value});
    }

    handlePasswordChange(e){
        e.preventDefault();
        this.setState({password: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
    }

    render(){
        return(
            <div className="login-card">
                <div className="login-card-header">
                    <div className="login-card-header-content">
                        <span>Login</span>
                    </div>
                </div>
                <div className="login-card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="login-form-row">
                            <input type="email" placeholder="Username" className="login-input"/>
                        </div>
                        <div className="login-form-row">
                            <input type="password" placeholder="Password" className="login-input"/>
                        </div>
                        <div className="login-form-row">
                            <input type="submit" className="btn-round login-button-visible" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;