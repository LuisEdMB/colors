import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import LoginPage from '../pages/LoginPage'
import ColorPage from '../pages/ColorPage'
import NotFoundPage from '../pages/NotFoundPage'
import PrivateRoute from './PrivateRoute'

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={ <Navigate replace to='/login'/> } />
                <Route path='/login' element={ <LoginPage/> } />
                <Route path='/color' element={
                    <PrivateRoute>
                        <ColorPage/>
                    </PrivateRoute>
                } />
                <Route path='*' element={ <NotFoundPage/> } />
            </Routes>
        </Router>
    )
}

export default App