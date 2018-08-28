import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import FloatingLogoutMenu from './FloatingLogoutMenu';
import { checkSession, getUserData } from '../../services/authService';

class SideMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogoutMenuOpen: false,
            isUserLoggedIn: false,
            firstName: '',
            lastName: ''
        };

        this.toggleLogoutMenu = this.toggleLogoutMenu.bind(this);
    }

    componentDidMount(){
        const isUserLoggedIn = checkSession();
        
        if(isUserLoggedIn){
            const userData = getUserData();
            const firstName = userData.firstName;
            const lastName = userData.lastName;
    
            this.setState({
                isUserLoggedIn: true,
                firstName: firstName,
                lastName: lastName
            });
        }
        else {
            this.setState({
                isUserLoggedIn: false,
                firstName: '',
                lastName: ''
            });
        }
    }

    toggleLogoutMenu(){
        if(this.state.isUserLoggedIn){
            this.setState({isLogoutMenuOpen: !this.state.isLogoutMenuOpen});
        }
    }

    render(){
        return (
            <div className="sidenav">
                <img src={this.state.isUserLoggedIn ? "img_avatar.png" : "pattern_grey.png"}
                alt="Profile" className={["profile-img", this.state.isUserLoggedIn ? '' : 'disabled'].join(' ')} onClick={this.toggleLogoutMenu} />

                <NavLink to="/projects" className={["sidenav-link", this.state.isUserLoggedIn ? '' : 'disabled'].join(' ')} activeClassName="selected" exact><i className="fa fa-home"></i></NavLink>

                <FloatingLogoutMenu isOpen={this.state.isLogoutMenuOpen} isUserLoggedIn={this.state.isUserLoggedIn} fullName={this.state.firstName + ' ' + this.state.lastName} />
            </div>
        );
    }
}

export default SideMenu;