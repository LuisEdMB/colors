import { inject, injectable } from 'inversify'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import { CONFIG_REGISTER_TYPES } from '../../config/config.register.types'

import Config from '../../config/config'

import { AuthDto } from '../dtos/auth.dto'

import UnauthorizedException from '../exceptions/unauthorized.exceptions'

import { User } from '../../domain/models/user.model'

import { INFRAESTRUCTURE_REGISTER_TYPES } from '../../infraestructure/infraestructure.register.types'

import UserRepository from '../../infraestructure/repositories/user.repository'

@injectable()
class AuthService {
    constructor(
        @inject(CONFIG_REGISTER_TYPES.config) private readonly _config: Config,
        @inject(INFRAESTRUCTURE_REGISTER_TYPES.repositories.userRepository) private readonly _userRepository: UserRepository
    ) { }

    async signIn(authDto: AuthDto): Promise<{ accessToken: string }> {
        const user = await this._userRepository.getByUsername(authDto.username)
        if (await bcrypt.compare(authDto.password, user.password)) return { accessToken: this.getToken(user) }
        else throw new UnauthorizedException('Check user credentials.')
    }

    private getToken(user: User): string {
        const token = jwt.sign(
            {
                username: user.username,
                rol: user.rol
            },
            this._config.JWT_SECRET,
            { expiresIn: '2hr' }
        )
        return token
    }
}

export default AuthService