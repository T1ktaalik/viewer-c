interface Person {
    name: string;
    age: number;
}

interface WatchNotChangePerson {
    readonly name: string;
    readonly age: number;
}

let person: Person = {
    name: 'John',
    age: 30
}

let read: WatchNotChangePerson = {
    name: 'Xoxo',
    age: 30
}

read.name += read.name + ' has been changed'