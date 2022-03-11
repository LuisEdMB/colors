import { Navigate } from 'react-router-dom'
import { selectAuth } from '../reducers/auth.reducer'
import { useAppSelector } from '../store/store.configure'

type Props = {
    children: JSX.Element
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const auth = useAppSelector(selectAuth)
    return auth.authUser.isSuccess ? children : <Navigate replace to='/login' />
}

export default PrivateRoute