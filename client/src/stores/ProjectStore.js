import EventEmitter from 'events';

class ProjectStore extends EventEmitter{
    constructor(){
        super();

        this.projects = [
            {id: 1, name:"Learn React"},
            {id: 2, name:"Tasker project"},
            {id: 3, name:"School homework"},
            {id: 4, name:"Write seminar"},
            {id: 5, name:"Prepare for speach"},
            {id: 6, name:"Dummy project"},
        ]
    }

    getAllProjects(){
        return this.projects;
    }

    handleActions(action){
        switch(action.type){
            default:
                break;
        }
    }
}

const projectStore = new ProjectStore();

export default projectStore;