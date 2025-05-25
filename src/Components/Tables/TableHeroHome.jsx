import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import PopUpBox from '../UI/PopUpBox'
import PopUpBoxEditHero from '../UI/PopUpBoxEditHero'

function TableHeroHome({}) {
    const [editOption, setEditOption] = useState(false)
    const [HeroHome, setHeroHome] = useState([])
    const [popup, setpopup] = useState(false)
    const [deleteid, setdeleteid] = useState(null)
    const [valHero, setvalHero] = useState(null)
    
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


    const data = [
        { title: "S.N" },
        { title: "title" },
        { title: "subtitle" },
        { title: "description" },
        { title: "image" },
        { title: "Action" },

    ]


        const DeleteData = () => {
        try {
            axios.delete(`http://localhost:3000/homeherosection/${deleteid}`).then(res => {
                // console.log(res)
                // setHeroHome([...res.data])
                setpopup(false)
                getData()
            }).catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex flex-col items-center gap-4'>
            { editOption && <PopUpBoxEditHero cancelButton ={()=>{setEditOption(false)}} prevDataHero={valHero} getData={()=>getData()} /> }
           {popup && <PopUpBox stopPopUpProps={()=>setpopup(false)}  deleteProps={()=>DeleteData()} />}

            <div className='text-xl font-semibold capitalize underline'>
                HeroHome Table
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
                        HeroHome.map((val, i) => {
                            return (

                                <tr key={i} className='text-center border-b-2 border-black'>
                                    <td className='py-4 px-4 border-2 border-black'>{val.id}</td>
                                    <td className='py-4 border-2 border-black'>{val.title}</td>
                                    <td className='py-4 border-2 border-black'>{val.subtitle}</td>
                                    <td className='py-4 border-2 border-black'>{val.description}</td>
                                    <td className='py-4 border-2 border-black'>
                                        { val.imageid?.imageUrl? <img className='h-20 w-auto object-contain' src={val.imageid.imageUrl} /> : "-" }
                                    </td>
                                    <td className='py-4 flex gap-2 justify-center items-center'>

                                        {/* edit button */}
                                        <button
                                        onClick={()=>{
                                            setvalHero(val)
                                            setEditOption(true)}
                                        }
                                         className='bg-[#1F2937] text-white w-fit uppercase text-sm px-10 font-medium transition-all ease-in-out duration-300 py-2 rounded-lg cursor-pointer hover:shadow-md hover:scale-105'>edit</button>

                                        {/* delete button */}
                                        <button className='bg-[#1F2937] text-white w-fit uppercase text-sm px-8 font-medium transition-all ease-in-out duration-300 py-2 rounded-lg cursor-pointer hover:shadow-md hover:scale-105' 
                                        onClick={()=>{
                                            setdeleteid(val.id)
                                            setpopup(true)
                                        }}>delete</button>

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

export default TableHeroHome