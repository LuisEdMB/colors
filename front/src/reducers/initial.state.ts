import { RequestExecute as RequestExecuteType } from "../types/RequestExecute"

const initialState: RequestExecuteType<any> = {
    isLoading: false,
    isSuccess: false,
    data: null,
    error: {
        isError: false,
        code: '',
        message: ''
    }
}

export const initialStateAuth = () => ({
    authUser: initialState
})

export const initialStateColor = () => ({
    getColors: initialState,
    getColor: initialState,
    addColor: {
        _id: '',
        name: '',
        color: '',
        pantone: '',
        year: 0
    },
    createColor: initialState,
    updateColor: initialState,
    deleteColor: initialState
})