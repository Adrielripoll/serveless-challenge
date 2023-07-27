import { Employee } from '../entities/employee'
import { UUID } from 'crypto'

export abstract class IEmployeeRepository {
    abstract create: (employee: Employee) => Promise<void>
    abstract findAll: () => Promise<Employee[]>
    abstract findOne: (id: UUID) => Promise<Employee| null> 
    abstract update: (id: UUID, employee: Employee) => Promise<Employee>
    abstract delete: (id: UUID) => Promise<void>
}