import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { showFeedbackMessage } from '../../actions/UIActions';
import { submitLoginData } from '../../actions/AuthActions';

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

        if(!this.state.userName || this.state.userName.trim() === ''){
            showFeedbackMessage('orange', 'Username is required');
            return;
        }
        if(!this.state.password || this.state.password.trim() === ''){
            showFeedbackMessage('orange', 'Password is required');
            return;
        }

        submitLoginData(this.state.userName, this.state.password);
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
                            <input type="text" placeholder="Username" className="login-input" onChange={this.handleUserNameChange} />
                        </div>
                        <div className="login-form-row">
                            <input type="password" placeholder="Password" className="login-input" onChange={this.handlePasswordChange} />
                        </div>
                        <div className="login-form-row">
                            <button type="submit" className="btn-round login-button-visible">
                                Login <i className="fa fa-rocket"></i>
                            </button>
                        </div>
                        <div className="login-form-row">
                            <NavLink className="purple-link" to="/register">
                                Create account <i className="fa fa-user-plus"></i>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;