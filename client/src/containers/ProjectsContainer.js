import React, { Component } from 'react';

import projectStore from '../stores/ProjectStore';
import PageHeader from '../components/PageHeader';
import ProjectsList from '../components/projects/ProjectsList';
import DeleteModal from '../components/projects/DeleteModal';

import * as ProjectActions from '../actions/ProjectActions';

class ProjectsContainer extends Component {
    constructor(){
        super();
        this.state = {
            projects: projectStore.getAllProjects(),
            showDeleteModal: false,
            selectedProjectForModal: undefined
        }

        this.getProjectsFromStore = this.getProjectsFromStore.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    }

    componentWillMount(){
        projectStore.on('change', this.getProjectsFromStore);
        projectStore.on('toggleDeleteModal', this.toggleDeleteModal);
    }

    componentWillUnmount(){
        projectStore.removeListener('change', this.getProjectsFromStore);
        projectStore.removeListener('toggleDeleteModal', this.toggleDeleteModal);
    }

    getProjectsFromStore(){
        this.setState({
            projects: projectStore.getAllProjects()
        });
    }

    toggleDeleteModal(actionData){
        this.setState({showDeleteModal: actionData.show, selectedProjectForModal: actionData.data});
    }

    handleClick(){
        
    }

    render(){
        return (
            <div>
                <PageHeader title="Projects list" />
                <div className="page-content">
                    <h2>Projects</h2>
                    <ProjectsList projects={this.state.projects} />
                </div>
                <button onClick={this.handleClick}>Simulate action</button>
                <DeleteModal show={this.state.showDeleteModal} project={this.state.selectedProjectForModal} />
            </div>
        );
    }
}

export default ProjectsContainer;