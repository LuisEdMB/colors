import React, { useCallback, useEffect, useState } from 'react'
import { Box, Grid, styled, Typography } from '@mui/material'
import ColorsComponent from '../components/Colors'
import Button from '../components/Button'
import { useAppDispatch, useAppSelector } from '../store/store.configure'
import { getColors, selectColor } from '../reducers/color.reducer'

const BoxRoot = styled(Box)({
    padding: 5
})

const TitleHeader = styled(Typography)({
    border: '1px solid black',
    borderRadius: 10,
    textAlign: 'center'
})

const BodyContainer = styled(Box)({
    margin: '8px 0 8px 0',
    minHeight: 620
})

const FooterContainer = styled(Box)({
    border: '1px solid black',
    borderRadius: 10
})

const ColorPage: React.FC = () => {
    const data = useAppSelector(selectColor)
    const dispatch = useAppDispatch()
    const [ currentPage, setCurrentPage ] = useState<number>(data.getColors.data?.currentPage ?? 0)

    useEffect(() => {
        dispatch(getColors(currentPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    useEffect(() => {
        (data.createColor.isSuccess || 
        data.updateColor.isSuccess || 
        data.deleteColor.isSuccess) &&
        dispatch(getColors(currentPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.createColor.isSuccess, data.updateColor.isSuccess, data.deleteColor.isSuccess])

    const handleNextPage = useCallback(() => {
        setCurrentPage(currentPage + 1)
    }, [currentPage])

    const handlePrevPage = useCallback(() => {
        setCurrentPage(currentPage - 1)
    }, [currentPage])

    return (
        <BoxRoot>
            <TitleHeader variant='h4'>
                <strong style={{ color: "#000" }}>Colores</strong>
            </TitleHeader>
            <BodyContainer>
                <ColorsComponent />
            </BodyContainer>
            <FooterContainer>
                <Grid container>
                    <Grid item xs={ 6 }>
                        <Button 
                            label='< Anterior' 
                            color='inherit' 
                            disabled={ data.getColors.isLoading || (currentPage + 1) === 1 } 
                            variant='text' 
                            onClick={ handlePrevPage } />
                    </Grid>
                    <Grid item xs={ 6 } display='flex' justifyContent='flex-end'>
                        <Button 
                            label='Siguiente >' 
                            color='inherit' 
                            disabled={ data.getColors.isLoading || (currentPage + 1) === data.getColors.data?.numberPages } 
                            variant='text' 
                            onClick={ handleNextPage }/>
                    </Grid>
                </Grid>
            </FooterContainer>
        </BoxRoot>
    )
}

export default ColorPage