import { Request as RequestType } from "../types/Request"
import * as config from '../config/config'
import callApi from "./base.service"
import { Color as ColorType } from "../types/Color"

export const getColors = (currentPage: number) => {
    const request: RequestType = {
        url: `${config.REACT_APP_API}/api/colores?offset=${ currentPage * 6 }`,
        method: 'GET',
        data: null
    }
    return callApi(request)
}

export const getColor = (id: string) => {
    const request: RequestType = {
        url: `${config.REACT_APP_API}/api/colores/${id}`,
        method: 'GET',
        data: null
    }
    return callApi(request)
}

export const createColor = (color: ColorType) => {
    const request: RequestType = {
        url: `${config.REACT_APP_API}/api/colores`,
        method: 'POST',
        data: color
    }
    return callApi(request)
}

export const updateColor = (color: ColorType) => {
    const request: RequestType = {
        url: `${config.REACT_APP_API}/api/colores/${color._id}`,
        method: 'PATCH',
        data: color
    }
    return callApi(request)
}

export const deleteColor = (id: string) => {
    const request: RequestType = {
        url: `${config.REACT_APP_API}/api/colores/${id}`,
        method: 'DELETE',
        data: {}
    }
    return callApi(request)
}