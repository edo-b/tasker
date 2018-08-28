import React, { Component } from 'react';

import { terminateSession } from '../../services/authService';

class FloatingLogoutMenu extends Component {
    render(){
        return(
            <div className={["profile-actions", this.props.isOpen && this.props.isUserLoggedIn ? '' : 'hidden'].join(' ')} >
                <div className="profile-actions-content">
                    <a className="profile-actions-link"><i className="fa fa-info-circle"></i> {this.props.fullName}</a>
                    <a className="profile-actions-link logout-link pointer" onClick={terminateSession}>
                        <i className="fa fa-sign-out"></i> Logout
                    </a>
                </div>
            </div>
        )
    }
}

export default FloatingLogoutMenu;