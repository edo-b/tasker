import dispatcher from '../dispatcher';

export function showSpinner(){
    dispatcher.dispatch({ type: "SHOW_SPINNER" });
}

export function hideSpinner(){
    dispatcher.dispatch({ type: "HIDE_SPINNER" });
}