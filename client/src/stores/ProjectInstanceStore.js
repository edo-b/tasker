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
            return this.mockDbProjectList.find((element) => element.id == id);
        }
    }
    
    handleActions(action){
        switch(action.type){

        }
    }
}

let projectInstanceStore = new ProjectInstanceStore();
dispatcher.register(projectInstanceStore.handleActions.bind(this));
export default projectInstanceStore;