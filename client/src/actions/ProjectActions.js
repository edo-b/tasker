import axios from 'axios';

import dispatcher from '../dispatcher';
import { showSpinner, hideSpinner, showFeedbackMessage } from '../actions/UIActions';
import { getToken, checkSession } from '../services/authService';

export function createProject (name, color) {
    if(checkSession){
        showSpinner();
        const token = getToken();
        axios({
            method: 'POST',
            url: 'project',
            data: { name: name, color: color },
            headers: { Authorization: "Bearer " + token }
        })
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
            else if(err.response.status == 403){
                showFeedbackMessage('red', 'Not authorized');
                hideSpinner();
            }
            else{
                showFeedbackMessage('red', 'An error occured!');
                hideSpinner();
            }
        });
    }
    else{
        showFeedbackMessage('red', 'Not authorized');
    }
}

export function editProject (project) {
    if(checkSession()) {
        showSpinner();
        const token = getToken();
        axios({
            method: 'PUT',
            url: `project/${project.id}`,
            headers: { Authorization: "Bearer " + token },
            data: { name: project.name, color: project.color }
        })
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
            else if(err.response.status === 403){
                showFeedbackMessage('red', 'Not authorized');
                hideSpinner();
            }
            else{
                showFeedbackMessage('red', 'An error occured!');
                hideSpinner();
            }
        });
    }
    else {
        showFeedbackMessage('red', 'Not authorized');
    }
    
}

export function deleteProject(id){
    if(checkSession()){
        showSpinner();
        const token = getToken();
        axios({
            method: 'DELETE',
            url: `project/${id}`,
            headers: { Authorization: "Bearer " + token }
        })
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
            else if(err.response.status == 403){
                showFeedbackMessage('red', 'Not authorized');
                hideSpinner();
            }
            else{
                showFeedbackMessage('red', 'An error occured!');
                hideSpinner();
            }
        });
    }
    else{
        showFeedbackMessage('red', 'Not authorized');
    }
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