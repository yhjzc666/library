import service from ".";

interface loginData{
    username:string,
    password:string
}

interface updateData{
    state:string,
}

interface insertStu{
    stuID:string,
    username:string,
    state:string
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

export function insertStu(data:insertStu){
    return service({
        url:'/insertStu',
        method:'post',
        data
    })
}

export function selectStu(){
    return service({
        url:'/selectStu',
        method:'post',
    })
}