import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import PopUpBox from '../UI/PopUpBox'

function TrendHomeTable() {
    const [deleteid, setDeleteid] = useState()
    const [popTrend, setPopTrend] = useState(false)
    const [trendHome, setTrendHome] = useState([])
    // const [deleteTrend, setdeleteTrend] = useState(second)

    const getData = () => {
        try {
            axios.get('https://fashion-backend-4y4z.vercel.app/homefashion').then(res => {
                // console.log(res)
                setTrendHome([...res.data])
            }).catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const deleteData = () =>{
        try {
            axios.delete(`https://fashion-backend-4y4z.vercel.app/homefashion/${deleteid}`).then((res)=>{
                console.log(res);
                setPopTrend(false)
                getData()
                
            }).catch((err)=>{
                console.log(err);
                
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
      getData()
    }, [])
    

    const data = [
        { title: "ID" },
        { title: "imagetitle" },
        { title: "imagedate" },
        { title: "image" },
        { title: "Action" },

    ]
    return (
        <div className='flex flex-col items-center pt-20 gap-4'>
            {
               popTrend && <PopUpBox deleteProps={()=>deleteData()} stopPopUpProps = {()=>{setPopTrend(false)}} />
            }
            <div className='text-xl font-semibold capitalize underline'>
                Trend Home Table
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
                        trendHome.map((val,i)=>{
                            return(

                    <tr key={i} className='text-center border-2 border-black'>
                        <td className='py-4 px-4 border-2 border-black'>{val.id}</td>
                        <td className='py-4 border-2 w-52 border-black'>{val.imagetitle}</td>
                        <td  className='py-4 w-60 border-2 border-black'>{val.imagedate}</td>
                        <td  className='py-4 w-60 border-2 border-black'>
                            <img className='h-20 w-auto object-contain' src={val.imageid.imageUrl} />
                        </td>
                        <td  className='py-4 flex gap-2 items-center justify-center'>

                            {/* edit button */}
                            <button 
                            onClick={()=>{

                            }}
                            className='bg-[#1F2937] text-white w-fit uppercase text-sm px-10 font-medium transition-all ease-in-out duration-300 py-2 rounded-lg cursor-pointer hover:shadow-md hover:scale-105'>edit</button>

                            {/* delete button */}
                            <button 
                            onClick={()=>{
                                setDeleteid(val.id)
                                setPopTrend(true)
                            }}
                            className='bg-[#1F2937] text-white w-fit uppercase text-sm px-8 font-medium transition-all ease-in-out duration-300 py-2 rounded-lg cursor-pointer hover:shadow-md hover:scale-105'>delete</button>

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

export default TrendHomeTable