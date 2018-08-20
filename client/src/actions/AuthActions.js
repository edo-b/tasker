import dispatcher from '../dispatcher';
import axios from 'axios';
import { CLIENT_RENEG_WINDOW } from 'tls';
import { showFeedbackMessage } from './UIActions';

export function submitLoginData(userName, password){
    //dispatcher.dispatch({type: '', data: project});
    console.log("In submit login data", userName + " " + password);
    axios.post('/user/login', {userName: userName, password: password})
        .then(response => {
            if(response.data.token){
                window.localStorage.setItem('token', response.data.token);
                window.location.replace('/');
            }
        })
        .catch(err => {
            if(err.response.status = 400){
                showFeedbackMessage('red', 'Wrong login data');
            }
            else{
                showFeedbackMessage('red', 'An error occured');
            }
        });
}

export function submitRegisterData(firstName, lastName, userName, password){
    //dispatcher.dispatch({type: '', data: project});
    console.log("In submit login data", firstName + " " + lastName + " " + userName + " " + password);
}