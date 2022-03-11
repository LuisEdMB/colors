import { Box, Grid } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authUser, selectAuth } from '../reducers/auth.reducer'
import { useAppDispatch, useAppSelector } from '../store/store.configure'
import { User as UserType } from '../types/User'
import Button from './Button'
import Input from './Input'

const FormLogin: React.FC = () => {
    const auth = useAppSelector(selectAuth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        auth.authUser.isSuccess && navigate('/color')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.authUser])

    const [ user, setUser ] = useState<UserType>({
        username: '',
        password: ''
    })

    const handleChange = useCallback((e) => {
        const { name, value } = e.target
        setUser(s => ({
            ...s,
            [name]: value
        }))
    }, [])

    const handleLogin = useCallback(() => {
        dispatch(authUser(user))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <Box margin={ 3 }>
            <Grid container spacing={ 2 }>
                <Grid item xs={ 12 }>
                    <Input
                        name='username' 
                        label='Username' 
                        value={ user.username } 
                        onChange={ handleChange } 
                        disabled={ auth.authUser.isLoading } />
                </Grid>
                <Grid item xs={ 12 }>
                    <Input 
                        name='password' 
                        label='Password' 
                        type='password' 
                        value={ user.password } 
                        onChange={ handleChange } 
                        disabled={ auth.authUser.isLoading } />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 }>
                    <Button 
                        label='Login' 
                        onClick={ handleLogin } 
                        fullWidth 
                        disabled={ auth.authUser.isLoading } 
                        showLoading />
                </Grid>
            </Grid>
        </Box>
    )
}

export default FormLogin