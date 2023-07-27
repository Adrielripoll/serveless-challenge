import { EmployeeUseCases } from '../../../app/use-cases/employee-use-cases';
import { Request, Response } from 'express'
import { inject, injectable } from 'inversify';
import { CreateEmployeePayload } from '../../../app/use-cases/employee-use-cases';
import { UUID } from 'crypto'
import { EmployeeViewModel } from '../view-model/employee-view-model';

@injectable()
export class EmployeeController {

    private employeeUseCases: EmployeeUseCases

    constructor(@inject(EmployeeUseCases) employeeUseCases: EmployeeUseCases){
        this.employeeUseCases = employeeUseCases
    }
    
    async create(request: Request, response: Response){
        const data: CreateEmployeePayload = request.body
        const employee = await this.employeeUseCases.create(data)
        return response.status(201).json(EmployeeViewModel.toHttp(employee))
    }
    
    async findAll(request: Request, response: Response){
        const employeesList = await this.employeeUseCases.findAll()
        return response.status(200).json(employeesList.map(EmployeeViewModel.toHttp))
    }

    async findOne(request: Request, response: Response){
        const { id }  = request.params
        const employee = await this.employeeUseCases.findOne(id as UUID)

        if(!employee){
            return response.status(404).json({ message: 'Employee not found'})
        }

        return response.status(200).json(EmployeeViewModel.toHttp(employee))
    }

    async update(request: Request, response: Response){
        const { id } = request.params
        const data: CreateEmployeePayload = request.body

        const employee = await this.employeeUseCases.update(id as UUID, data)

        if(!employee){
            return response.status(404).json({ message: 'Employee not found'})
        }

        return response.status(200).json(EmployeeViewModel.toHttp(employee))
    }

    async delete(request: Request, response: Response){
        const { id }  = request.params
        const employee = await this.employeeUseCases.delete(id as UUID)

        if(employee === null){
            return response.status(404).json({ message: 'Employee not found'})
        }

        return response.status(204).send()
    }
}