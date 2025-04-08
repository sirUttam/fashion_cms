import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react'
import { BsImages } from "react-icons/bs";
import * as yup from 'yup';

const schema =  yup.object().shape({
    title: yup.string().min(4, "Input at least 4 characters").required("This field is required")
})

function HeroHome() {

    const gethomecontainer = () => {
        try {
            axios.get('http://localhost:3000/homecontainer').then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    // const uploadfile=()=>{
    //    try {
    //     axios.post('http://localhost:3000/fileupload',values).then(res=>{
    //         console.log(res)

    //     }).catch(err=>{
    //         console.log(err)
    //     })
    //    } catch (error) {
    //     console.log(error)
    //    }
    // }


    // useEffect(() => {
    //     gethomecontainer()
    // }, [])
    

    return (
        <div className='h-fit py-10'>
            <div className='w-11/12 mx-auto'>

                <div className='grid grid-cols-4'>
                    {/* first grid */}
                    <div className='flex flex-col'>
                        <div className='underline capitalize font-medium text-lg'>
                            Home Container Section
                        </div>
                        <div className='w-4/5 text-gray-700 text-sm font-semibold'>
                            (Enter the title and image for home container section.)
                        </div>
                    </div>

                    {/* second grid */}
                    <div className='col-span-3 w-full h-full pt-4 pb-14 rounded-sm shadow-xl'>
                    <Formik
                    initialValues={{
                        title: "",
                        image: ""
                    }}
                    validationSchema={schema}
                    onSubmit={(values, {resetForm})=>{
                       try {
                        axios.post('http://localhost:3000/homecontainer',values).then(res=>{
                            console.log(res);
                            resetForm()
                            
                        }).catch(err=>{
                            console.log(err)
                        })
                        
                       } catch (error) {
                        console.log(error)
                       }
                    }
                        //console.log(values)
                    }
                    >
                        {({handleSubmit,setFieldValue})=>{
                            return(

                        <Form onSubmit= {handleSubmit}>
                        <div className='flex flex-col gap-6 w-11/12 mx-auto'>
                            {/* title */}
                            <div className='flex flex-col gap-1'>
                                <div className='capitalize text-sm font-medium'>
                                    Title *
                                </div>
                                <div>
                                    <Field name="title" type="text" placeholder='Enter title' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                    <ErrorMessage component={'div'} name='title' className='text-red-600 text-sm'></ErrorMessage>
                                </div>
                            </div>


                            {/* image */}
                            <div className='flex flex-col gap-1'>
                                <div className='capitalize text-sm font-medium'>
                                    Image *
                                </div>
                                <div className='border  border-gray-300 rounded-sm h-fit'>
                                    <label className='cursor-pointer' htmlFor="hero">
                                        <div className='flex justify-center items-center text-gray-300 text-5xl h-48'>
                                            <BsImages />
                                        </div>
                                    </label>
                                    <input
                                    name='image'
                                    onChange={(e) => {
                                        // console.log(e.target.files[0])
                                        setFieldValue('image', e.target.files[0])
                                            // uploadfile(e.target.files[0])
                                    }}

                                     type="file" id='hero' placeholder='Enter title' className='hidden ' />
                                     <ErrorMessage component={'div'} className='text-red-600 text-sm' name='image'></ErrorMessage>
                                     
                                </div>
                            </div>

                            {/* button submit */}
                            <div>
                                <button type='submit' className='bg-cyan-700 text-white cursor-pointer uppercase text-xs   rounded-2xl px-12 py-2.5'>Submit</button>
                            </div>
                        </div>
                        </Form>
                            )
                        }}
                    </Formik>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default HeroHome