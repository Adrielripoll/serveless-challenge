import 'reflect-metadata'
import serverless from 'serverless-http'
import { app } from './infra/http/routes'

export const handler = serverless(app)