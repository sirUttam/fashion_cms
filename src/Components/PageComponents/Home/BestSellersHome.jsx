import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { BsImages } from "react-icons/bs";
import * as yup from 'yup';

const schema = yup.object().shape({
    title: yup.string().min(4, "Enter atleast 4 characters").required("This is mandatory"),
    price: yup.number().min(1, "Enter between 1-100").max(100, "Enter between 1-100").required("Enter age")
})

function HeroHome() {
    return (
        <div className=' h-fit py-10 '>
            <div className='w-11/12 mx-auto'>
                <div className='grid grid-cols-4'>
                    {/* first grid */}
                    <div className='flex flex-col'>
                        <div className='underline capitalize font-medium text-lg'>
                            Home Best Sellers Section
                        </div>
                        <div className='w-4/5 text-gray-700 font-semibold text-sm'>
                            (Enter the title, price and image for home BestSellers section.)
                        </div>
                    </div>

                    {/* second grid */}
                    <div className='col-span-3 w-full h-full pt-4 pb-14 rounded-sm shadow-xl'>

                        <Formik
                            initialValues={{
                                title: "",
                                price: "",
                                image: ""
                            }}
                            validationSchema={schema}
                            onSubmit={(values) => 
                                console.log(values)
                            }
                        >
                            {
                                ({ handleSubmit, setFieldValue }) => {
                                    return (

                                        <Form onSubmit={handleSubmit}>

                                            <div className='flex flex-col gap-6 w-11/12 mx-auto'>
                                                {/* title */}
                                                <div className='flex flex-col gap-1'>
                                                    <div className='capitalize text-sm font-medium'>
                                                        Title *
                                                    </div>
                                                    <div>
                                                        <Field name="title" type="text" placeholder='Enter title' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                                        <ErrorMessage name='title' className='text-red-600 text-sm' component={'div'}>  </ErrorMessage>
                                                    </div>
                                                </div>

                                                {/* Price Tag */}
                                                <div className='flex flex-col gap-1'>
                                                    <div className='capitalize text-sm font-medium'>
                                                        Price *
                                                    </div>
                                                    <div>
                                                        <Field name="price" type="number" placeholder='Enter price' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                                        <ErrorMessage component={'div'} className='text-red-600 text-sm' name='price'></ErrorMessage>
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
                                                         name="image" type="file" id='hero' placeholder='Enter title' className='hidden'
                                                         onChange={(e)=>{
                                                            setFieldValue('image', e.target.files[0])
                                                         }}
                                                          />
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
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroHome