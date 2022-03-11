import { TextField } from '@mui/material'
import React from 'react'

type Props = {
    name: string,
    label: string,
    type?: string,
    value: any,
    disabled?: boolean,
    onChange: (e: any) => void
}

const Input: React.FC<Props> = ({
    name, 
    label, 
    type = 'text', 
    value, 
    disabled, 
    onChange }) => {
    return <TextField 
        type={ type } 
        name={ name } 
        label={ label } 
        variant='outlined' 
        fullWidth 
        value={ value} 
        onChange={ onChange } 
        disabled={ disabled } />
}

export default Input