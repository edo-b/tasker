import dispatcher from "../dispatcher";

export function createTask(task){
    dispatcher.dispatch({ type:"CREATE_TASK", data: task });
}

export function editTask(task){
    dispatcher.dispatch({ type:"EDIT_TASK", data: task });
}

export function deleteTask(task){
    dispatcher.dispatch({ type:"DELETE_TASK", data: task });
}

export function showCreateModal(task){
    dispatcher.dispatch({ type:"SHOW_CREATE_MODAL" });
}

export function closeCreateModal(){
    dispatcher.dispatch({ type:"CLOSE_CREATE_MODAL" });
}

export function showEditModal(task){
    dispatcher.dispatch({ type:"SHOW_EDIT_MODAL", data: task });
}

export function closeEditModal(){
    dispatcher.dispatch({ type:"CLOSE_EDIT_MODAL" });
}

export function showDeleteModal(task){
    dispatcher.dispatch({ type:"SHOW_DELETE_MODAL", data: task });
}

export function closeDeleteModal(){
    dispatcher.dispatch({ type:"CLOSE_DELETE_MODAL" });
}