import * as config from '../config/config'
import { User as UserType } from "../types/User";
import { Request as RequestType } from "../types/Request";
import callApi from './base.service';

export const authUser = (user: UserType) => {
    const request: RequestType = {
        url: `${config.REACT_APP_API}/api/auth/signin`,
        method: 'POST',
        data: user
    }
    return callApi(request)
}