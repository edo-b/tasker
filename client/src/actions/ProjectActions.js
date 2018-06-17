import axios from 'axios';

import dispatcher from '../dispatcher';
import { showSpinner, hideSpinner, showFeedbackMessage } from '../actions/UIActions';

// Later on handle api calls to server here

export function createProject (name, color) {
    showSpinner();
    axios.post('project', { name: name, color: color })
        .then(response => {
            if(response.data.status === 0 && response.data.project){
                dispatcher.dispatch({type: 'CREATE_PROJECT', data: response.data.project });
                showFeedbackMessage(0, 'Project successfully saved');
                hideSpinner();
            }
        })
        .catch(err => {
            if(err.response.status == 400){
                const errorMessage = err.response.data.errors.map(error => error.msg).join(' ');
                showFeedbackMessage('orange', errorMessage);
                hideSpinner();
            }
            else{
                showFeedbackMessage('red', 'An error occured!');
                hideSpinner();
            }
        });
}

export function editProject (project) {
    showSpinner();
    axios.put(`project/${project.id}`, { name: project.name, color: project.color })
        .then(response => {
            if(response.data.status === 0 && response.data.project){
                dispatcher.dispatch({type: 'EDIT_PROJECT', data: response.data.project });
                showFeedbackMessage(0, 'Project successfully saved');
                hideSpinner();
            }
        })
        .catch(err => {
            if(err.response.status === 400){
                const errorMessage = err.response.data.errors.map(error => error.msg).join(' ');
                showFeedbackMessage('orange', errorMessage);
                hideSpinner();
            }
            else if(err.response.status === 404){
                showFeedbackMessage('orange', 'Project not found');
                hideSpinner();
            }
            else{
                showFeedbackMessage('red', 'An error occured!');
                hideSpinner();
            }
        });
}

export function deleteProject(id){
    showSpinner();
    axios.delete(`project/${id}`)
        .then(response => {
            if(response.data.status === 0){
                dispatcher.dispatch({type: 'DELETE_PROJECT', data: {id: id}});
                
                showFeedbackMessage(0, 'Project deleted successfully');
                hideSpinner();
            }
        })
        .catch(err => {
            if(err.response.status === 404){
                showFeedbackMessage('orange', 'Project not found');
                hideSpinner();
            }
            else{
                showFeedbackMessage('red', 'An error occured!');
                hideSpinner();
            }
        });
}

export function showDeleteModal(project){
    dispatcher.dispatch({type: 'SHOW_DELETE_MODAL', data: project});
}

export function closeDeleteModal(){
    dispatcher.dispatch({type: 'CLOSE_DELETE_MODAL'});    
}

export function showEditFormModal(project){
    dispatcher.dispatch({type: 'SHOW_EDIT_FORM_MODAL', data: project});
}

export function closeEditFormModal(){
    dispatcher.dispatch({type: 'CLOSE_EDIT_FORM_MODAL'});
}

export function showCreateFormModal(){
    dispatcher.dispatch({type: 'SHOW_CREATE_FORM_MODAL'});
}

export function closeCreateFormModal(){
    dispatcher.dispatch({type: 'CLOSE_CREATE_FORM_MODAL'});
}

const testApi = () => {
    axios.post('project', { name:"Test", color:"orange" })
        .then(response => {
            if(response.data.status === 0 && response.data.project)
            console.log("Project created", response.data.project);
        })
        .catch(err => {
            if(err.response.status == 400){
                const errorMessage = err.response.data.errors.map(error => error.msg).join(' ');
                console.log("Bad request", errorMessage);
            }
            console.log("Error", err.response);
        });
}

window.testAPI = testApi;