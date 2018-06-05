import EventEmitter from 'events';

import dispatcher from '../dispatcher';
import serverMockup from '../ServerMockup';

class ProjectInstanceStore extends EventEmitter {
    getProjectInstance(id){
        if(id){
            // Do a server call (also start spinner)
            this.project = serverMockup.getProjectInstance(id);
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
                projectTask.status = task.status;
            }
        }
    }

    createTask(task){
        if(this.project && this.project.tasks){
            // Send new task on server (fire spinner)
            let newTask = {
                id: Date.now(),
                title: task.title,
                color: task.color,
                description: task.description,
                status: task.status
            }
            this.project.tasks.push(newTask);
        }
    }
    
    handleActions(action){
        switch(action.type){
            case 'EDIT_TASK':
                this.editTask(action.data);
                break;
            case 'CREATE_TASK':
                this.createTask(action.data);
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