import EventEmitter from 'events';

class TestStore extends EventEmitter {
    constructor(){
        super();
        console.log("Constructor called");
    }
}

export default new TestStore();