import React from 'react'
import { Button as ButtonMaterial, CircularProgress } from '@mui/material'

type Props = {
    label: string,
    disabled?: boolean,
    showLoading?: boolean,
    color?: any,
    variant?: any,
    fullWidth?: boolean,
    onClick: () => void
}

const Button: React.FC<Props> = ({
    label, 
    disabled, 
    color = 'primary', 
    variant = 'contained', 
    fullWidth = false, 
    showLoading, 
    onClick }) => {
        return <ButtonMaterial color={ color } variant={ variant } fullWidth={ fullWidth } onClick={ onClick } disabled={ disabled }>
            { label }
            { disabled && showLoading && <CircularProgress size={ 24 } style={{ marginLeft: 10 }} /> }
        </ButtonMaterial>
}

export default Button