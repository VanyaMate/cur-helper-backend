export class Dto<Type> {
    constructor (data: Type) {
        Object.entries(data).forEach(([ key, value ]) => {
            this[key] = value;
        });
    }
}