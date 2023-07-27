import { Employee } from "../../../app/entities/employee";

export class EmployeeViewModel {
    static toHttp(employee: Employee){
        return {
            id: employee.id,
            name: employee.name,
            age: employee.age,
            role: employee.role
        }
    }
}