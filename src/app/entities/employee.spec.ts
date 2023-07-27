import { Employee } from './employee'

describe("Employee tests", () => {
    it('should be able to create an employee', async () => {
        const employee = new Employee('John Doe', 30, 'Developer')
        expect(employee).toBeTruthy()
        expect(employee).toBeInstanceOf(Employee)
    })
})