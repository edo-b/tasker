import React, { Component } from 'react';

class FloatingLogoutMenu extends Component {
    render(){
        return(
            <div className={["profile-actions", this.props.isOpen ? '' : 'hidden'].join(' ')} >
                <div className="profile-actions-content">
                    <a href="#home" className="profile-actions-link"><i className="fa fa-info-circle"></i> John Doe</a>
                    <a href="main.html" className="profile-actions-link logout-link">
                        <i className="fa fa-sign-out"></i> Logout
                    </a>
                </div>
            </div>
        )
    }
}

export default FloatingLogoutMenu;