import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const HeroHomeContext=createContext()

function CreateContextAPi({children}) {
       const [HeroHome, setHeroHome] = useState([])
       const navigate = useNavigate();
        
        const getData = () => {
            try {
                axios.get('http://localhost:3000/homeherosection').then(res => {
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
        const DeleteData = (deleteid,setpopup) => {
        try {
            axios.delete(`http://localhost:3000/homeherosection/${deleteid}`).then(res => {
                console.log(res)
                // setHeroHome([...res.data])
                // setpopup(false)
                navigate('/herohometable')
                getData()
            }).catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <HeroHomeContext.Provider value={{DeleteData,HeroHome,name:'here'}}>
        {children}
    </HeroHomeContext.Provider>
  )
}

export default CreateContextAPi