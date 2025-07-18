import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Getdata from '../custome/Getdata';
import DeleteReq from '../custome/DeleteReq';

export const HeroHomeContext=createContext()

function CreateContextAPi({children}) {
       const navigate = useNavigate();

        const datas=Getdata('homeherosection')
        console.log(datas)

        const delData =(deleteid,setpopup) => DeleteReq(`homeherosection/${deleteid}`,setpopup)
      
        // we need delete for both delete in table and delete in view icon. So delete function is implemented here to pass it in two components instead of writing in both
        

  return (
    <HeroHomeContext.Provider value={{ delData , HeroHome:datas }}>
        {children}
    </HeroHomeContext.Provider>
  )
}

export default CreateContextAPi