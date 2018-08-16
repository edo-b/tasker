import React, { Component } from 'react';

import Register from '../components/account/Register';

class RegisterContainer extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="full-page-background">
                <div className="full-page-centered-text">
                    <Register />
                </div>
            </div>
        );
    }
}

export default RegisterContainer;