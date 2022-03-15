import 'reflect-metadata'
import swagger from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import express from 'express'
import cors from 'cors'
import { InversifyExpressServer } from 'inversify-express-utils'

import './api/api'

import { CONFIG_REGISTER_TYPES } from './config/config.register.types'

import Config from './config/config'

import { INFRAESTRUCTURE_REGISTER_TYPES } from './infraestructure/infraestructure.register.types'

import MongoDatabase from './infraestructure/persistences/mongo.database'

import swaggerConfig from './infraestructure/swagger/config.swagger'

import DIContainer from './ioc/di.container'

const config = DIContainer.get<Config>(CONFIG_REGISTER_TYPES.config)
const mongoDatabase = DIContainer.get<MongoDatabase>(INFRAESTRUCTURE_REGISTER_TYPES.databases.mongoDatabase)

const server = new InversifyExpressServer(DIContainer)

server.setConfig((app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())

    app.use('/swagger', swagger.serve, swagger.setup(swaggerJsdoc(swaggerConfig)))
})

mongoDatabase
    .connect()
    .then(() => {
        server
            .build()
            .listen(config.PORT_API, () => console.log(`Server is running on port: ${config.PORT_API}...`))
    })