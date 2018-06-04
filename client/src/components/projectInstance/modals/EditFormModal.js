import React, { Component } from 'react';

import { closeEditModal, editTask } from '../../../actions/TaskActions';

class EditFormModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            task: this.props.task,
            displayErrorMessage: false,
            errorMessage: 'Warning!'
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);        
    }

    componentWillReceiveProps(newProps){
        if(newProps.task){
            var newObj = JSON.parse(JSON.stringify(newProps.task)); // Making a clone object
            this.setState({task: newObj});
        }
        this.setState({
            displayErrorMessage: false,
            errorMessage: 'Warning'
        });
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.task && this.state.task.title !== ''){
            closeEditModal();
            editTask(this.state.task);
        }
        else{
            this.setState({displayErrorMessage: true, errorMessage: 'Name is required!'});
        }
    }

    handleTitleChange(e){
        let newObj = this.state.task;
        newObj.title = e.target.value;
        this.setState({task:newObj});
    }

    handleDescriptionChange(e){
        let newObj = this.state.task;
        newObj.description = e.target.value;
        this.setState({task:newObj});
    }

    handleColorChange(color){
        let newObj = this.state.task;
        newObj.color = color;
        this.setState({task: newObj});
    }
    
    render(){
        return (
            <div className={["modal", this.props.show ? '' : 'hidden'].join(' ')}>
                <div className={["confirm-modal-content", this.state.task ? this.state.task.color + "-modal-border" : ''].join(' ')}>
                    <span className="close" onClick={closeEditModal}>&times;</span>
                    <h2>{this.state.task ? 'Edit task ' + this.state.task.title : ''}</h2>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-row">
                            <label>Task title:</label>
                            <br />
                            <input type='text' className="input-round" value={this.state.task ? this.state.task.title : ''} onChange={this.handleTitleChange} />
                        </div>

                        <div className="form-row">
                            <label>Task description:</label>
                            <br />
                            <textarea rows="2" className="input-round" value={this.state.task ? this.state.task.description : ''} onChange={this.handleDescriptionChange} />
                        </div>

                        <div className="form-row">
                            Select color:
                            <br />
                            <div className={["color-option-outline pointer", this.state.task && this.state.task.color === 'red' ? 'selected-color' : ''].join(' ')} 
                            onClick={() => this.handleColorChange('red')}>
                                <div className="color-option red"></div>
                            </div>
                            <div className={["color-option-outline pointer", this.state.task && this.state.task.color === 'blue' ? 'selected-color' : ''].join(' ')}
                            onClick={() => this.handleColorChange('blue')}>
                                <div className="color-option blue"></div>
                            </div>
                            <div className={["color-option-outline pointer", this.state.task && this.state.task.color === 'green' ? 'selected-color' : ''].join(' ')}
                            onClick={() => this.handleColorChange('green')}>
                                <div className="color-option green"></div>
                            </div>
                            <div className={["color-option-outline pointer", this.state.task && this.state.task.color === 'yellow' ? 'selected-color' : ''].join(' ')}
                            onClick={() => this.handleColorChange('yellow')}>
                                <div className="color-option yellow"></div>
                            </div>
                            <div className={["color-option-outline pointer", this.state.task && this.state.task.color === 'orange' ? 'selected-color' : ''].join(' ')}
                            onClick={() => this.handleColorChange('orange')}>
                                <div className="color-option orange"></div>
                            </div>
                        </div>
                        
                        <div className="form-row">
                            <input type="submit" className="btn-round btn-blue" value="Submit" />&nbsp;
                            <a className="btn-round" onClick={closeEditModal} >Cancel</a>
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
        );
    }
}
export default EditFormModal;