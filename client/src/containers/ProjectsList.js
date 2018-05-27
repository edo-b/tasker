import React, { Component } from 'react';

import PageHeader from '../components/PageHeader';
import projectStore from '../stores/ProjectStore';

class ProjectsList extends Component {
    constructor(){
        super();
        this.state = {
            projects: projectStore.getAllProjects()
        }

        this.getProjectsFromStore = this.getProjectsFromStore.bind(this);
    }

    componentWillMount(){
        projectStore.on('change', this.getProjectsFromStore);
    }

    componentWillUnmount(){
        projectStore.removeListener('change', this.getProjectsFromStore);
    }

    getProjectsFromStore(){
        this.setState({
            projects: projectStore.getAllProjects()
        });
    }

    renderProjectsList(){
        return this.state.projects.map(proj => {
            return <div key={proj.id}>{proj.name}</div>
        })
    }

    render(){
        return (
            <div>
                <PageHeader title="Projects list" />
                <div className="page-content">
                    {this.renderProjectsList()}
                </div>
            </div>
        );
    }
}

export default ProjectsList;