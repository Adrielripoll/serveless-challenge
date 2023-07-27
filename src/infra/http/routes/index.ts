import express, { Router } from 'express'
import { container } from '../../IoC/container'
import { EmployeeController } from '../controllers/employee-controller'
import { ValidationMiddleware } from '../middlewares/validation'
import { CreateEmployeeSchema, UpdateEmployeeSchema } from '../validation/employee-schema'

const app = express()

app.use(express.json())

const employeesController = container.get<EmployeeController>(EmployeeController)

app.post('/employee', ValidationMiddleware(CreateEmployeeSchema), employeesController.create.bind(employeesController))
app.get('/employee', employeesController.findAll.bind(employeesController))
app.get('/employee/:id', employeesController.findOne.bind(employeesController))
app.put('/employee/:id', ValidationMiddleware(UpdateEmployeeSchema), employeesController.update.bind(employeesController))
app.delete('/employee/:id', employeesController.delete.bind(employeesController))

export { app }
