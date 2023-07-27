import Joi from 'joi'

export const CreateEmployeeSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    role: Joi.string().required()
})

export const UpdateEmployeeSchema = Joi.object({
    name: Joi.string(),
    age: Joi.number().strict(),
    role: Joi.string()
})