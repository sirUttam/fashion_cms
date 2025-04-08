import React from 'react'
import { LuMessageSquare } from "react-icons/lu";

function HeaderTop() {
  return (
    <div className='fixed top-0 left-0 w-full z-10 bg-[#1F2937] text-white py-4'>
        <div className='flex justify-end items-center gap-8 w-10/12 mx-auto'>
            <div className='text-3xl cursor-pointer'>
                <LuMessageSquare/>
            </div>
            <div className='bg-white text-lg h-9 w-9 rounded-full flex justify-center items-center font-semibold cursor-pointer uppercase text-cyan-800'>
                GH
            </div>
        </div>
    </div>
  )
}

export default HeaderTop