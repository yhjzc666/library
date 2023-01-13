export interface IndexFormInt {
    state: string,
    firstTime:string,
    finishTime :string,
}
export class IndexData {
    ruleForm: IndexFormInt = {
        state: "1",
        firstTime: "",
        finishTime:"",
    }
}