import React, { Component } from 'react';

class PageHeader extends Component {
    render(){
        return(
            <div className="page-header">
                <div className="header-content">
                    <span>{this.props.title}</span>
                </div>
            </div>
        );
    }
}

export default PageHeader;