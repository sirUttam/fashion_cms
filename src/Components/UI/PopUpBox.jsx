import React from 'react'

function PopUpBox({stopPopUpProps, deleteProps}) {
  return (
    <div className='flex justify-center fixed top-0 left-0 z-10 rounded-lg overflow-hidden  bg-black/30 w-full h-screen items-center'>
        <div className='flex bg-white p-10 rounded-md flex-col gap-4 items-center'>
            <div className='text-lg font-medium capitalize'>are you sure you want to <span className='text-red-600'>delete</span>?</div>
            <div className='flex gap-4'>

                {/* yes */}
                <button onClick={()=>{
                    deleteProps()
                }} className='px-6 py-2 text-xs font-medium capitalize bg-[#1F2937] cursor-pointer transition-all duration-300 ease-in-out text-white rounded-sm hover:scale-105 hover:shadow-2xl'>yes</button>

                {/* no */}
                <button onClick={()=>{
                    stopPopUpProps()
                }} className='px-6 py-2 text-xs font-medium capitalize bg-[#1F2937] cursor-pointer transition-all duration-300 ease-in-out text-white rounded-sm hover:scale-105 hover:shadow-2xl'>no</button>

            </div>
        </div>
    </div>
  )
}

export default PopUpBox