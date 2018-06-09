import EventEmitter from 'events';
import dispatcher from '../dispatcher';

class UIStore extends EventEmitter {

    handleActions(action){
        switch(action.type){
            case "SHOW_SPINNER":
                this.emit("changeSpinner", true);
                break;
            case "HIDE_SPINNER":
                this.emit("changeSpinner", false);
                break;
            case "SHOW_FEEDBACK_MESSAGE":
                this.emit("changeFeedback", { data: action.data });
                break;
        }
    }
}

let uiStore = new UIStore();
dispatcher.register(uiStore.handleActions.bind(uiStore));
export default uiStore;