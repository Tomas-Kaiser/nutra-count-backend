type Meta = {
    date: Date;
}

type Result = {
    data: any;
}


export default class Response<T> {
    meta: Meta;
    result: Result;

    constructor(data: T) {
        this.meta = {
            date: new Date(),
        }

        this.result = {
            data
        }
    }
}