import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeRoutes from './themeRoutes';

const Menu = () => {
  return (
   <Router>
     <ThemeRoutes/>
    </Router>
  )
}

export default Menu