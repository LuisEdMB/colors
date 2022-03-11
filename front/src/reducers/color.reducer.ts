import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store.configure";
import * as colorService from '../services/color.service'
import { Color as ColorType, ColorPagination as ColorPaginationType } from "../types/Color";
import { RequestExecute as RequestExecuteType } from "../types/RequestExecute";
import { initialStateColor } from "./initial.state";
import { ResponseError as ResponseErrorType } from "../types/Response";
import { Guid } from "guid-typescript";

const REDUCER_NAME = 'color'

interface ColorRequest {
    getColors: RequestExecuteType<ColorPaginationType>,
    getColor: RequestExecuteType<ColorType>,
    createColor: RequestExecuteType<ColorType>,
    updateColor: RequestExecuteType<ColorType>,
    deleteColor: RequestExecuteType<ColorType>
}

const initialState: ColorRequest = {
    getColors: initialStateColor().getColors,
    getColor: initialStateColor().getColor,
    createColor: initialStateColor().createColor,
    updateColor: initialStateColor().updateColor,
    deleteColor: initialStateColor().deleteColor
}

export const getColors = createAsyncThunk(
    `${REDUCER_NAME}/getColors`,
    async (currentPage: number, thunkApi) => {
        const response = await colorService.getColors(currentPage)
        if (response.code) return thunkApi.rejectWithValue(response)
        const data: ColorPaginationType = response
        return data
    }
)

export const getColor = createAsyncThunk(
    `${REDUCER_NAME}/getColor`,
    async (id: string, thunkApi) => {
        const response = await colorService.getColor(id)
        if (response.isError) return thunkApi.rejectWithValue(response)
        const data: ColorType = response
        return data
    }
)

export const createColor = createAsyncThunk(
    `${REDUCER_NAME}/createColor`,
    async (color: ColorType, thunkApi) => {
        const response = await colorService.createColor(color)
        if (response.isError) return thunkApi.rejectWithValue(response)
        const data: ColorType = response
        return data
    }
)

export const updateColor = createAsyncThunk(
    `${REDUCER_NAME}/updateColor`,
    async (color: ColorType, thunkApi) => {
        const response = await colorService.updateColor(color)
        if (response.isError) return thunkApi.rejectWithValue(response)
        const data: ColorType = response
        return data
    }
)

export const deleteColor = createAsyncThunk(
    `${REDUCER_NAME}/deleteColor`,
    async (id: string, thunkApi) => {
        const response = await colorService.deleteColor(id)
        if (response.isError) return thunkApi.rejectWithValue(response)
        const data: ColorType = response
        return data
    }
)

const colorSlice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {
        addColorItem: (state) => {
            state.getColors.data.colors.unshift({ ...initialStateColor().addColor, _id: Guid.raw(), isNew: true })
        },
        removeColorItem: (state, action: PayloadAction<string>) => {
            const index = state.getColors.data.colors.findIndex((item) => item._id === action.payload)
            state.getColors.data.colors.splice(index, 1)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getColors.pending, (state) => {
                state.getColors = { ...initialState.getColors }
                state.getColors.isLoading = true
            })
            .addCase(getColors.fulfilled, (state, action) => {
                state.getColors = { ...initialState.getColors }
                state.getColors.isSuccess = true
                state.getColors.data = action.payload
            })
            .addCase(getColors.rejected, (state, action) => {
                const error = action.payload as ResponseErrorType
                state.getColors = { ...initialState.getColors }
                state.getColors.error = { ...error }
                alert(`${ error.code } - ${ error.message }`)
            })

            .addCase(getColor.pending, (state) => {
                state.getColor = { ...initialState.getColor }
                state.getColor.isLoading = true
            })
            .addCase(getColor.fulfilled, (state, action) => {
                state.getColor = { ...initialState.getColor }
                state.getColor.isSuccess = true
                state.getColor.data = action.payload
            })
            .addCase(getColor.rejected, (state, action) => {
                const error = action.payload as ResponseErrorType
                state.getColor = { ...initialState.getColor }
                state.getColor.error = { ...error }
                alert(`${ error.code } - ${ error.message }`)
            })

            .addCase(createColor.pending, (state) => {
                state.createColor = { ...initialState.createColor }
                state.createColor.isLoading = true
            })
            .addCase(createColor.fulfilled, (state, action) => {
                state.createColor = { ...initialState.createColor }
                state.createColor.isSuccess = true
                state.createColor.data = action.payload
            })
            .addCase(createColor.rejected, (state, action) => {
                const error = action.payload as ResponseErrorType
                state.createColor = { ...initialState.createColor }
                state.createColor.error = { ...error }
                alert(`${ error.code } - ${ error.message }`)
            })

            .addCase(updateColor.pending, (state) => {
                state.updateColor = { ...initialState.updateColor }
                state.updateColor.isLoading = true
            })
            .addCase(updateColor.fulfilled, (state, action) => {
                state.updateColor = { ...initialState.updateColor }
                state.updateColor.isSuccess = true
                state.updateColor.data = action.payload
            })
            .addCase(updateColor.rejected, (state, action) => {
                const error = action.payload as ResponseErrorType
                state.updateColor = { ...initialState.updateColor }
                state.updateColor.error = { ...error }
                alert(`${ error.code } - ${ error.message }`)
            })

            .addCase(deleteColor.pending, (state) => {
                state.deleteColor = { ...initialState.deleteColor }
                state.deleteColor.isLoading = true
            })
            .addCase(deleteColor.fulfilled, (state, action) => {
                state.deleteColor = { ...initialState.deleteColor }
                state.deleteColor.isSuccess = true
                state.deleteColor.data = action.payload
            })
            .addCase(deleteColor.rejected, (state, action) => {
                const error = action.payload as ResponseErrorType
                state.deleteColor = { ...initialState.deleteColor }
                state.deleteColor.error = { ...error }
                alert(`${ error.code } - ${ error.message }`)
            })
    }
})

export const selectColor = (state: RootState) => state.color
export const { addColorItem, removeColorItem } = colorSlice.actions
export default colorSlice.reducer