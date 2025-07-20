import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import PopUpBox from '../UI/PopUpBox'
import PopUpEditContainerHome from '../../Components/UI/PopUpBestSellerEdit'

function BestSellerHomeTable() {
    const [bestSeller, setBestSeller] = useState([])
    const [popupbestseller, setpopupbestseller] = useState(false)
    const [deleteId, setdeleteId] = useState()
    const [editBestSeller, setEditBestSeller] = useState(false)
    const [valBestSeller, setValBestSeller] = useState(null)

    const getData = () => {
        try {
            axios.get('https://fashion-backend-4y4z.vercel.app/homebestseller').then(res => {
                // console.log(res)
                setBestSeller([...res.data])
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
    

    const data = [
        { title: "ID" },
        { title: "title" },
        { title: "price" },
        { title: "image" },
        { title: "Action" },

    ]

     const DeleteData = () => {
        try {
            axios.delete(`https://fashion-backend-4y4z.vercel.app/homebestseller/${deleteId}`).then(res => {
                setpopupbestseller(false)
                getData()
            }).catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='flex flex-col items-center pt-20 gap-4'>
            { editBestSeller && <PopUpEditContainerHome cancelBestSeller={()=>{setEditBestSeller(false)}} prevDataBestSeller={valBestSeller} getDataAgain={()=>{getData()}} /> }
            {popupbestseller && <PopUpBox stopPopUpProps={()=>{setpopupbestseller(false)}} deleteProps={()=>{DeleteData()}} />}
            <div className='text-xl font-semibold capitalize underline'>
                BestSeller Home Table
            </div>
            <table className='border border-black w-10/12 mx-auto'>
                <thead>
                    <tr className='border text-center font-semibold capitalize border-black'>
                        {
                            data.map((val, i) => {
                                return <td className='py-6 border-2 bg-[#1F2937] border-black text-white' key={i}>{val.title}</td>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        bestSeller.map((val,i)=>{
                            return(

                    <tr key={i} className='text-center border-2 border-black'>
                        <td className='py-4 px-6 border-2 border-black'>{val.id}</td>
                        <td className='py-4 border-2 w-60 border-black'>{val.title}</td>
                        <td  className='py-4 border-2 w-40 border-black'>{val.price}</td>
                        <td  className='py-4 w-70 border-2 border-black'>
                            <img className='h-20 w-auto object-contain' src={val.imageid.imageUrl} />
                        </td>
                        <td  className='py-4 flex gap-2 justify-center items-center'>

                            {/* edit  button */}
                            <button 
                            onClick={()=>{
                                // console.log(val)
                                setValBestSeller(val)
                                setEditBestSeller(true)
                            }}
                            className='bg-[#1F2937] text-white w-fit uppercase text-sm px-10 font-medium transition-all ease-in-out duration-300 py-2 rounded-lg cursor-pointer hover:shadow-md hover:scale-105'>edit</button>

                            {/* delete button */}
                            <button onClick={()=>{
                                setpopupbestseller(true)
                                setdeleteId(val.id)
                            }} className='bg-[#1F2937] text-white w-fit uppercase text-sm px-8 font-medium transition-all ease-in-out duration-300 py-2 rounded-lg cursor-pointer hover:shadow-md hover:scale-105'>delete</button>

                        </td>

                    </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default BestSellerHomeTable