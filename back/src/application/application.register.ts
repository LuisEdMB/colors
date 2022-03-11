import { Container } from 'inversify'

import { APPLICATION_REGISTER_TYPES } from './application.register.types'

import AuthService from './services/auth.service'
import ColorService from './services/color.service'

const container = new Container()

container.bind<AuthService>(APPLICATION_REGISTER_TYPES.services.authService).to(AuthService)
container.bind<ColorService>(APPLICATION_REGISTER_TYPES.services.colorService).to(ColorService)

export default container