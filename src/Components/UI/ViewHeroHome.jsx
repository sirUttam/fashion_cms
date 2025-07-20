import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { IoArrowBackCircle } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import PopUpBox from './PopUpBox';
import PopUpBoxEditHero from './PopUpBoxEditHero';
import { HeroHomeContext } from '../HOC/Context Api/CreateContext';


function ViewHeroHome({  }) {
  const location = useLocation()
  const params = useParams()
  const navaigate = useNavigate()
  console.log(location, params)
  const [data, setdata] = useState()
  const [deletePop, setDeletePop] = useState()
  const [editPop, setEditPop] = useState()


  const {DeleteData}=useContext(HeroHomeContext)
  // console.log(dasts,"herererer")

  const getData = () => {
    try {
      axios.get(`https://fashion-backend-4y4z.vercel.app/homeherosection/${params.id}`).then(res => {
        console.log(res)
        setdata([...res.data])
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

  return (
    <div className='flex justify-center items-center  w-full '>
      {
        data && data.map((val, i) => {
          return <div className='flex flex-col bg-white px-6 py-10 w-10/12 mx-auto ] gap-2'>
            {
              deletePop && <PopUpBox stopPopUpProps={()=>setDeletePop(false)} deleteProps={()=>DeleteData(params.id,setDeletePop)}  />
            }
            {
              editPop && <PopUpBoxEditHero prevDataHero={val}/>
            }
            <div className='uppercase text-lg mb-10 text-center underline'>
              Hero Home View
            </div>
            <div className='flex justify-between'>
              <div className='font-semibold text-lg'>
                ID:{val.id}
              </div>

              {/* icons */}
              <div className='flex gap-4 mr-20 '>
                {/* go back icon */}
                <div
                onClick={() => {
                  navaigate(-1)
                  // stopView()
                }}
                className='text-2xl opacity-70 cursor-pointer'><IoArrowBackCircle /></div>

                {/* edit icon */}
                <div 
                onClick={()=>{
                  setEditPop(true)
                }}
                className='text-2xl opacity-70 cursor-pointer'><CiEdit /></div>

                {/* delete icon */}
                <div 
                onClick={()=>{
                  setDeletePop(true)
                }}
                className='text-2xl opacity-70 cursor-pointer'><RiDeleteBin5Line /></div>
              </div>
            </div>
            <div className='text-xl font-bold'>
              {val.title}
            </div>
            <div className='text-lg font-medium'>
              {val.subtitle}
            </div>
            <div className='text-base'>
              <div dangerouslySetInnerHTML={{ __html: val.description }} />
            </div>
            <div>
              <img src={val?.imageid?.imageUrl} />
            </div>
          </div>
        })

      }
    </div>
  )
}

export default ViewHeroHome