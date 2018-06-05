import React, { Component } from 'react';

import { showEditModal, showDeleteModal } from '../../actions/TaskActions';

class Task extends Component {
    handleClick(){
        showEditModal(this.props.task);
    }

    handleDeleteClick(e){
        e.stopPropagation();
        showDeleteModal(this.props.task);
    }
    
    render(){
        return(
            <div key={this.props.task.id} className={["task", "pointer", this.props.task.color + '-border'].join(' ')} onClick={this.handleClick.bind(this)}>
                <span className="delete-task" onClick={this.handleDeleteClick.bind(this)}><i className="fa fa-times-circle"></i></span>
                <span className="task-title">{this.props.task.title}</span>
                <br />
                <span className="task-description">{this.props.task.description}</span>
            </div>
        );
    }
}

export default Task;