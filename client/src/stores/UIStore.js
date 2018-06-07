import EventEmitter from 'events';
import dispatcher from '../dispatcher';

class UIStore extends EventEmitter {

    handleActions(action){
        switch(action.type){
            case "SHOW_SPINNER":
                this.emit("change", true);
                break;
            case "HIDE_SPINNER":
                this.emit("change", false);
                break;
        }
    }
}

let uiStore = new UIStore();
dispatcher.register(uiStore.handleActions.bind(uiStore));
export default uiStore;