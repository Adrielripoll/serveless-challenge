import 'reflect-metadata'
import { EmployeeUseCases } from './employee-use-cases'
import { InMemoryEmployeesRepository } from '../../../test/in-memory-employees-repository'
import { Employee } from '../entities/employee'
import { randomUUID } from 'crypto'

describe('Employee use cases', () => {
    
    let employeeUseCases: EmployeeUseCases
    let inMemoryEmployeesRepository: InMemoryEmployeesRepository

    const employeePayload = {
        name: 'John Doe',
        age: 30,
        role: 'Developer'
    }

    beforeEach(() => {
        inMemoryEmployeesRepository = new InMemoryEmployeesRepository()
        employeeUseCases = new EmployeeUseCases(inMemoryEmployeesRepository)
    })

    describe('Create', () => {
        it('should register an employee in database', async () => {

            const employee = await employeeUseCases.create(employeePayload)

            expect(employee).toBeTruthy()
            expect(employee).toBeInstanceOf(Employee)
        })
    })

    describe('Find', () => {
        it('should return employees list', async () => {
            await employeeUseCases.create(employeePayload)

            const employeesList = await employeeUseCases.findAll()

            expect(employeesList[0]).toBeInstanceOf(Employee)
            expect(employeesList).toHaveLength(1)
            expect.arrayContaining([
                expect.objectContaining({ name: 'John Doe' })
            ])
        })

        it('should return an specific employee by id', async () => {
            const { id } = await employeeUseCases.create(employeePayload)
            const employee = await employeeUseCases.findOne(id)
            expect(employee).toBeInstanceOf(Employee)            
        })

        it('should return null when employee aint found', async () => {
            const randomId = randomUUID()
            const employee = await employeeUseCases.findOne(randomId)

            expect(employee).toBeNull()
        })
    })

    describe('Update', () => {
        it('should return null when employee aint found', async () => {
            const randomId = randomUUID()
            const employee = await employeeUseCases.delete(randomId)

            expect(employee).toBeNull()
        })
    })

    describe('Delete', () => {
        it('should delete an employee from database', async () => {
            const { id } = await employeeUseCases.create(employeePayload)
            const employee = await employeeUseCases.delete(id)

            expect(employee).toBeUndefined()
        })

        it('should return null when employee aint found', async () => {
            const randomId = randomUUID()
            const employee = await employeeUseCases.delete(randomId)

            expect(employee).toBeNull()
        })
    })
})