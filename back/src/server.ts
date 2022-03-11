import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { InversifyExpressServer } from 'inversify-express-utils'

import './api/api'

import { CONFIG_REGISTER_TYPES } from './config/config.register.types'

import Config from './config/config'

import { INFRAESTRUCTURE_REGISTER_TYPES } from './infraestructure/infraestructure.register.types'

import MongoDatabase from './infraestructure/persistences/mongo.database'

import DIContainer from './ioc/di.container'

const config = DIContainer.get<Config>(CONFIG_REGISTER_TYPES.config)
const mongoDatabase = DIContainer.get<MongoDatabase>(INFRAESTRUCTURE_REGISTER_TYPES.databases.mongoDatabase)

const server = new InversifyExpressServer(DIContainer)

server.setConfig((app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())
})

mongoDatabase
    .connect()
    .then(() => {
        server
            .build()
            .listen(config.PORT_API, () => console.log(`Server is running on port: ${config.PORT_API}...`))
    })