import EventEmitter from 'events';
import axios from 'axios';

import dispatcher from '../dispatcher';
import { showSpinner, hideSpinner, showFeedbackMessage } from '../actions/UIActions';

class ProjectListStore extends EventEmitter{
    constructor(){
        super();

        this.showDeleteModal = false;
        this.showEditModal = false;
        this.showCreateModal = false;
    }

    initStore(){
        showSpinner()
        axios.get('/project').then((response) => {
            this.projects = response.data;
            hideSpinner();
            this.emit("change");
        })
        .catch(err =>{
            if(err.response.status === 403){
                showFeedbackMessage('red', 'Not authorized');
            }
            else{
                showFeedbackMessage('red', 'An error occured');
            }
            hideSpinner();
        });
    }

    getAllProjects(){
        return this.projects ? this.projects : [];
    }

    createProject(data){
        this.projects.push({id: data.id, name: data.name, color: data.color});
        this.emit('change');
    }

    editProject(data){
        let project = this.projects.find((element) => element.id === data.id);
        if(project){
            project.name = data.name;
            project.color = data.color
            this.emit("change");
        }
    }

    deleteProject(id){
        this.projects = this.projects.filter(it => {return it.id !== id});
        this.emit("change");
    }

    handleActions(action){
        switch(action.type){
            case 'CREATE_PROJECT':
                this.createProject(action.data);
                break;
            case 'EDIT_PROJECT':
                this.editProject(action.data);
                break;
            case 'DELETE_PROJECT':
                this.deleteProject(action.data.id);
                break;
            case 'SHOW_DELETE_MODAL':
                this.emit('toggleDeleteModal', {show: true, data: action.data});
                break;
            case 'CLOSE_DELETE_MODAL':
                this.emit('toggleDeleteModal', {show: false});
                break;
            case 'SHOW_EDIT_FORM_MODAL':
                this.emit('toggleEditFormModal', {show: true, data: action.data});
                break;
            case 'CLOSE_EDIT_FORM_MODAL':
                this.emit('toggleEditFormModal', {show: false});
                break;
            case 'SHOW_CREATE_FORM_MODAL':
                this.emit('toggleCreateFormModal', {show: true});
                break;
            case 'CLOSE_CREATE_FORM_MODAL':
                this.emit('toggleCreateFormModal', {show: false});
                break;
            default:
                break;
        }
    }
}

const projectListStore = new ProjectListStore();
dispatcher.register(projectListStore.handleActions.bind(projectListStore));
export default projectListStore;