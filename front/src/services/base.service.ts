import axios from 'axios'
import { Request as RequestType } from '../types/Request'
import { ResponseError as ResponseErrorType } from '../types/Response'

const callApi = async (request: RequestType): Promise<any | ResponseErrorType> => {
    return axios({
        url: request.url,
        method: request.method,
        data: JSON.stringify(request.data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ localStorage.getItem('token') }`
        }
    }).then((response) => {
        if (response.status === 200) return response.data.data
        else return { ...response.data, isError: true } as ResponseErrorType
    }).catch((error) => {
        const code = error.response?.data?.code || '01'
        const message = error.response?.data?.message || 'An error has ocurred.'
        return { code, message, isError: true } as ResponseErrorType
    })
}

export default callApi