import React from 'react'
import FetchPosts from './fetchposts'
import Addposts from './addposts'
import Fetchreportposts from './fetchreportposts'
import MainLayout from '../../src/components/layout'
import ProtectedRoute from '../../src/components/ProtectedRoute'

const postsRoute =  {
 path: '/',
     element:<ProtectedRoute><MainLayout/></ProtectedRoute>,
     children : [
         {
             path: '/posts',
             element: <FetchPosts />,
         },
         {
            path: '/addposts',
            element: <Addposts />,
         },
         {
            path : '/reports',
            element: <Fetchreportposts />,
         },
     ]
 }

export default postsRoute