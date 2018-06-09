import dispatcher from '../dispatcher';

export function showSpinner(){
    dispatcher.dispatch({ type: "SHOW_SPINNER" });
}

export function hideSpinner(){
    dispatcher.dispatch({ type: "HIDE_SPINNER" });
}

export function showFeedbackMessage(color, message){
    dispatcher.dispatch({ type: "SHOW_FEEDBACK_MESSAGE", data: { show:true, color: color, message: message } });
}