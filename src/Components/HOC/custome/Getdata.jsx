import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Getdata(url) {
    // console.log(url,"hdsds")
       const [HeroHome, setHeroHome] = useState([])

      const getData = () => {
            try {
                axios.get(`https://fashion-backend-4y4z.vercel.app/${url}`).then(res => {
                    // console.log(res)
                    setHeroHome([...res.data])
                }).catch(err => {
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
    
        useEffect(() => {
            getData()
        }, [])

  return HeroHome
}

export default Getdata