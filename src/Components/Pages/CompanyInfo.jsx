import React from 'react'
import { BsImages } from "react-icons/bs";

function CompanyInfo() {
  return (
    <div className='py-20 bg-gray-50 h-screen'>
      <div className='flex flex-col w-11/12 mx-auto gap-10'>
        <div className='text-xl font-semibold underline'>
          Company Information
        </div>
        <div className='grid grid-cols-4 w-full'>
          {/* first grid */}
          <div className='flex flex-col '>
            <div className='text-lg font-medium'>
              Image:
            </div>
            <div className='capitalize text-sm font-medium text-gray-700'>
              (upload your branded logo here)
            </div>
          </div>

          {/* second grid */}
          <div className='flex shadow-xl p-10 flex-col gap-6 w-full col-span-3'>

            <div className='  h-fit  flex border border-gray-300 rounded-sm w-full'>
                <label htmlFor='image' className='text-7xl cursor-pointer text-gray-300 w-full'>
              <div className='h-44  flex justify-center items-center w-full'>
                  <BsImages/>
                  
              </div>
                  </label>
                <input type="file" id='image' className=' hidden ' />

            </div>
            {/* button submit */}
            <div>
              <button className='bg-cyan-700 text-white cursor-pointer uppercase text-xs   rounded-2xl px-12 py-2.5'>Submit</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
export default CompanyInfo;

