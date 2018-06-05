import React, { Component } from 'react';

import { closeDeleteModal, deleteTask } from '../../../actions/TaskActions';

class DeleteModal extends Component {
    handleDelete(){
        closeDeleteModal();
        deleteTask(this.props.task.id);
    }
    
    render(){
        return (
            <div className={["modal", this.props.show ? '' : 'hidden'].join(' ')}>
                <div className="confirm-modal-content">
                    <span className="close" onClick={closeDeleteModal}>&times;</span>
                    <h3>You are trying to delete task <span className="delete-project-name">{this.props.task ? this.props.task.title : ''}</span></h3>
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