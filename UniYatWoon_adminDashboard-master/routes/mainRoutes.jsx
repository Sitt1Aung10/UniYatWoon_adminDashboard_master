import Layout from '.././src/components/layout';
import ProtectedRoute from '.././src/components/ProtectedRoute';
import Dashboard from '../pages/Dashboard/dashboard';
import Users from '../pages/Users/users';
import Profile from '../pages/Users/profile';
import { Navigate } from 'react-router-dom';

const MainRoutes = {
    path: '/',
    element:<ProtectedRoute><Layout/></ProtectedRoute>,
    children : [
         {
            path: '/',
            element: <Navigate to="/users" replace />
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
        },
        {
            path: '/profile/:user_uuid',
            element: <Profile />,
        }
    ]
}

export default MainRoutes;