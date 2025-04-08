import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { BsImages } from "react-icons/bs";
import * as yup from 'yup';

const validate = yup.object().shape({
    title: yup.string().required("Enter this field"),
    subtitle: yup.string().required("This cannot be empty"),
    price: yup.number("only numbers are allowed").min(1, "Enter some numbers").max(1000, "Enter less than 1000").required("Enter price")
})

function SaleHome() {
    return (
        <div className=' h-fit py-10'>
            <div className='w-11/12 mx-auto'>

                <div className='grid grid-cols-4'>
                    {/* first grid */}
                    <div className='flex flex-col'>
                        <div className='underline capitalize font-medium text-lg'>
                            Home Sale Section
                        </div>
                        <div className='w-4/5  text-gray-700 font-semibold text-sm'>
                            (Enter the title, Subtitle, Price of Sale and image for home Sale section.)
                        </div>
                    </div>

                    {/* second grid */}
                    <div className='col-span-3 w-full h-full pt-4 pb-14 rounded-sm shadow-xl'>
                      <Formik
                      initialValues={{
                        title: "",
                        subtitle: "",
                        price: "",
                        image: ""
                      }}

                      validationSchema={validate}

                      onSubmit={(values)=>
                        console.log(values)
                      }
                      >
                        {
                            ({handleSubmit, setFieldValue})=>{
                                return(
                                    <Form onClick={handleSubmit}>
                                          <div className='flex flex-col gap-6 w-11/12 mx-auto'>
                            {/* title */}
                            <div className='flex flex-col gap-1'>
                                <div className='capitalize text-sm font-medium'>
                                    Title *
                                </div>
                                <div>
                                    <Field name='title' type="text" placeholder='Enter title' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                    <ErrorMessage component={'div'} className='text-red-600 text-sm' name='title'></ErrorMessage>

                                </div>
                            </div>

                            {/* Sub title */}
                            <div className='flex flex-col gap-1'>
                                <div className='capitalize text-sm font-medium'>
                                    Subtitle *
                                </div>
                                <div>
                                    <Field name='subtitle' type="text" placeholder='Enter Subtitle' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                    <ErrorMessage component={'div'} className='text-red-600 text-sm' name='subtitle'></ErrorMessage>

                                </div>
                            </div>

                            {/* Price Tag */}
                            <div className='flex flex-col gap-1'>
                                <div className='capitalize text-sm font-medium'>
                                    Price of Sale *
                                </div>
                                <div>
                                    <Field name='price' type="text" placeholder='Enter Subtitle' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
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
                                    <input name='image' type="file" id='hero' placeholder='Enter title' className='hidden ' />
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
                            }
                        }
                      </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SaleHome;