import React, { Component } from 'react';

import { closeDeleteModal, deleteProject } from '../../actions/ProjectActions';

class DeleteModal extends Component {
    handleDelete(){
        closeDeleteModal();
        deleteProject(this.props.project.id);
    }
    
    render(){
        return (
            <div className={["modal", this.props.show ? '' : 'hidden'].join(' ')}>
                <div className="confirm-modal-content">
                    <span className="close" onClick={closeDeleteModal}>&times;</span>
                    <h3>You are trying to delete project <span className="delete-project-name">{this.props.project ? this.props.project.name : ''}</span></h3>
                    <p>This action is permanent! Are you sure that you want to proceed?</p>
                    <div>
                        <button className="btn-round btn-red" onClick={this.handleDelete.bind(this)} >Confirm</button>&nbsp;
                        <button className="btn-round" onClick={closeDeleteModal} >Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default DeleteModal;