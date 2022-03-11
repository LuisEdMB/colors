import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store.configure";
import * as authService from '../services/auth.service'
import { RequestExecute as RequestExecuteType } from "../types/RequestExecute";
import { initialStateAuth } from "./initial.state";
import { User as UserType } from "../types/User";
import { ResponseError as ResponseErrorType } from "../types/Response";

const REDUCER_NAME = 'auth'

interface AuthRequest {
    authUser: RequestExecuteType<string>
}

const initialState: AuthRequest = {
    authUser: initialStateAuth().authUser
}

export const authUser = createAsyncThunk(
    `${REDUCER_NAME}/authUser`,
    async (user: UserType, thunkApi) => {
        const response = await authService.authUser(user)
        if (response.isError) return thunkApi.rejectWithValue(response)
        const token: { accessToken: string } = response
        return token
    }
)

const authSlice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authUser.pending, (state) => {
                state.authUser = { ...initialState.authUser }
                state.authUser.isLoading = true
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.authUser = { ...initialState.authUser }
                state.authUser.isSuccess = true
                state.authUser.data = action.payload.accessToken
                localStorage.setItem('token', action.payload.accessToken)
            })
            .addCase(authUser.rejected, (state, action) => {
                const error = action.payload as ResponseErrorType
                state.authUser = { ...initialState.authUser }
                state.authUser.error = { ...error }
                alert(`${ error.code } - ${ error.message }`)
            })
    }
})

export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer