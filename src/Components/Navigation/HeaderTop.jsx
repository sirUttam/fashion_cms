import React, { useState } from 'react'
import { LuMessageSquare } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { CgDarkMode } from "react-icons/cg";

function HeaderTop() {
  const logout = [
    {
      name: "Profile", icon: <IoPersonSharp />
    }, {
      name: "Mode", icon: <CgDarkMode />
    }, {
      name: "Log Out", icon: <RiLogoutBoxRLine />
    },
  ]
  const [dropDown, setDropDown] = useState(false)
  return (
    <div className='fixed top-0 left-0 w-full z-10 bg-[#1F2937] text-white py-4'>
      <div className='flex justify-end items-center gap-8 w-10/12 mx-auto'>
        <div className='text-3xl cursor-pointer'>
          <LuMessageSquare />
        </div>
        <div
          onClick={() => {
            setDropDown(!dropDown)
          }}
          className='bg-white text-lg h-9 w-9 rounded-full flex justify-center items-center font-semibold cursor-pointer uppercase text-cyan-800'>
          <IoPersonSharp/>
        </div>

      </div>
      {
        dropDown && (
          <div className='fixed top-17 right-10 p-4 h-fit w-60 bg-[#FFA31A] rounded-bl-sm rounded-br-sm text-black'>
            <div className='flex flex-col gap-2'>
              {
              logout.map((val, i) => {
                return (
                  <div key={i}>
            <div className='flex cursor-pointer items-center gap-1'>
              <div className='text-xl'>{val.icon}</div>
              <div className='font-semibold'>{val.name}</div>
            </div>
                  </div>
                )
              })
            }
            </div>


          </div>
        )
      }
    </div>
  )
}

export default HeaderTop