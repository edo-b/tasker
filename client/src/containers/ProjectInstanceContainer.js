import React, { Component } from 'react';

import projectInstanceStore from '../stores/ProjectInstanceStore';
import PageHeader from '../components/PageHeader';
import TaskColumn from '../components/projectInstance/TaskColumn';
import EditFormModal from './../components/projectInstance/modals/EditFormModal';

class ProjectInstanceContainer extends Component {
    constructor(params){
        super(params);
        this.state = { 
            project: projectInstanceStore.getProjectInstance(params.match.params.id),
            
            showEditModal: false,
            selectedTaskForModal: undefined
        };

        this.toggleEditFormModal = this.toggleEditFormModal.bind(this);
    }

    componentWillMount(){
        //projectListStore.on('toggleDeleteModal', this.toggleDeleteModal);
        projectInstanceStore.on('toggleEditModal', this.toggleEditFormModal);
        //projectListStore.on('toggleCreateModal', this.toggleCreateFormModal);
    }

    componentWillUnmount(){
        //projectListStore.removeListener('toggleDeleteModal', this.toggleDeleteModal);
        projectInstanceStore.removeListener('toggleEditModal', this.toggleEditFormModal);
        //projectListStore.removeListener('toggleCreateModal', this.toggleCreateFormModal);
    }

    // toggleDeleteModal(actionData){
    //     this.setState({showDeleteModal: actionData.show, selectedProjectForModal: actionData.data});
    // }

    toggleEditFormModal(actionData){
        this.setState({showEditModal: actionData.show, selectedTaskForModal: actionData.data});
    }

    // toggleCreateFormModal(actionData){
    //     this.setState({showCreateModal: actionData.show});
    // }

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
                </div>
            );
        }
    }
}

export default ProjectInstanceContainer;