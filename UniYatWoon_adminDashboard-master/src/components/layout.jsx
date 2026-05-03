import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header.jsx'
import Sidebar from './sidebar.jsx'
import '../App.css'

const MainLayout = () => {
  return (
    <>
        <Sidebar />
        <div>
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
    </>
  )
}

export default MainLayout