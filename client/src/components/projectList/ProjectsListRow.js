import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ProjectActions from '../../actions/ProjectActions';

class ProjectsListRow extends Component {
    handleDeleteClick(){
        ProjectActions.showDeleteModal({id: this.props.project.id, name: this.props.project.name});
    }
    handleAddProjectClick(){
        ProjectActions.showEditFormModal(this.props.project);
    }
    
    render(){
        return (
            <tr>
                <td>
                    <div className={["project-color", this.props.project.color].join(' ')}></div>
                </td>
                <td>
                    <Link to={`/project/${this.props.project.id}`} className="blue-link">{this.props.project.name}</Link>
                </td>
                <td className="actions-td">
                    <i className="fa fa-edit edit-color pointer" title='Edit' onClick={this.handleAddProjectClick.bind(this)}></i>
                    &nbsp;&nbsp;
                    <i className="fa fa-times-circle delete-color pointer" title='Delete' onClick={this.handleDeleteClick.bind(this)}></i> 
                </td>
            </tr>
        );
    }
}

export default ProjectsListRow;