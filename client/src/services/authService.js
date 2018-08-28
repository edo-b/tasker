import jwt_decode from 'jwt-decode';

export function checkSession(){
    if(window.localStorage.getItem('token'))
        return true;
    else
        return false;
}

export function terminateSession(){
    window.localStorage.removeItem('token');
    window.location.replace('/');
}

export function getToken(){
    return window.localStorage.getItem('token');
}

export function getUserData(){
    const token = getToken();
    if(token){
        const decodedData = jwt_decode(token);

        return decodedData.user;
    }

    return {firstName: '', lastName: ''};
}