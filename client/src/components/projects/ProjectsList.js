import React, { Component } from 'react';

import ProjectsListRow from './ProjectsListRow';

class ProjectsList extends Component {


    renderProjectsList(){
        return this.props.projects.map(proj => {
            return (
                <ProjectsListRow key={proj.id} project={proj} />
            );
        });
    }
    
    render(){
        return (
            <table className="has-image">
                <thead>
                    <tr>
                        <th>Icon</th>
                        <th>Project name</th>
                        <th className="actions-th">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderProjectsList()}
                </tbody>
            </table>
        )
    }
}

export default ProjectsList;