import axios from 'axios';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import React from 'react'
import { BsImages } from "react-icons/bs";
import * as yup from 'yup';

const validateSchema = yup.object().shape({
    imagetitle: yup.string().required("This field is mandatory"),
    imagedate: yup.string().required("Enter subtitle"),

})

function TrendsHome() {

    const uploadImage = (data, setFieldValue) => {
        try {
            // console.log(data)
            const formData = new FormData()
            formData.append('images', data);
            axios.post('https://fashion-backend-4y4z.vercel.app/fileupload', formData).then((res) => {
                console.log(res);
                setFieldValue('imageid', res.data.id)
                setFieldValue('image', res.data.imageUrl)

                // updateValues('imageid', res.data.id)
                // updateValues('image', res.data.imageUrl)


            }).catch((err) => {
                console.log(err);

            })
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className='h-fit py-10'>
            <div className='w-11/12 mx-auto'>

                <div className='grid grid-cols-4'>
                    {/* first grid */}
                    <div className='flex flex-col'>
                        <div className='underline capitalize font-medium text-lg'>
                            Home Trends Section
                        </div>
                        <div className='w-4/5  text-gray-700 font-semibold text-sm'>
                            (Enter the title, Image title, and image for home Trends section.)
                        </div>
                    </div>

                    {/* second grid */}
                    <div className='col-span-3 w-full h-full pt-4 pb-14 rounded-sm shadow-xl'>
                        <Formik
                            initialValues={{
                                imagetitle: '',
                                imagedate: '',
                                image: '',
                                imageid: ''

                            }}

                            validationSchema={validateSchema}

                            onSubmit={(values, {resetForm}) => {
                                try {
                                console.log(values)

                                    axios.post('https://fashion-backend-4y4z.vercel.app/homefashion', values).then((res) => {
                                        console.log(res);
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
                                ({ handleSubmit, setFieldValue, values }) => (
                                    <Form onSubmit={handleSubmit} >
                                        {/* {console.log(values,"here")} */}
                                        <div className='flex flex-col gap-6 w-11/12 mx-auto'>
                                            {/* title */}
                                            <div className='flex flex-col gap-1'>
                                                <div className='capitalize text-sm font-medium'>
                                                    imageTitle *
                                                </div>
                                                <div>
                                                    <Field name='imagetitle' type="text" placeholder='Enter title' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                                    <ErrorMessage component={'div'} name='imagetitle' className='text-red-600 text-sm'></ErrorMessage>

                                                </div>
                                            </div>

                                            {/* Sub title */}
                                            <div className='flex flex-col gap-1'>
                                                <div className='capitalize text-sm font-medium'>
                                                    Imagedate *
                                                </div>
                                                <div>
                                                    <Field name='imagedate' type="text" placeholder='Enter Subtitle' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                                    <ErrorMessage component={'div'} name='imagedate' className='text-red-600 text-sm'></ErrorMessage>

                                                </div>
                                            </div>

                                            {/* image */}
                                            <div className='flex flex-col gap-1'>
                                                <div className='capitalize text-sm font-medium'>
                                                    Image *
                                                </div>
                                                <div className='border  border-gray-300 rounded-sm h-fit'>
                                                    <label className='cursor-pointer' htmlFor="imagehome">
                                                        {
                                                            values.image ?
                                                                <img className='h-40 w-auto object-cover' src={values.image} alt="" /> :

                                                                <div className='flex justify-center items-center text-gray-300 text-5xl h-48'>
                                                                    <BsImages />
                                                                </div>
                                                        }
                                                    </label>
                                                    <input
                                                        name='image'
                                                        type="file"
                                                        id='imagehome'
                                                        className='hidden '
                                                        onChange={(e) => {
                                                            uploadImage(e.target.files[0], setFieldValue)
                                                        }}
                                                    />
                                                    <ErrorMessage component={'div'} name='image' className='text-red-600 text-sm'></ErrorMessage>
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

export default TrendsHome;