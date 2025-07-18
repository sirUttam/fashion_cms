import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import PopUpBox from '../UI/PopUpBox'
import PopUpBoxEditHero from '../UI/PopUpBoxEditHero'
// import ViewHeroHome from '../UI/ViewHeroHome'
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { MdPreview } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import CreateContextAPi, { HeroHomeContext } from '../HOC/Context Api/CreateContext'


function TableHeroHome() {
    const [editOption, setEditOption] = useState(false)
    const [popup, setpopup] = useState(false)
    const [deleteid, setdeleteid] = useState(null)
    const [valHero, setvalHero] = useState(null)
    // const [View, setView] = useState(false)
    const navigate = useNavigate()



    const data = [
        { title: "ID" },
        { title: "title" },
        { title: "subtitle" },
        { title: "description" },
        { title: "image" },
        { title: "Action" },

    ]


    return (
        <div>
            <CreateContextAPi>
                <HeroHomeContext.Consumer>

                    {({ delData, HeroHome }) => {
                        return <div className='flex flex-col items-center pt-20 gap-4'>

                            {/* this is for editing */}
                            {editOption && <PopUpBoxEditHero cancelButton={() => { setEditOption(false) }} prevDataHero={valHero} getData={() => getData()} />}

                            {/* this popups when clicked in delete icon in table and has yes and no for deleting */}
                            {popup && <PopUpBox stopPopUpProps={() => setpopup(false)} deleteProps={() => delData(deleteid, setpopup(false))} />}

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
                                                    <td className='py-4 border-2 border-black'>
                                                        <div dangerouslySetInnerHTML={{ __html: val.description }} className=' line-clamp-6 w-64' />
                                                    </td>
                                                    <td className='py-4 border-2 border-black'>
                                                        {val.imageid?.imageUrl ? <img className='h-20 w-auto object-contain' src={val.imageid.imageUrl} /> : "-"}
                                                    </td>
                                                    <td className='py-4 px-2 flex justify-center items-center gap-2'>

                                                        {/* edit button */}
                                                        <button
                                                            onClick={() => {
                                                                setvalHero(val)
                                                                setEditOption(true)
                                                            }
                                                            }
                                                            className='bg-[#1F2937] text-white w-fit uppercase text-sm px-3 font-medium transition-all ease-in-out duration-300 py-2 rounded-lg cursor-pointer hover:shadow-md hover:scale-105'><CiEdit /></button>

                                                        {/* delete button */}
                                                        <button className='bg-[#1F2937] text-white w-fit uppercase text-sm px-3 font-medium transition-all ease-in-out duration-300 py-2 rounded-lg cursor-pointer hover:shadow-md hover:scale-105'
                                                            onClick={() => {
                                                                setdeleteid(val.id)
                                                                setpopup(true)
                                                            }}><RiDeleteBin5Line /></button>

                                                        {/* view button */}
                                                        <button
                                                            onClick={() => {
                                                                navigate({
                                                                    pathname: `/herohometable/${val.id}`,
                                                                    search: val.title,
                                                                    hash: val.subtitle

                                                                })
                                                            }}
                                                            className='bg-[#1F2937] text-white w-fit uppercase text-sm px-3 font-medium transition-all ease-in-out duration-300 py-2 rounded-lg cursor-pointer hover:shadow-md hover:scale-105'
                                                        ><MdPreview /></button>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    }}
                </HeroHomeContext.Consumer>
            </CreateContextAPi>
        </div>
    )
}

export default TableHeroHome