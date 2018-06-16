import React, { Component } from 'react';

import { closeCreateFormModal, createProject } from '../../../actions/ProjectActions';

class CreateFormModal extends Component {
    constructor(){
        super();
        this.state = {
                name: '', 
                color:'red',
                displayErrorMessage: false,
                errorMessage: 'Warning!'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    componentWillReceiveProps(){
        this.setState({
            name:'',
            color:'red',
            displayErrorMessage: false,
            errorMessage: 'Warning'
        }); // To remove previous input values
    }

    handleSubmit(e){
        e.preventDefault();
        if(!this.state.name || this.state.name.trim() === ''){
            this.setState({displayErrorMessage: true, errorMessage: 'Name is required!'});
        }
        else{
            closeCreateFormModal();
            createProject(this.state.name, this.state.color);
        }
    }

    handleNameChange(e){
        this.setState({ name: e.target.value });
    }

    handleColorChange(color){
        this.setState({ color: color });
    }
    
    render(){
            return (
            <div className={["modal", this.props.show ? '' : 'hidden'].join(' ')}>
                <div className="confirm-modal-content">
                    <span className="close" onClick={closeCreateFormModal}>&times;</span>
                    <h2>Create new project</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <label>Project name:</label>
                            <br />
                            <input type='text' className="input-round" value={this.state.name} onChange={this.handleNameChange} />
                        </div>
                        <div className="form-row">
                            Select color:
                            <br />
                            <div className={["color-option-outline pointer", this.state.color === 'red' ? 'selected-color' : ''].join(' ')} 
                            onClick={() => this.handleColorChange('red')}>
                                <div className="color-option red"></div>
                            </div>
                            <div className={["color-option-outline pointer", this.state.color === 'blue' ? 'selected-color' : ''].join(' ')}
                            onClick={() => this.handleColorChange('blue')}>
                                <div className="color-option blue"></div>
                            </div>
                            <div className={["color-option-outline pointer", this.state.color === 'green' ? 'selected-color' : ''].join(' ')}
                            onClick={() => this.handleColorChange('green')}>
                                <div className="color-option green"></div>
                            </div>
                            <div className={["color-option-outline pointer", this.state.color === 'yellow' ? 'selected-color' : ''].join(' ')}
                            onClick={() => this.handleColorChange('yellow')}>
                                <div className="color-option yellow"></div>
                            </div>
                            <div className={["color-option-outline pointer", this.state.color === 'orange' ? 'selected-color' : ''].join(' ')}
                            onClick={() => this.handleColorChange('orange')}>
                                <div className="color-option orange"></div>
                            </div>
                        </div>
                        <div className="form-row">
                            <input type="submit" className="btn-round btn-blue" value="Submit" />&nbsp;
                            <a className="btn-round" onClick={closeCreateFormModal} >Cancel</a>
                        </div>
                    </form>
                </div>
                <div className={["warning-window", this.state.displayErrorMessage ? '' : 'hidden'].join(' ')}>
                    <div className="warning-header">
                        <i className="fa fa-times-circle"></i>
                    </div>
                    <div className="warning-text">
                        {this.state.errorMessage}
                    </div>
                </div>
            </div>
        )
    }
}
export default CreateFormModal;