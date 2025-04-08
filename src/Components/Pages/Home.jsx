import React from 'react'
import HeroHome from '../PageComponents/Home/HeroHome'
import ContainerHome from '../PageComponents/Home/ContainerHome'
import BestSellersHome from '../PageComponents/Home/BestSellersHome'
import SalesHome from '../PageComponents/Home/SaleHome'
import InstagramHome from '../PageComponents/Home/InstagramHome'
import TrendsHome from '../PageComponents/Home/TrendsHome'



function Home() {
  return (
    <div>
    
        <HeroHome/>
        <ContainerHome/>
        <BestSellersHome/>
        <SalesHome/>
        <InstagramHome/>
        <TrendsHome/>
    </div>
  )
}

export default Home