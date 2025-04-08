import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Components/HOC/Layout'
import Home from '../src/Components/Pages/Home'
import Shop from '../src/Components/Pages/Shop'
import Pages from '../src/Components/Pages/Pages'
import Blog from '../src/Components/Pages/Blog'
import Contact from '../src/Components/Pages/Contact'
import CompanyInfo from './Components/Pages/CompanyInfo'
import Login from './Components/Pages/Login'
import ProtectedRoute from './Components/Pages/ProtectedRoute'

function App() {
  return (
    <div>
      <div>
        <Routes>
          {/* <Route element={<ProtectedRoute />}> */}

            <Route element={<Layout />}>
              <Route path='/companyInfo' element={<CompanyInfo />} />
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/pages' element={<Pages />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/contact' element={<Contact />} />

            </Route>
          {/* </Route> */}
          
          <Route path='/login' element={<Login />} />

        </Routes>
      </div>
    </div>
  )
}

export default App