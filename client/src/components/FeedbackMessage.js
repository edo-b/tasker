import React, { Component } from 'react';

import uiStore from '../stores/UIStore';

class FeedbackMessage extends Component {
    constructor(){
        super();

        this.state = {
            show: false,
            color: "green",
            message: "Hello"
        }

        this.handleMessageChange = this.handleMessageChange.bind(this);
    }
    
    componentWillMount(){
        uiStore.on("changeFeedback", this.handleMessageChange);
    }

    componentWillUnmount(){
        uiStore.removeListener("changeFeedback", this.handleMessageChange);
    }

    handleMessageChange(actionData){
        if(actionData.data){
            this.setState({show: actionData.data.show, color: actionData.data.color, message: actionData.data.message});
            //setTimeout(() => this.setState({show: false}), 5000);
        }
    }

    render(){
        if(!this.state.show){
            return (null);
        }
        else{
            return(
                <div className={["warning-window", this.state.show ? '' : 'hidden'].join(' ')}>
                    <div className={["warning-header", this.state.color ? this.state.color : "green"].join(' ')}>
                        <i className="fa fa-times-circle"></i>
                    </div>
                    <div className="warning-text">
                        {this.state.message}
                    </div>
                </div>
            );
        }
    }
}

export default FeedbackMessage;