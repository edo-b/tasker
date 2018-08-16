import dispatcher from '../dispatcher';

export function submitLoginData(userName, password){
    //dispatcher.dispatch({type: '', data: project});
    console.log("In submit login data", userName + " " + password);
}

export function submitRegisterData(firstName, lastName, userName, password){
    //dispatcher.dispatch({type: '', data: project});
    console.log("In submit login data", firstName + " " + lastName + " " + userName + " " + password);
}