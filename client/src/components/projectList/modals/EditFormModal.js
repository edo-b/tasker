import React, { Component } from 'react';

import { closeEditFormModal, editProject } from '../../../actions/ProjectActions';

class EditFormModal extends Component {
    constructor(props){
        super(props);
        this.state = {project: this.props.project};
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    componentWillReceiveProps(newProps){
        if(newProps.project){
            var newObj = JSON.parse(JSON.stringify(newProps.project)); // Making a clone object
            this.setState({project: newObj});
        }
    }

    handleSubmit(e){
        e.preventDefault();
        closeEditFormModal();
        editProject(this.state.project);
    }

    handleNameChange(e){
        let newObj = this.state.project;
        newObj.name = e.target.value;
        this.setState({project:newObj});
    }

    handleColorChange(color){
        let newProj = this.state.project;
        newProj.color = color;
        this.setState({project: newProj});
    }
    
    render(){
            return (
            <div className={["modal", this.props.show ? '' : 'hidden'].join(' ')}>
                <div className="confirm-modal-content">
                    <span className="close" onClick={closeEditFormModal}>&times;</span>
                    <h2>{this.state.project ? 'Edit project ' + this.state.project.name : 'Create new project'}</h2>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-row">
                            <label>Project name:</label>&nbsp;
                            <input type='text' className="input-round" value={this.state.project ? this.state.project.name : ''} onChange={this.handleNameChange} />
                        </div>
                        <div className="form-row">
                            Select color:
                            <br />
                            <div className={["color-option-outline pointer", this.state.project && this.state.project.color === 'red' ? 'selected-color' : ''].join(' ')} 
                            onClick={() => this.handleColorChange('red')}>
                                <div className="color-option red"></div>
                            </div>
                            <div className={["color-option-outline pointer", this.state.project && this.state.project.color === 'blue' ? 'selected-color' : ''].join(' ')}
                            onClick={() => this.handleColorChange('blue')}>
                                <div className="color-option blue"></div>
                            </div>
                            <div className={["color-option-outline pointer", this.state.project && this.state.project.color === 'green' ? 'selected-color' : ''].join(' ')}
                            onClick={() => this.handleColorChange('green')}>
                                <div className="color-option green"></div>
                            </div>
                            <div className={["color-option-outline pointer", this.state.project && this.state.project.color === 'yellow' ? 'selected-color' : ''].join(' ')}
                            onClick={() => this.handleColorChange('yellow')}>
                                <div className="color-option yellow"></div>
                            </div>
                            <div className={["color-option-outline pointer", this.state.project && this.state.project.color === 'orange' ? 'selected-color' : ''].join(' ')}
                            onClick={() => this.handleColorChange('orange')}>
                                <div className="color-option orange"></div>
                            </div>
                        </div>
                        <div className="form-row">
                            <input type="submit" className="btn-round btn-blue" value="Submit" />&nbsp;
                            <a className="btn-round" onClick={closeEditFormModal} >Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default EditFormModal;