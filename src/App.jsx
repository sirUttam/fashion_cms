import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Components/HOC/Layout'
import Home from '../src/Components/Pages/Home'
import Shop from '../src/Components/Pages/Shop'
// import Pages from '../src/Components/Pages/Pages'
import Blog from '../src/Components/Pages/Blog'
import Contact from '../src/Components/Pages/Contact'
import CompanyInfo from './Components/Pages/CompanyInfo'
import Login from './Components/Pages/Login'
import ProtectedRoute from './Components/Pages/ProtectedRoute'
import TrendHomeTable from './Components/Tables/TrendHomeTable'
import TableHeroHome from './Components/Tables/TableHeroHome'
import TableContainerHome from './Components/Tables/TableContainerHome'
import BestSellerHomeTable from './Components/Tables/BestSellerHomeTable'
import InstagramHomeTable from './Components/Tables/InstagramHomeTable'
import ViewHeroHome from './Components/UI/ViewHeroHome'
import CreateContextAPi from './Components/HOC/Context Api/CreateContext'

function App() {
  return (
    <div>
      <div>
        <Routes>
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path='/login' element={<Login />} />

            <Route element={<Layout />}>
              <Route path='/companyInfo' element={<CompanyInfo />} />
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              {/* <Route path='/pages' element={<Pages />} /> */}
              <Route path='/blog' element={<Blog />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/herohometable' element={<TableHeroHome/>} />
              <Route path='/herohometable/:id' element={<CreateContextAPi>
<ViewHeroHome />
                </CreateContextAPi>} />

              <Route path='/containerhometable' element={<TableContainerHome/>} />
              <Route path='/bestsellerhometable' element={<BestSellerHomeTable/>} />
              <Route path='/instagramhometable' element={<InstagramHomeTable/>} />
              <Route path='/trendhometable' element={<TrendHomeTable/>} />




            </Route>
          {/* </Route> */}
          

        </Routes>
      </div>
    </div>
  )
}

export default App