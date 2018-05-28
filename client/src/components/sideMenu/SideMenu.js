import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import FloatingLogoutMenu from './FloatingLogoutMenu';

class SideMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            profileImageUrl: "https://www.w3schools.com/howto/img_avatar.png",
            isLogoutMenuOpen: false
        };

        this.toggleLogoutMenu = this.toggleLogoutMenu.bind(this);
    }

    toggleLogoutMenu(){
        this.setState({isLogoutMenuOpen: !this.state.isLogoutMenuOpen});
        console.log(this.state.isLogoutMenuOpen);
    }

    render(){
        return (
            <div className="sidenav">
                <img src={this.state.profileImageUrl} alt="Profile" className="profile-img" onClick={this.toggleLogoutMenu} />
                <NavLink to="/projects" className="sidenav-link" activeClassName="selected" exact><i className="fa fa-home"></i></NavLink>
                <NavLink to="/test" className="sidenav-link" activeClassName="selected" exact><i className="fa fa-map-marker"></i></NavLink>
                <NavLink to="/dummy" className="sidenav-link" activeClassName="selected" exact><i className="fa fa-calendar"></i></NavLink>

                <FloatingLogoutMenu isOpen={this.state.isLogoutMenuOpen} />
            </div>
        );
    }
}

export default SideMenu;