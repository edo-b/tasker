class ServerMockup{
    constructor(){
        this.state = {
                projectInstances: [
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
            ],

            projects: [
                {id: 1, name:"Learn React", color:"red"},
                {id: 2, name:"Tasker project", color:"blue"},
                {id: 3, name:"School homework", color:"green"},
                {id: 4, name:"Write seminar", color:"yellow"},
                {id: 5, name:"Prepare for speach", color:"orange"},
                {id: 6, name:"Dummy project", color:"blue"}
            ]
        }
    }

    getProjectList(){
        return this.state.projects;
    }

    getProjectInstance(id){
        return this.state.projectInstances.find((element) => element.id == id);
    }
}

let serverMockup = new ServerMockup();
export default serverMockup;