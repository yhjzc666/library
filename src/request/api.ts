import service from ".";

interface loginData{
    username:string,
    password:string
}

interface updateData{
    state:string,
}

export function login(data:loginData){
    return service({
        url:'/login',
        method:'post',
        data
    })
}

export function updateStates(data:updateData){
    return service({
        url:'/updateState',
        method:'post',
        data
    })
}