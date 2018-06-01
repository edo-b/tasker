import React, { Component } from 'react';

class Input extends Component {
    handleChange(e){
        this.props.onChange(e.target.value);
    }
    
    render(){
        return(
            <input className="input-round" type={this.props.type ? this.props.type : 'text'} value={this.props.value ? this.props.value : ''} onChange={this.handleChange.bind(this)} />
        );
    }
}

export default Input;