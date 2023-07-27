import { UUID, randomUUID } from "crypto";

export class Employee {
    private _id: UUID
    private _name: string
    private _age: number
    private _role: string

    constructor(name: string, age: number, role: string, id?: UUID){
        this._id = id ?? randomUUID()
        this._name = name
        this._age = age,
        this._role = role
    }

    public get id(){
        return this._id
    }

    public get name(){
        return this._name
    }

    public set name(name: string){
        this._name = name
    }

    public get age(){
        return this._age
    }

    public set age(age: number){
        this._age = age
    }

    public get role(){
        return this._role
    }

    public set role(role: string){
        this._role = role
    }
}