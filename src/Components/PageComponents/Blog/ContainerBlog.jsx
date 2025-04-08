import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { BsImages } from "react-icons/bs";
import * as yup from 'yup';

const validateSchema = yup.object().shape({
    title: yup.string().required("Must enter title"),
    // image: yup.mixed().required("Upload image")
});


function ContainerBlog() {
    return (
        <div className=' h-fit py-10'>
            <div className='w-11/12 mx-auto'>

                <div className='grid grid-cols-4'>
                    {/* first grid */}
                    <div className='flex flex-col'>
                        <div className='underline capitalize font-medium text-lg'>
                            Blog Container Section
                        </div>
                        <div className='w-4/5 font-semibold text-gray-700 text-sm'>
                            (Enter the title and image for blog container section.)
                        </div>
                    </div>

                    {/* second grid */}
                    <div className='col-span-3 w-full h-full pt-4 pb-14 rounded-sm shadow-xl'>
                        <Formik
                        initialValues={{
                            title: "",
                            image: ""
                        }}

                        onSubmit={(values)=>{
                            console.log(values);
                            // console.log(values.image);
                        }}

                        validationSchema={validateSchema}
                        >
                            {
                                ({handleSubmit, setFieldValue})=>(
                                    <Form onSubmit={handleSubmit}>
                                        <div className='flex flex-col gap-6 w-11/12 mx-auto'>
                            {/* title */}
                            <div className='flex flex-col gap-1'>
                                <div className='capitalize text-sm font-medium'>
                                    Title *
                                </div>
                                <div>
                                    <Field name='title' type="text" placeholder='Enter title' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                    <ErrorMessage component={'div'} name='title' className='text-red-600 text-sm'></ErrorMessage>
                                </div>
                            </div>


                            {/* image */}
                            <div className='flex flex-col gap-1'>
                                <div className='capitalize text-smc font-medium'>
                                    Image *
                                </div>
                                <div className='border  border-gray-300 rounded-sm h-fit'>
                                    <label className='cursor-pointer' htmlFor="hero">
                                        <div className='flex justify-center items-center text-gray-300 text-5xl h-48'>
                                            <BsImages />
                                        </div>
                                    </label>
                                    <input 
                                    onChange={(e)=>{setFieldValue('image', e.target.files[0])}}
                                    name='image' type="file" id='hero' placeholder='Enter title' className='hidden ' />
                                </div>
                            </div>

                            {/* button submit */}
                            <div>
                                <button type='submit' className='bg-cyan-700 text-white cursor-pointer uppercase text-xs   rounded-2xl px-12 py-2.5'>Submit</button>
                            </div>
                        </div>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContainerBlog;