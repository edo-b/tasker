import EventEmitter from 'events';

import dispatcher from '../dispatcher';

class ProjectStore extends EventEmitter{
    constructor(){
        super();

        this.projects = [
            {id: 1, name:"Learn React", color:"red"},
            {id: 2, name:"Tasker project", color:"blue"},
            {id: 3, name:"School homework", color:"green"},
            {id: 4, name:"Write seminar", color:"yellow"},
            {id: 5, name:"Prepare for speach", color:"orange"},
            {id: 6, name:"Dummy project", color:"blue"},
        ];

        this.showDeleteModal = false;
        this.showEditModal = false;
    }

    getAllProjects(){
        return this.projects;
    }

    createProject(data){
        this.projects.push({id: Date.now(), name: data.name, color: data.color});
        this.emit('change');
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
            case 'DELETE_PROJECT':
                this.deleteProject(action.data.id);
                break;
            case 'SHOW_DELETE_MODAL':
                this.emit('toggleDeleteModal', {show: true, data: action.data});
                break;
            case 'CLOSE_DELETE_MODAL':
                this.emit('toggleDeleteModal', {show: false});
                break;
            default:
                break;
        }
    }
}

const projectStore = new ProjectStore();
dispatcher.register(projectStore.handleActions.bind(projectStore));
export default projectStore;