import React, { useCallback, useState } from 'react'
import { Box, Grid, styled, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteIcon from '@mui/icons-material/Delete'
import { Color as ColorType } from '../types/Color'
import IconButton from './IconButton'
import Input from './Input'
import { useAppDispatch } from '../store/store.configure'
import { createColor, deleteColor, removeColorItem, updateColor } from '../reducers/color.reducer'

type Props = {
    color: ColorType
}

type SubProps = {
    color: ColorType,
    edit: () => void
}

const BoxRoot = styled(Box)({
    border: '1px solid black',
    borderRadius: 10,
    height: 300,
    position: 'relative'
})

const HeaderContainer = styled(Box)({
    width: '100%',
    height: '20%',
    padding: '2px 6px'
})

const HeaderTypography = styled(Typography)({
    fontSize: 20
})

const BodyContainer = styled(Box)({
    width: '100%',
    height: '60%',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
})

const BodyTypography = styled(Typography)({
    fontSize: 20
})

const BodySubTypography = styled(Typography)({
    fontSize: 22,
    fontWeight: 'bold'
})

const FooterContainer = styled(Box)({
    width: '100%',
    height: '20%',

})

const FooterTypography = styled(Typography)({
    fontSize: 20,
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: '2px 6px'
})

const Color: React.FC<Props> = ({ color }) => {
    const [ edit, setEdit ] = useState<boolean>(false)

    return edit || color.isNew ? <ColorEdit color={ color } edit={ () => setEdit(false) } /> : <ColorNormal color={ color } edit={ () => setEdit(true) } />
}

const ColorNormal: React.FC<SubProps> = ({ color, edit }) => {
    const dispatch = useAppDispatch()

    const handleDeleteColor = useCallback(() => {
        dispatch(deleteColor(color._id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <BoxRoot sx={{ backgroundColor: color.color }}>
            <HeaderContainer>
                <Grid container>
                    <Grid item xs={ 6 }>
                        <HeaderTypography>
                            { color.year }
                        </HeaderTypography>
                    </Grid>
                    <Grid item xs={ 6 } style={{ paddingRight: 6 }} display='flex' justifyContent='flex-end'>
                        <IconButton icon={ <DeleteIcon /> } onClick={ handleDeleteColor } />
                        <IconButton icon={ <EditIcon /> } onClick={ () => edit() } />
                    </Grid>
                </Grid>
            </HeaderContainer>
            <BodyContainer>
                <BodyTypography>
                    { color.name }
                </BodyTypography>
                <BodySubTypography>
                    { color.color }
                </BodySubTypography>
            </BodyContainer>
            <FooterContainer>
                <FooterTypography>
                    { color.pantone }
                </FooterTypography>
            </FooterContainer>
        </BoxRoot>
    )
}

const ColorEdit: React.FC<SubProps> = ({ color, edit }) => {
    const [ editState, setEditState ] = useState({ ...color })
    const dispatch = useAppDispatch()

    const handleChangeState = useCallback((e) => {
        const { name, value } = e.target
        setEditState(s => ({
            ...s,
            [name]: value
        }))
    }, [])

    const handleRemoveColorItem = useCallback(() => {
        dispatch(removeColorItem(color._id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color])

    const handleCreateColor = useCallback(() => {
        dispatch(createColor(editState))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editState])

    const handleUpdateColor = useCallback(() => {
        dispatch(updateColor(editState))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editState])

    return (
        <BoxRoot sx={{ backgroundColor: color.color }}>
            <HeaderContainer>
                <Grid container>
                    <Grid item xs={ 6 }>
                        <HeaderTypography>
                            { color.year }
                        </HeaderTypography>
                    </Grid>
                    <Grid item xs={ 6 } style={{ paddingRight: 6 }} display='flex' justifyContent='flex-end'>
                        <IconButton icon={ <CancelIcon /> } onClick={ () => color.isNew ? handleRemoveColorItem() : edit() } />
                        <IconButton icon={ <CheckIcon /> } onClick={  () => color.isNew ? handleCreateColor() : handleUpdateColor() } />
                    </Grid>
                </Grid>
            </HeaderContainer>
            <BodyContainer>
                <Grid container spacing={ 2 } padding='10px'>
                    <Grid item xs={ 12 }>
                        <Input name='name' value={ editState.name } label='Name' onChange={ handleChangeState } />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <Input name='color' value={ editState.color } label='Color' onChange={ handleChangeState } />
                    </Grid>
                    <Grid item xs={ 12 }>
                        <Input name='pantone' value={ editState.pantone } label='Pantone' onChange={ handleChangeState } />
                    </Grid>
                </Grid>
            </BodyContainer>
        </BoxRoot>
    )
}

export default Color