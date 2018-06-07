import React, { Component } from 'react';

import projectListStore from '../stores/ProjectListStore';
import PageHeader from '../components/PageHeader';
import ProjectsList from '../components/projectList/ProjectsList';
import DeleteModal from '../components/projectList/modals/DeleteModal';
import EditFormModal from '../components/projectList/modals/EditFormModal';
import CreateFormModal from '../components/projectList/modals/CreateFormModal';

class ProjectListContainer extends Component {
    constructor(){
        super();
        this.state = {
            projects: [],
            showDeleteModal: false,
            showEditFormModal: false,
            showCreateFormModal: false,
            selectedProjectForModal: undefined
        }

        projectListStore.initStore();

        this.getProjectsFromStore = this.getProjectsFromStore.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.toggleEditFormModal = this.toggleEditFormModal.bind(this);
        this.toggleCreateFormModal = this.toggleCreateFormModal.bind(this);
    }

    componentWillMount(){
        projectListStore.on('change', this.getProjectsFromStore);
        projectListStore.on('toggleDeleteModal', this.toggleDeleteModal);
        projectListStore.on('toggleEditFormModal', this.toggleEditFormModal);
        projectListStore.on('toggleCreateFormModal', this.toggleCreateFormModal);
    }

    componentWillUnmount(){
        projectListStore.removeListener('change', this.getProjectsFromStore);
        projectListStore.removeListener('toggleDeleteModal', this.toggleDeleteModal);
        projectListStore.removeListener('toggleEditFormModal', this.toggleEditFormModal);
        projectListStore.removeListener('toggleCreateFormModal', this.toggleCreateFormModal);
    }

    getProjectsFromStore(){
        this.setState({
            projects: projectListStore.getAllProjects()
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