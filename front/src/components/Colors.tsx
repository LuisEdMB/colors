import React, { useCallback } from 'react'
import { Box, Grid, styled, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ColorComponent from './Color'
import FloatingButton from './FloatingButton'
import { useAppDispatch, useAppSelector } from '../store/store.configure'
import { addColorItem, selectColor } from '../reducers/color.reducer'

const BoxHelp = styled(Box)({
    width: '100vw',
    minHeight: 620,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
})

const HelpTypography = styled(Typography)({
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
})

const Colors: React.FC = () => {
    const { getColors } = useAppSelector(selectColor)
    const dispatch = useAppDispatch()

    const handleAddColor = useCallback(() => {
        dispatch(addColorItem())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box style={{ position: 'relative' }}>
            <Grid container spacing={ 1 }>
                {
                    getColors.isLoading && 
                        <BoxHelp><HelpTypography>Retrieving data ...</HelpTypography></BoxHelp>
                }
                {
                    (getColors.error.isError || (getColors.isSuccess && getColors.data.colors.length < 1)) && 
                        <BoxHelp><HelpTypography>No data!</HelpTypography></BoxHelp>
                }
                {
                    getColors.isSuccess && getColors.data.colors.map((color) => 
                        <Grid key={ color._id } item xs={ 12 } md={ 4 }>
                            <ColorComponent color={ color } />
                        </Grid>
                    )
                }
            </Grid>
            <FloatingButton icon={ <AddIcon /> } onClick={ handleAddColor } />
        </Box>
    )
}

export default Colors