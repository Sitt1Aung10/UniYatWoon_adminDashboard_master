import React from 'react';
import { useRoutes } from 'react-router-dom';
import MainRoutes from './mainRoutes.jsx';
import usersRoute from '../pages/Users/usersRoute.jsx';
import postsRoute from '../pages/Posts/postsRoute.jsx';
import loginRoutes from '../pages/Login/loginRoutes.jsx';

export default function ThemeRoutes  ()  {
  return useRoutes([
    MainRoutes,
    usersRoute,
    postsRoute,
    loginRoutes
  ]);
}

