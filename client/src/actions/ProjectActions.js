import dispatcher from '../dispatcher';

// Later on handle api calls to server here

export function createProject (name, color) {
    dispatcher.dispatch({type: 'CREATE_PROJECT', data:{name: name, color: color} });
}

export function deleteProject(id){
    dispatcher.dispatch({type: 'DELETE_PROJECT', data: {id: id}});
}

export function showDeleteModal(project){
    dispatcher.dispatch({type: 'SHOW_DELETE_MODAL', data: project});
}

export function closeDeleteModal(){
    dispatcher.dispatch({type: 'CLOSE_DELETE_MODAL'});    
}