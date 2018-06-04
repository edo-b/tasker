import React, { Component } from 'react';

import { showEditModal } from '../../actions/TaskActions';

class Task extends Component {
    handleClick(){
        showEditModal(this.props.task);
    }
    
    render(){
        return(
            <div key={this.props.task.id} className={["task", this.props.task.color + '-border'].join(' ')} onClick={this.handleClick.bind(this)}>
                <span className="task-title">{this.props.task.title}</span>
                <br />
                <span className="task-description">{this.props.task.description}</span>
            </div>
        );
    }
}

export default Task;