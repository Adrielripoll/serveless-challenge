import { ObjectSchema } from 'joi'
import { Request, Response, NextFunction } from 'express'

export const ValidationMiddleware = (Schema: ObjectSchema) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const { error } = Schema.validate(request.body)
        if(!error){
            next()
        } else {
            const message = error.details.map(m => m.message).join(',').replace(/["]+/g, '')
            return response.status(422).json({ message: message })
        }
    }
}

