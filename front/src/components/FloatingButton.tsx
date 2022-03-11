import { Fab, styled } from '@mui/material'
import React from 'react'

type Props = {
    icon: JSX.Element,
    onClick: () => void
}

const FabButton = styled(Fab)({
    position: 'fixed',
    top: 7,
    right: 16
})

const FloatingButton: React.FC<Props> = ({ icon, onClick }) => {
    return (
        <FabButton color='primary' size='small' onClick={ onClick }>
            { icon }
        </FabButton>
    )
}

export default FloatingButton