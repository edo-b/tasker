import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { showFeedbackMessage } from '../../actions/UIActions';
import { submitRegisterData } from '../../actions/AuthActions';

class Register extends Component{
    constructor(){
        super();

        this.state = {userName: "", password: "", firstName: "", lastName: ""};

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFirstNameChange(e){
        e.preventDefault();
        this.setState({firstName: e.target.value});
    }

    handleLastNameChange(e){
        e.preventDefault();
        this.setState({lastName: e.target.value});
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

        if(!this.state.firstName || this.state.firstName.trim() === ''){
            showFeedbackMessage('orange', 'First name is required');
            return;
        }
        if(!this.state.lastName || this.state.lastName.trim() === ''){
            showFeedbackMessage('orange', 'Last name is required');
            return;
        }
        if(!this.state.userName || this.state.userName.trim() === ''){
            showFeedbackMessage('orange', 'Username is required');
            return;
        }
        if(!this.state.password || this.state.password.trim() === ''){
            showFeedbackMessage('orange', 'Password is required');
            return;
        }

        submitRegisterData(this.state.firstName, this.state.lastName, this.state.userName, this.state.password);
    }

    render(){
        return(
            <div className="login-card">
                <div className="login-card-header">
                    <div className="login-card-header-content">
                        <span>Register</span>
                    </div>
                </div>
                <div className="login-card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="login-form-row">
                            <input type="text" placeholder="First name" className="login-input" onChange={this.handleFirstNameChange} />
                        </div>
                        <div className="login-form-row">
                            <input type="text" placeholder="Last name" className="login-input" onChange={this.handleLastNameChange} />
                        </div>
                        <div className="login-form-row">
                            <input type="text" placeholder="Username" className="login-input" onChange={this.handleUserNameChange} />
                        </div>
                        <div className="login-form-row">
                            <input type="password" placeholder="Password" className="login-input" onChange={this.handlePasswordChange} />
                        </div>
                        <div className="login-form-row">
                            <button type="submit" className="btn-round login-button-visible">
                                Create account <i className="fa fa-user-plus"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;