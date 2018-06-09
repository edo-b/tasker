import React, { Component } from 'react';
import uiStore from '../stores/UIStore';

class Spinner extends Component {

    constructor(){
        super();
        this.state = { showSpinner: uiStore.showSpinner };

        this.toggleSpinner = this.toggleSpinner.bind(this);
    }

    componentWillMount(){
        uiStore.on("changeSpinner", this.toggleSpinner);
    }
    componentWillUnmount(){
        uiStore.removeListener("changeSpinner", this.toggleSpinner);
    }

    toggleSpinner(show){
        this.setState({showSpinner: show});
    }
    
    render(){
        if(this.state.showSpinner){
            return(
                <div className="spinner"></div>
            )
        }
        else {
            return null;
        }
    }
}

export default Spinner;