import React from 'react'
import IconButtonMaterial from '@mui/material/IconButton'

type Props = {
    icon: JSX.Element,
    onClick: () => void
}

const IconButton: React.FC<Props> = ({ icon, onClick }) => {
    return (
        <IconButtonMaterial size='small' onClick={ onClick }>
            { icon }
        </IconButtonMaterial>
    )
}

export default IconButton