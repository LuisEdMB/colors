import { ResponseError as ResponseErrorType } from "./Response";

export interface RequestExecute<T> {
    isLoading: boolean,
    isSuccess: boolean,
    data: T,
    error: ResponseErrorType
}