import EventEmitter from 'events';
import axios from 'axios';

import dispatcher from '../dispatcher';
import { showSpinner, hideSpinner, showFeedbackMessage } from '../actions/UIActions';

class ProjectInstanceStore extends EventEmitter {
    initStore(id){
        if(id){
            showSpinner();
            axios.get(`project/${id}`)
            .then(response => {
                this.project = response.data;
                hideSpinner();
                this.emit("change");
            })
            .catch(err => {
                hideSpinner();
                if(err.response.status == 404)
                    showFeedbackMessage("orange", "Project instance not found!");
                else if(err.response.status === 403){
                    showFeedbackMessage('red', 'Not authorized');
                }
                else{
                    showFeedbackMessage('red', 'An error occured');
                }
            })
        }
    }

    getProjectInstance(){
        return this.project ? this.project : {};
    }

    editTask(task){
        if(this.project && this.project.tasks){
            let projectTask = this.project.tasks.find(el => el.id === task.id)
            if(projectTask){
                projectTask.title = task.title;
                projectTask.color = task.color;
                projectTask.description = task.description;
                projectTask.status = task.status;

                this.emit("change");                
            }
        }
    }

    createTask(task){
        if(this.project){
            let newTask = {
                id: task.id,
                title: task.title,
                color: task.color,
                description: task.description,
                status: task.status
            }
            if(!this.project.tasks) this.project.tasks = [];
            this.project.tasks.push(newTask);
            this.emit("change");
        }
    }

    deleteTask(id){
        this.project.tasks = this.project.tasks.filter(it => {return it.id !== id});
        this.emit("change");
    }
    
    handleActions(action){
        switch(action.type){
            case 'EDIT_TASK':
                this.editTask(action.data);
                break;
            case 'CREATE_TASK':
                this.createTask(action.data);
                break;
            case 'DELETE_TASK':
                this.deleteTask(action.data.id);
                break;
            case 'SHOW_DELETE_MODAL':
                this.emit('toggleDeleteModal', {show: true, data: action.data});
                break;
            case 'CLOSE_DELETE_MODAL':
                this.emit('toggleDeleteModal', {show: false});
                break;
            case 'SHOW_EDIT_MODAL':
                this.emit('toggleEditModal', {show: true, data: action.data});
                break;
            case 'CLOSE_EDIT_MODAL':
                this.emit('toggleEditModal', { show: false });
                break;
            case 'SHOW_CREATE_MODAL':
                this.emit('toggleCreateModal', {show: true, status: action.data});
                break;
            case 'CLOSE_CREATE_MODAL':
                this.emit('toggleCreateModal', { show: false });
                break;
        }
    }
}

let projectInstanceStore = new ProjectInstanceStore();
dispatcher.register(projectInstanceStore.handleActions.bind(projectInstanceStore));
export default projectInstanceStore;