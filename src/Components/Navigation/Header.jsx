import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import SectionLayout from './SectionLayout';
function Header() {
    const underline = useLocation();
    const navArr = [
        {
            link: "/companyInfo",
            navItem: "Company Info",
        },
        {
            link: "/",
            navItem: "Home",
        }, {
            link: "/shop",
            navItem: "Shop",
        },
        //  {
        //     link: "/pages",
        //     navItem: "Pages",
        // }, 
        {
            link: "/blog",
            navItem: "Blog",
        }, {
            link: "/contact",
            navItem: "Contact",
        },
    ]
    return (
        <div className='bg-[#1F2937] w-full text-white h-full'>
            <nav className='fixed top-0 left-0 flex flex-col gap-14 py-6 px-8'>
                <div className='text-3xl flex gap-1 items-center font-bold'>
                    <span>Git</span>
                    <span className='bg-[#ffa31a] px-1 text-2xl rounded-sm text-black'>Hub</span>
                </div>

                <div className='flex flex-col gap-2 font-normal text-base'>
                    <div className='text-xl underline mb-2'>
                        Page Layout
                    </div>

                  
                    {
                        navArr.map((val, i) => {
                            return (
                                <div key={i} className='w-fit group'>
                                    <div >
                                        <div>
                                            <Link to={val.link}>{val.navItem}</Link>
                                        </div>

                                        <div className='flex justify-center'>
                                        <div className={`${val.link === underline.pathname ? "w-full" : "w-0"} transition-all duration-300 delay-75 ease-in-out bg-yellow-500  h-0.5 w-0 group-hover:w-full`}></div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>

                <div className='flex flex-col gap-4'>
                    <div className='text-xl underline'>Section Layout</div>
                    <div className='flex flex-col gap-2'>
                        <SectionLayout/>
                    </div>
                </div>
                        <button className='transition-all duration-300 delay-75 ease-in-out py-2.5 text-sm px-10 cursor-pointer rounded-3xl bg-white text-[#1F2937] font-medium hover:scale-105 hover:bg-transparent hover:text-white hover:border'>
                        Admin LogIn
                        </button>
            </nav >
        </div >
    )
}

export default Header