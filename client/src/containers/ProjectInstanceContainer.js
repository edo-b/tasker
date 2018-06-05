import React, { Component } from 'react';

import projectInstanceStore from '../stores/ProjectInstanceStore';
import PageHeader from '../components/PageHeader';
import TaskColumn from '../components/projectInstance/TaskColumn';
import EditFormModal from './../components/projectInstance/modals/EditFormModal';
import CreateFormModal from './../components/projectInstance/modals/CreateFormModal';

class ProjectInstanceContainer extends Component {
    constructor(params){
        super(params);
        this.state = { 
            project: projectInstanceStore.getProjectInstance(params.match.params.id),
            
            showEditModal: false,
            selectedTaskForModal: undefined,
            selectedTaskStatus: 'todo'
        };

        this.toggleEditFormModal = this.toggleEditFormModal.bind(this);
        this.toggleCreateFormModal = this.toggleCreateFormModal.bind(this);
    }

    componentWillMount(){
        //projectInstanceStore.on('toggleDeleteModal', this.toggleDeleteModal);
        projectInstanceStore.on('toggleEditModal', this.toggleEditFormModal);
        projectInstanceStore.on('toggleCreateModal', this.toggleCreateFormModal);
    }

    componentWillUnmount(){
        //projectInstanceStore.removeListener('toggleDeleteModal', this.toggleDeleteModal);
        projectInstanceStore.removeListener('toggleEditModal', this.toggleEditFormModal);
        projectInstanceStore.removeListener('toggleCreateModal', this.toggleCreateFormModal);
    }

    // toggleDeleteModal(actionData){
    //     this.setState({showDeleteModal: actionData.show, selectedProjectForModal: actionData.data});
    // }

    toggleEditFormModal(actionData){
        this.setState({showEditModal: actionData.show, selectedTaskForModal: actionData.data});
    }

    toggleCreateFormModal(actionData){
        console.log("Sgiw create modal");
        this.setState({showCreateModal: actionData.show, selectedTaskStatus: actionData.status});
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
                    <EditFormModal show={this.state.showEditModal} task={this.state.selectedTaskForModal} />
                    <CreateFormModal show={this.state.showCreateModal} status={this.state.selectedTaskStatus} />
                </div>
            );
        }
    }
}

export default ProjectInstanceContainer;