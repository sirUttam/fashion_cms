import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PopUpBox from '../UI/PopUpBox'
import PopUpEditContainerHome from '../../Components/UI/PopUpEditContainerHome'

function TableContainerHome() {
    const [editContainer, seteditContainer] = useState(false)
    const [containerHome, setContainerHome] = useState([])
    const [popupcontainer, setpopupcontainer] = useState(false)
    const [deleteid, setDeleteid] = useState(null)
    const [valState, setvalState] = useState(null)

    const getData = () => {
        try {

            axios.get('http://localhost:3000/homecontainer').then((res) => {
                console.log(res);
                setContainerHome([...res.data])
            }).catch((err) => {
                console.log(err)
            })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const DeleteData = () => {
        try {

            axios.delete(`http://localhost:3000/homecontainer/${deleteid}`).then((res) => {
                setpopupcontainer(false)
                getData()
            }).catch((err) => {
                console.log(err)
            })

        } catch (error) {
            console.log(error)
        }
    }

    const data = [
        { title: "ID" },
        { title: "title" },
        { title: "image" },
        { title: "action" },


    ]
    return (
        <div className='flex flex-col items-center pt-20 gap-4'>
            { editContainer && <PopUpEditContainerHome cancelContainer={()=>{ seteditContainer(false) }} prevdata={valState} getDataAgain={()=>{getData()}} /> }
            {popupcontainer && <PopUpBox stopPopUpProps={() => { setpopupcontainer(false) }} deleteProps={() => DeleteData()}

            />}
            <div className='text-xl font-semibold capitalize underline'>
                ContainerHome Table
            </div>
            <table className='border-2 border-black w-10/12 mx-auto'>
                <thead>
                    <tr className='border text-center font-semibold capitalize border-black'>
                        {
                            data.map((val, i) => {
                                return <td className='py-6 border-2 bg-[#1F2937]  border-none text-white' key={i}>{val.title}</td>
                            })
                        }
                    </tr>
                </thead>
                <tbody className=''>

                    {
                        containerHome.map((val, i) => {
                            return (
                                <tr key={i} className='text-center  border-b border-black'>
                                    <td className='px-4 border-2 border-black'>{val.id}</td>
                                    <td className='py-4 border-2 w-80 border-black'>{val.title}</td>
                                    <td width={300} className='py-4 border-2 border-black'>
                                        {val.imageid?.imageUrl ? <img className='h-20 w-auto object-contain' src={val.imageid.imageUrl} /> : "-"}
                                    </td>
                                    <td className='py-4  flex justify-center gap-4 items-center '>

                                        {/* edit button */}
                                        <button 
                                        onClick={()=>{
                                            setvalState(val)
                                            seteditContainer(true)
                                        }}
                                        className='bg-[#1F2937] text-white uppercase text-sm px-10 font-medium transition-all ease-in-out duration-300 py-2 rounded-lg cursor-pointer hover:shadow-md hover:scale-105'>edit</button>

                                        {/* delete button */}
                                        <button onClick={() => {
                                            setDeleteid(val.id)
                                            setpopupcontainer(true)
                                        }} className='bg-[#1F2937] text-white uppercase text-sm px-8 font-medium transition-all ease-in-out duration-300 py-2 rounded-lg cursor-pointer hover:shadow-md hover:scale-105'>delete</button>
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

export default TableContainerHome