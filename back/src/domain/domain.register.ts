import { Container } from 'inversify'

import { DOMAIN_REGISTER_TYPES } from './domain.register.types'

import ColorDomainService from './services/color.domain.service'

const container = new Container()

container.bind<ColorDomainService>(DOMAIN_REGISTER_TYPES.services.colorDomainService).to(ColorDomainService)

export default container