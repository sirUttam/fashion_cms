import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { BsImages } from "react-icons/bs";
import * as yup from 'yup';
import { HiMiniBackspace } from "react-icons/hi2";


const schema = yup.object().shape({
    title: yup.string().min(4, "Enter atleast 4 characters").required("This is mandatory"),
    price: yup.number().min(1, "Enter between 1-100").max(100, "Enter between 1-100").required("Enter age")
})

function BestSellersHome({ cancelBestSeller, prevDataBestSeller, getDataAgain }) {

    const uploadfile = (data, updateValue) => {
        try {
            const formdata = new FormData()
            formdata.append("images", data)

            axios.post('https://fashion-backend-4y4z.vercel.app/fileupload', formdata).then((res) => {
                console.log(res)
                updateValue("imageid", res.data.id)
                updateValue("image", res.data.imageUrl)

            }).catch((err) => {
                console.log(err);

            })
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className=' h-screen fixed overflow-y-scroll top-0 z-10 left-0 w-full py-6 bg-black/40'>
            <div className='flex flex-col w-8/12 p-10 bg-white mx-auto h-full gap-10 items-center'>
            <div className='flex justify-between items-center w-11/12 mx-auto'>

            <div></div>
                <div className='text-xl font-semibold capitalize'>
                    Best Seller Edit
                </div>
                <div
                    onClick={() => {
                        cancelBestSeller()
                    }}
                    className='text-3xl cursor-pointer'><HiMiniBackspace />
                    </div>
                    </div>

                <div className='w-full h-full rounded-sm'>
                    {console.log(prevDataBestSeller)}
                    {
                        prevDataBestSeller ?
                            <Formik
                                initialValues={{
                                    title: prevDataBestSeller ? prevDataBestSeller.title : "",
                                    price: prevDataBestSeller ? prevDataBestSeller.price : "",
                                    image: "",
                                    imageid: prevDataBestSeller ? prevDataBestSeller.imageid.id : "",
                                    imageUrl: prevDataBestSeller ? prevDataBestSeller.imageid.imageUrl : ""
                                }}
                                validationSchema={schema}

                                onSubmit={(values, { resetForm }) => {
                                    // console.log(values);
                                    console.log(prevDataBestSeller);

                                    try {
                                        console.log(values)
                                        // values.image = imageid
                                        axios.patch(`https://fashion-backend-4y4z.vercel.app/homebestseller/${prevDataBestSeller && prevDataBestSeller.id} `, values).then((res) => {
                                            // console.log(res)
                                            cancelBestSeller()
                                            getDataAgain()
                                            resetForm()
                                        }).catch((err) => {
                                            console.log(err);

                                        })
                                    } catch (error) {
                                        console.log(error);

                                    }
                                }

                                }
                            >
                                {
                                    ({ handleSubmit, setFieldValue, values }) => {
                                        return (

                                            <Form onSubmit={handleSubmit}>

                                                <div className='flex flex-col gap-6'>
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
                                                            <label className='cursor-pointer' htmlFor="SellerImage">
                                                                {
                                                                    values.image ?
                                                                        <img className='h-30 w-auto object-cover' src={values.image} alt="" /> :

                                                                        <div className='flex justify-center items-center text-gray-300 text-5xl h-48'>
                                                                            <BsImages />
                                                                        </div>
                                                                }
                                                            </label>
                                                            <input
                                                                name="image"
                                                                type="file" id='SellerImage'
                                                                className='hidden'
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0]
                                                                    uploadfile(file, setFieldValue);

                                                                }}
                                                            />
                                                            <ErrorMessage component={'div'} name='image' className='text-red-800 text-sm'></ErrorMessage>
                                                        </div>
                                                    </div>

                                                    {/* button submit */}
                                                    <div className='flex gap-4'>

                                                        {/* submit button */}
                                                        <button
                                                            onClick={() => {
                                                                console.log(prevDataBestSeller);

                                                            }}
                                                            type='submit' className='bg-cyan-700 text-white cursor-pointer uppercase text-xs   rounded-2xl px-12 py-2.5'>edit</button>

                                                        {/* cancel button */}
                                                        <button
                                                            onClick={() => { cancelBestSeller() }}
                                                            type='submit' className='bg-cyan-700 text-white cursor-pointer uppercase text-xs   rounded-2xl px-12 py-2.5'>cancel</button>
                                                    </div>
                                                </div>
                                            </Form>
                                        )
                                    }
                                }
                            </Formik> :
                            <div>Loading....</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default BestSellersHome