import EventEmitter from 'events';

import dispatcher from '../dispatcher';

class ProjectInstanceStore extends EventEmitter {
    constructor(){
        super();
        this.mockDbProjectList = [
            {
                id: 1, name:"Learn React", color:"red",
                tasks: [
                    {id:1, title:'Project activity bla', description:'In this task we need to do something', color:'red', status:'todo'},
                    {id:2, title:'Some task to do', description:'This is another task of this project', color:'blue', status:'todo'},
                    {id:3, title:'Test', description:'', color:'blue', status:'doing'},
                    {id:4, title:'This task is done', description:'Sample description', color:'green', status:'done'},
                    {id:5, title:'Another done task', description:'', color:'yellow', status:'done'},
                    {id:6, title:'Done tasksks test', description:'', color:'orange', status:'done'},
                    {id:7, title:'Task title 12', description:'', color:'blue', status:'done'},
                    {id:8, title:'1458 things to do', description:'', color:'green', status:'done'},
                    {id:9, title:'Hello world', description:'', color:'yellow', status:'done'},
                ]
            },
            {id: 2, name:"Tasker project", color:"blue"},
            {id: 3, name:"School homework", color:"green"},
            {id: 4, name:"Write seminar", color:"yellow"},
            {id: 5, name:"Prepare for speach", color:"orange"},
            {id: 6, name:"Dummy project", color:"blue"}
        ]
    }

    getProjectInstance(id){
        if(id){
            // Do a server call (also start spinner)
            this.project = this.mockDbProjectList.find((element) => element.id == id);
            return this.project;
        }
    }

    editTask(task){
        if(this.project && this.project.tasks){
            let projectTask = this.project.tasks.find(el => el.id === task.id)
            if(projectTask){
                // Edit task on server
                projectTask.title = task.title;
                projectTask.color = task.color;
                projectTask.description = task.description;
            }
        }
    }
    
    handleActions(action){
        switch(action.type){
            case 'EDIT_TASK':
                this.editTask(action.data);
                break;
            case 'SHOW_EDIT_MODAL':
                this.emit('toggleEditModal', {show: true, data: action.data});
                break;
            case 'CLOSE_EDIT_MODAL':
                this.emit('toggleEditModal', { show: false });
                break;
        }
    }
}

let projectInstanceStore = new ProjectInstanceStore();
dispatcher.register(projectInstanceStore.handleActions.bind(projectInstanceStore));
export default projectInstanceStore;