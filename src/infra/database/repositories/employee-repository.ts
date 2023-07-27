import { Employee } from '../../../app/entities/employee';
import { IEmployeeRepository } from '../../../app/repositories/employee-repository'
import { DynamoDb } from '../index'
import { 
    GetCommand,
    PutCommandInput,
    UpdateCommandInput,
    DeleteCommandInput
} from '@aws-sdk/lib-dynamodb'
import { EmployeeMapper } from '../mappers/employee-mapper';
import { UUID } from 'crypto'
import { injectable } from 'inversify';

const tableName = process.env.EMPLOYEES_TABLE ?? 'employees'

@injectable()
export class EmployeeRepository implements IEmployeeRepository{
    async create(employeePayload: Employee): Promise<void> {

        const params: PutCommandInput = {
            TableName: tableName,
            Item: {
                id: employeePayload.id,
                name: employeePayload.name,
                age: employeePayload.age,
                role: employeePayload.role
            },
            ReturnValues: 'ALL_OLD'
        }

        await DynamoDb.put(params)
    }

    async findAll (): Promise<Employee[]> {
        const params = {
            TableName: tableName,
        }
    
        const { Items } = await DynamoDb.scan(params)

        if(!Items){
            return []
        }
        
        return Items.map(EmployeeMapper.toDomain)
    }

    async findOne(id: UUID): Promise<Employee | null> {
        const params = {
            TableName: tableName,
            Key: { id }
        }
    
        const { Item } = await DynamoDb.send(new GetCommand(params))

        if(!Item){
            return null
        }
        
        return EmployeeMapper.toDomain(Item)
    }

    async update (id: UUID, employeePayload: Employee): Promise<Employee> {

        const params: UpdateCommandInput = {
            TableName: tableName,
            Key: { id },
            ReturnValues: 'ALL_NEW',
            UpdateExpression: 'set #name = :name, #age = :age, #role = :role',
            ExpressionAttributeNames: {
                '#name':'name',
                '#age':'age',
                '#role':'role'
            },
            ExpressionAttributeValues: {
                ':name': employeePayload.name,
                ':age': employeePayload.age,
                ':role': employeePayload.role
            }
        }

        const { Attributes } = await DynamoDb.update(params)

        return EmployeeMapper.toDomain(Attributes)
    }

    async delete (id: UUID): Promise<void> {
        const deleteQuery: DeleteCommandInput = {
            TableName: tableName,
            Key: { id }
        }

        await DynamoDb.delete(deleteQuery)
    }
}