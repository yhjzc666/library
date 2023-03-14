import service from ".";

interface loginData {
    username: string,
    password: string
}

interface updateData {
    stuID: string,
    username: string,
    state: string
}

interface deleteData {
    stuID: [],
}

interface insertStu {
    stuID: string,
    username: string,
    state: string
}

interface selectSomeSeat {
    parentID: string,
    grandPID: string,
}

export function login(data: loginData) {
    return service({
        url: '/login',
        method: 'post',
        data
    })
}

export function updateStu(data: updateData) {
    return service({
        url: '/updateState',
        method: 'post',
        data
    })
}

export function insertStu(data: insertStu) {
    return service({
        url: '/insertStu',
        method: 'post',
        data
    })
}
export function selectOneStu(data: updateData) {
    return service({
        url: '/selectOneStu',
        method: 'post',
        data
    })
}
export function selectStu() {
    return service({
        url: '/selectStu',
        method: 'post',
    })
}

export function deleteStu(data: deleteData) {
    return service({
        url: '/deleteStu',
        method: 'post',
        data
    })
}

export function selectAllSeat() {
    return service({
        url: '/selectAllSeat',
        method: 'post',
    })
}

export function selectSomeSeat(data:selectSomeSeat) {
    return service({
        url: '/selectSomeSeat',
        method: 'post',
        data
    })
}