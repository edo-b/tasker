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
                        <th className="empty-header-column"></th>
                        <th>Project name</th>
                        <th className="actions-th">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderProjectsList()}
                    <tr>
                        <td colSpan="3" style={{textAlign:'center', height:'30px'}}>
                            <button className="btn-add-circle" title='Create new project'><i className="fa fa-plus"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default ProjectsList;