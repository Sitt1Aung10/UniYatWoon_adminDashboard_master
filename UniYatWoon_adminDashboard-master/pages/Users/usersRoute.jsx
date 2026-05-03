import React from 'react'
import Users from './users'
import Profile from './profile'
import MainLayout from '../../src/components/layout'
import ProtectedRoute from '../../src/components/ProtectedRoute'

const usersRoute = {
 path: '/',
    element:<ProtectedRoute><MainLayout/></ProtectedRoute>,
    children : [
        {
            path: '/users',
            element: <Users />,
        },
        {
            path: '/profile',
            element: <Profile />,
        }
    ]
}

export default usersRoute