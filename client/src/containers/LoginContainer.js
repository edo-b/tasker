import React, { Component } from 'react';

import Login from '../components/login/Login';

class LoginContainer extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="full-page-background">
                <div className="full-page-centered-text">
                    <Login />
                </div>
            </div>
        );
    }
}

export default LoginContainer;