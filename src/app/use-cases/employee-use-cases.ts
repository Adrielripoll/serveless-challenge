import { UUID } from "crypto"
import { TYPES } from "../../infra/IoC/types"
import { inject, injectable } from "inversify"
import { IEmployeeRepository } from "../repositories/employee-repository"
import { Employee } from "../entities/employee"

export interface CreateEmployeePayload {
    name: string
    age: number
    role: string
}

@injectable()
export class EmployeeUseCases {

    private employeeRepository: IEmployeeRepository

    constructor(@inject(TYPES.EmployeeRepository) employeeRepository: IEmployeeRepository){
        this.employeeRepository = employeeRepository
    }

    async create(employeePayload: CreateEmployeePayload): Promise<Employee> {
        const employee = new Employee(employeePayload.name, employeePayload.age, employeePayload.role)
        await this.employeeRepository.create(employee)
        return employee
    }

    async findAll(): Promise<Employee[]> {
        return await this.employeeRepository.findAll()
    }

    async findOne(id: UUID):  Promise<Employee | null> {
        const employee = await this.employeeRepository.findOne(id)
        return employee
    }

    async update(id: UUID, employeePayload: Partial<CreateEmployeePayload>):  Promise<Employee | null> {
        const employeeExists = await this.employeeRepository.findOne(id)

        if(!employeeExists){
            return null
        }

        if(employeePayload.name){
            employeeExists.name = employeePayload.name
        }
        if(employeePayload.age){
            employeeExists.age = employeePayload.age
        }
        if(employeePayload.role){
            employeeExists.role = employeePayload.role
        }

        return await this.employeeRepository.update(id, employeeExists)
    }

    async delete(id: UUID): Promise<void | null> {
        const employeeExists = await this.employeeRepository.findOne(id)

        if(!employeeExists){
            return null
        }

        await this.employeeRepository.delete(id)
    }
}