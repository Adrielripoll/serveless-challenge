import { Employee } from "../../../app/entities/employee";

export class EmployeeMapper {
    static toDomain(employee: any){
        return new Employee(employee.name, employee.age, employee.role, employee.id)
    }
}