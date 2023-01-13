export interface insertStuForm {
    stuID: string,
    username: string,
    state: string
}
export class insertStuData {
    stuForm: insertStuForm = {
        stuID:"",
        username: "",
        state: ""
    }
}