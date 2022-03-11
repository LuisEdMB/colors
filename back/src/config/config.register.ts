import { Container } from 'inversify'

import { CONFIG_REGISTER_TYPES } from './config.register.types'

import Config from './config'

const container = new Container()

container.bind<Config>(CONFIG_REGISTER_TYPES.config).to(Config)

export default container