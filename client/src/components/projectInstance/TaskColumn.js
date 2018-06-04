import React, { Component } from 'react';

import Task from './Task';

class TaskColumn extends Component {
    constructor(params){
        super(params);

        this.renderTasks = this.renderTasks.bind(this);
        this.getTitleIcon = this.getTitleIcon.bind(this);
    }

    getTitleIcon(){
        switch(this.props.status){
            case 'Todo':
                return "fa fa-list";
            case 'Doing':
                return "fa fa-spinner";
            case 'Done':
                return "fa fa-check";
            default:
                return '';
        }
    }

    renderTasks(){
        if(this.props.tasks){
            return this.props.tasks.map((task) => {
                return (
                    <Task key={task.id} task={task} />
                );
            });
        }
        else{
            return <div>No tasks!</div>
        }
    }

    render(){
        return(
            <div className="task-column">
                <h3>{this.props.status} <i className={this.getTitleIcon()}></i></h3>
                {this.renderTasks()}
            </div>
        );
    }
}

export default TaskColumn;