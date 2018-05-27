import dispatcher from '../dispatcher';

export function createProject (name, color) {
    dispatcher.dispatch({type: 'CREATE_PROJECT', data:{name: name, color: color} });
}

export function showDeleteModal(project){
    dispatcher.dispatch({type: 'SHOW_DELETE_MODAL', data: project});
}

export function closeDeleteModal(){
    dispatcher.dispatch({type: 'CLOSE_DELETE_MODAL'});    
}