import { Container } from "inversify";
import { EmployeeUseCases } from '../../app/use-cases/employee-use-cases'
import { EmployeeController } from '../http/controllers/employee-controller'
import { EmployeeRepository } from '../database/repositories/employee-repository'
import { IEmployeeRepository } from '../../app/repositories/employee-repository'

import { TYPES } from './types'

const container = new Container()

container.bind<EmployeeController>(EmployeeController).toSelf()
container.bind<EmployeeUseCases>(EmployeeUseCases).toSelf()
container.bind<IEmployeeRepository>(TYPES.EmployeeRepository).to(EmployeeRepository)


export { container }