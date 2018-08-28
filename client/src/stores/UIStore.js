import EventEmitter from 'events';
import dispatcher from '../dispatcher';
import jwt_decode from 'jwt-decode';

class UIStore extends EventEmitter {
    constructor(){
        super();

        this.isUserLoggedIn = false;
        this.userData = {
            firstName: '',
            lastName: ''
        }
    }

    getUserLoggedInStatus(){
        return this.isUserLoggedIn;
    }
    getUserData(){
        return this.userData;
    }

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