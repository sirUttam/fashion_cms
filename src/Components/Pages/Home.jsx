import React from 'react'
import HeroHome from '../PageComponents/Home/HeroHome'
import ContainerHome from '../PageComponents/Home/ContainerHome'
import BestSellersHome from '../PageComponents/Home/BestSellersHome'
import InstagramHome from '../PageComponents/Home/InstagramHome'
import TrendsHome from '../PageComponents/Home/TrendsHome'

function Home() {
  return (
    <div>
        <HeroHome/>
        <ContainerHome/>
        <BestSellersHome/>
        <InstagramHome/>
        <TrendsHome/>
    </div>
  )
}

export default Home