import React, { Component } from 'react';

import { closeDeleteModal } from '../../actions/ProjectActions';

class DeleteModal extends Component {
    render(){
        return (
            <div className={["modal", this.props.show ? '' : 'hidden'].join(' ')}>
                <div className="confirm-modal-content">
                    <span className="close" onClick={closeDeleteModal}>&times;</span>
                    <h3>Confirm</h3>
                    <p>Are you sure that you want to do something?</p>
                </div>
            </div>
        )
    }
}
export default DeleteModal;