import React, { Component } from 'react';

class ProjectsList extends Component {
    renderProjectsList(){
        return this.props.projects.map(proj => {
            return (
                <tr key={proj.id}>
                    <td>
                        <div className={["project-color", proj.color].join(' ')}></div>
                    </td>
                    <td>{proj.name}</td>
                    <td className="actions-td">
                        <i className="fa fa-edit edit-color pointer"></i>
                        &nbsp;&nbsp;
                        <i className="fa fa-times-circle delete-color pointer"></i> 
                    </td>
                </tr>
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