import React, { Component } from 'react';

import projectStore from '../stores/ProjectStore';
import PageHeader from '../components/PageHeader';
import ProjectsList from '../components/projectList/ProjectsList';
import DeleteModal from '../components/projectList/modals/DeleteModal';
import EditFormModal from '../components/projectList/modals/EditFormModal';
import CreateFormModal from '../components/projectList/modals/CreateFormModal';

class ProjectListContainer extends Component {
    constructor(){
        super();
        this.state = {
            projects: projectStore.getAllProjects(),
            showDeleteModal: false,
            showEditFormModal: false,
            showCreateFormModal: false,
            selectedProjectForModal: undefined
        }

        this.getProjectsFromStore = this.getProjectsFromStore.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.toggleEditFormModal = this.toggleEditFormModal.bind(this);
        this.toggleCreateFormModal = this.toggleCreateFormModal.bind(this);
    }

    componentWillMount(){
        projectStore.on('change', this.getProjectsFromStore);
        projectStore.on('toggleDeleteModal', this.toggleDeleteModal);
        projectStore.on('toggleEditFormModal', this.toggleEditFormModal);
        projectStore.on('toggleCreateFormModal', this.toggleCreateFormModal);
    }

    componentWillUnmount(){
        projectStore.removeListener('change', this.getProjectsFromStore);
        projectStore.removeListener('toggleDeleteModal', this.toggleDeleteModal);
        projectStore.removeListener('toggleEditFormModal', this.toggleEditFormModal);
        projectStore.removeListener('toggleCreateFormModal', this.toggleCreateFormModal);
    }

    getProjectsFromStore(){
        this.setState({
            projects: projectStore.getAllProjects()
        });
    }

    toggleDeleteModal(actionData){
        this.setState({showDeleteModal: actionData.show, selectedProjectForModal: actionData.data});
    }

    toggleEditFormModal(actionData){
        this.setState({showEditFormModal: actionData.show, selectedProjectForModal: actionData.data});
    }

    toggleCreateFormModal(actionData){
        this.setState({showCreateFormModal: actionData.show});
    }

    handleAddProjectClick(){
        
    }

    render(){
        return (
            <div>
                <PageHeader title="Projects list" />
                <div className="page-content">
                    <h2>Projects</h2>
                    <ProjectsList projects={this.state.projects} />
                </div>
                <DeleteModal show={this.state.showDeleteModal} project={this.state.selectedProjectForModal} />
                <EditFormModal show={this.state.showEditFormModal} project={this.state.selectedProjectForModal} />
                <CreateFormModal show={this.state.showCreateFormModal} />
            </div>
        );
    }
}

export default ProjectListContainer;