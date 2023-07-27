import { IEmployeeRepository } from '../src/app/repositories/employee-repository'
import { Employee } from '../src/app/entities/employee'
import { UUID } from 'crypto'

export class InMemoryEmployeesRepository implements IEmployeeRepository {
    public database: Employee[] = []

    async create(employeePayload: Employee){
        this.database.push(employeePayload)
    }

    async findAll(){
        return this.database
    }

    async findOne(id: UUID){
        const employee = this.database.find((employee) => employee.id === id)

        if(!employee){
            return null
        }

        return employee
    }

    async update(id: UUID, employeePayload: Employee){
        const employeeIndex = this.database.findIndex((employee) => employee.id == id)

        this.database.splice(employeeIndex, 1)
        this.database.push(employeePayload)

        return employeePayload
    }

    async delete(id: UUID){
        const employeeIndex = this.database.findIndex((employee) => employee.id == id)
        this.database.splice(employeeIndex, 1)
    }
}