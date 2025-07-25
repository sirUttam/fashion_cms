import React from 'react'
import Header from '../Navigation/Header'
import { Outlet } from 'react-router-dom'
import HeaderTop from '../Navigation/HeaderTop'

function Layout() {
  return (
    <div className=' h-screen overflow-clip'>
      <div className='grid grid-cols-12 h-full'>
        <div className='col-span-2'>
          <Header />
        </div>



        <div className='col-span-10 h-screen overflow-y-scroll mb-44 bg-gray-100'>
          <div className=''>
            <HeaderTop />
          </div>
          <div className='py-8 pb-44'>
          <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout