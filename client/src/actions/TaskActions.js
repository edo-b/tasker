import axios from 'axios';

import dispatcher from "../dispatcher";
import { showFeedbackMessage, showSpinner, hideSpinner } from './UIActions';
import { getToken, checkSession } from '../services/authService';

export function createTask(task, projectId){
    if(checkSession){
        showSpinner();
        const token = getToken();
        axios({
            method: 'POST',
            url: 'task',
            headers: { Authorization: "Bearer " + token },
            data: {
                title: task.title,
                description: task.description,
                color: task.color,
                status: task.status,
                projectId: projectId
            }})
            .then(response => {
                if(response.data.status === 0 && response.data.task){
                    dispatcher.dispatch({ type:"CREATE_TASK", data: response.data.task });
                    showFeedbackMessage(0, 'Task successfully saved');
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
                    showFeedbackMessage('red', 'Not authorized!');
                    hideSpinner();
                }
                else{
                    showFeedbackMessage('red', 'An error occured!');
                    hideSpinner();
                }
            });
    }
    else {
        showFeedbackMessage('red', 'Not authorized!');
        hideSpinner();
    }
}

export function editTask(task){
    if(checkSession()){
        showSpinner();
        const token = getToken();
        axios({
            method: 'PUT',
            url: `task/${task.id}`,
            headers: { Authorization: "Bearer " + token },
            data: {
                title: task.title,
                description: task.description,
                color: task.color,
                status: task.status
            }
        })
        .then(response => {
            if(response.data.status === 0 && response.data.task){
                dispatcher.dispatch({ type:"EDIT_TASK", data: response.data.task });
                
                showFeedbackMessage(0, 'Task successfully saved');
                hideSpinner();
            }
        })
        .catch(err => {
            if(err.response.status == 400){
                const errorMessage = err.response.data.errors.map(error => error.msg).join(' ');
                showFeedbackMessage('orange', errorMessage);
                hideSpinner();
            }
            else if(err.response.status == 404){
                showFeedbackMessage('orange', 'Task not found!');
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
    else {
        showFeedbackMessage('red', 'Not authorized');
        hideSpinner();
    }
}

export function deleteTask(id){
    if(checkSession()){
        showSpinner();
        
        const token = getToken();
        axios({
            method: 'DELETE',
            url: `task/${id}`,
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            if(response.data.status === 0){
                dispatcher.dispatch({ type:"DELETE_TASK", data: {id: id} });
                
                showFeedbackMessage(0, 'Task deleted successfully');
                hideSpinner();
            }
        })
        .catch(err => {
            if(err.response.status === 404){
                showFeedbackMessage('orange', 'Task not found');
                hideSpinner();
            }
            else if(err.response.status === 403){
                showFeedbackMessage('red', 'Not authorized!');
                hideSpinner();
            }
            else{
                showFeedbackMessage('red', 'An error occured!');
                hideSpinner();
            }
        });
    }
    else {
        showFeedbackMessage('red', 'An error occured!');
        hideSpinner();
    }
}

export function showCreateModal(status){
    dispatcher.dispatch({ type:"SHOW_CREATE_MODAL", data: status });
}

export function closeCreateModal(){
    dispatcher.dispatch({ type:"CLOSE_CREATE_MODAL" });
}

export function showEditModal(task){
    dispatcher.dispatch({ type:"SHOW_EDIT_MODAL", data: task });
}

export function closeEditModal(){
    dispatcher.dispatch({ type:"CLOSE_EDIT_MODAL" });
}

export function showDeleteModal(task){
    dispatcher.dispatch({ type:"SHOW_DELETE_MODAL", data: task });
}

export function closeDeleteModal(){
    dispatcher.dispatch({ type:"CLOSE_DELETE_MODAL" });
}