import { Container } from 'inversify'

import ConfigRegister from '../config/config.register'
import AplicationRegister from '../application/application.register'
import DomainRegister from '../domain/domain.register'
import InfraestructureRegister from '../infraestructure/infraestructure.register'

const container = Container.merge(
    ConfigRegister,
    AplicationRegister,
    DomainRegister,
    InfraestructureRegister
)

export default container