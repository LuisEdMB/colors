import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import FormLogin from '../components/FormLogin'

const BoxRoot = styled(Box)({
    display: 'flex',
    justifyContent: 'center'
})

const SubBoxRoot = styled(Box)({
    maxWidth: '450px'
})

const Title = styled(Typography)({
    textAlign: 'center'
})

const LoginPage: React.FC = () => {
    return (
        <BoxRoot paddingTop={ 8 }>
            <SubBoxRoot>
                <Title variant='h4'>
                    <strong style={{ color: "#000" }}>Login</strong>
                </Title>
                <FormLogin/>
            </SubBoxRoot>
        </BoxRoot>
    )
}

export default LoginPage