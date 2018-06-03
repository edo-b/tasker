import React, { Component } from 'react';

import projectInstanceStore from '../stores/ProjectInstanceStore';
import PageHeader from '../components/PageHeader';
import TaskColumn from '../components/projectInstance/TaskColumn';

class ProjectInstanceContainer extends Component {
    constructor(params){
        super(params);
        this.state = { project: projectInstanceStore.getProjectInstance(params.match.params.id) };
    }

    getTasksByStatus(status){
        if(this.state.project && this.state.project.tasks){
            return this.state.project.tasks.filter(task => task.status === status);
        }
    }

    render(){
        if(!this.state.project){
            return(
                <div>
                    <PageHeader title={'Project not found'} />
                </div>
            );
        }
        else{
            return(
                <div>
                    <PageHeader title={this.state.project ? this.state.project.name : 'Project not found'} />
                    <div className="page-content-lg">
                        <TaskColumn status="Todo" tasks={this.getTasksByStatus('todo')} />
                        <TaskColumn status="Doing" tasks={this.getTasksByStatus('doing')} />
                        <TaskColumn status="Done" tasks={this.getTasksByStatus('done')} />
                    </div>
                </div>
            );
        }
    }
}

export default ProjectInstanceContainer;