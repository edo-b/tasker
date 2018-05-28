import React, { Component } from 'react';

import * as ProjectActions from '../../actions/ProjectActions';

class ProjectsListRow extends Component {
    handleDeleteClick(){
        ProjectActions.showDeleteModal({id: this.props.project.id, name: this.props.project.name});
    }
    
    render(){
        return (
            <tr>
                    <td>
                        <div className={["project-color", this.props.project.color].join(' ')}></div>
                    </td>
                    <td>{this.props.project.name}</td>
                    <td className="actions-td">
                        <i className="fa fa-edit edit-color pointer" title='Edit'></i>
                        &nbsp;&nbsp;
                        <i className="fa fa-times-circle delete-color pointer" title='Delete' onClick={this.handleDeleteClick.bind(this)}></i> 
                    </td>
                </tr>
        );
    }
}

export default ProjectsListRow;