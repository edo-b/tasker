import EventEmitter from 'events';

import dispatcher from '../dispatcher';
import serverMockup from '../ServerMockup';

class ProjectListStore extends EventEmitter{
    constructor(){
        super();

        this.showDeleteModal = false;
        this.showEditModal = false;
        this.showCreateModal = false;
    }

    initStore(){
        this.projects = serverMockup.getProjectList();
        return this.projects;
    }

    getAllProjects(){
        return this.projects ? this.projects : [];
    }

    createProject(data){
        this.projects.push({id: Date.now(), name: data.name, color: data.color});
        this.emit('change');
    }

    editProject(data){
        let project = this.projects.find((element) => element.id === data.id);
        if(project){
            project.name = data.name;
            project.color = data.color
        }
    }

    deleteProject(id){
        console.log("Delete project", id);
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