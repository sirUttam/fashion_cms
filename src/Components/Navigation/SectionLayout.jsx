import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function SectionLayout() {
    const location = useLocation()
    const locationPath = location.pathname
    const TablesArr = [
        {
            name: "Hero Home Table", link: "/herohometable"
        }, {
            name: "Container Home Table", link: "/containerhometable"
        }, {
            name: "BestSeller Home Table", link: "/bestsellerhometable"
        }, {
            name: "Instagram Home Table", link: "/instagramhometable"
        }, {
            name: "Trend Home Table", link: "/trendhometable"
        },
    ]
  return (
    <div className='flex flex-col gap-2'>
        {
            TablesArr.map((val,i)=>{
                return(
                    <div key={i}>
                        <div className='group w-fit'>
                            <div className=''>
                            <Link className={` translate-full duration-500 ease-in-out ${val.link === locationPath ? "font-bold text-lg" : ""} `} to= {val.link}>
                            {val.name}
                            </Link>
                        </div>
                        <div className={`bg-amber-500 w-0 h-1 transition-all ease-in-out duration-500 group-hover:w-full ${val.link === locationPath ? "w-full" : "w-0"} `}></div>
                        </div>
                    </div>
                )
            })
        }
        
        {/* <TableHeroHome/>
        <TableContainerHome/>
        <BestSellerHomeTable/>
        <InstagramHomeTable/>
        <TrendHomeTable/> */}
    </div>
  )
}

export default SectionLayout