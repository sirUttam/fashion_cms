import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { BsImage, BsImages } from "react-icons/bs";
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

const schema = yup.object().shape({
    title: yup.string().min(4, "Input at least 4 characters").required("This field is required")
})

function ContainerHome() {
    // const [imageid, setimageid] = useState(null)

    // const gethomecontainer = () => {
    //     try {
    //         axios.get('http://localhost:3000/homecontainer').then(res => {
    //             console.log(res)
    //         }).catch(err => {
    //             console.log(err)
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }   
    // }

    const uploadfiles = (data, updateValue) => {
        try {
            const formdata = new FormData()

            formdata.append("images", data)
            axios.post('https://fashion-backend-4y4z.vercel.app/fileupload', formdata).then(res => {
                console.log(res)
                updateValue('imageid', res.data.id)
                updateValue('imageContainer', res.data.imageUrl)

                // if (res) {
                //     setimageid(res?.data?.id)
                // }

            }).catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }


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
                                image: "",
                                imageid: ""
                            }}
                            validationSchema={schema}
                            onSubmit={(values, { resetForm }) => {
                                try {
                                    // const formData = new FormData();
                                    // formData.append("title", values.title);
                                    // formData.append("image", values.image);
                                    
                                    // values.image = imageid
                                    axios.post('https://fashion-backend-4y4z.vercel.app/homecontainer', values).then((res) => {
                                        console.log(res);
                                        resetForm()
                                        toast.success('Submitted Successfully!', {
                                            position: "top-right",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "dark",
                                            
                                            })

                                    }).catch((err) => {
                                        console.log(err)

                                        toast.error('🦄 Submission Failed!', {
                                            position: "top-right",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "dark",
                                            });
                                            
                                    })

                                } catch (error) {
                                    console.log(error)
                                }
                            }
                                //console.log(values)
                            }
                        >
                            {({ handleSubmit, setFieldValue, values }) => {
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
                                                    <ErrorMessage component={'div'} name='title' className='text-red-600 text-sm'></ErrorMessage>
                                                </div>
                                            </div>


                                            {/* image */}
                                            <div className='flex flex-col gap-1'>
                                                <div className='capitalize text-sm font-medium'>
                                                    Image *
                                                </div>
                                                <div className='border  border-gray-300 rounded-sm h-fit'>
                                                    <label className='cursor-pointer' htmlFor="images">
                                                        {
                                                            values.image?
                                                                <img src={values.image} alt="" /> : 
                                                             <div className='flex justify-center items-center text-gray-300 text-5xl h-48'>
                                                            <BsImages />
                                                        </div>
                                                        }
                                                       
                                                    </label>
                                                    <input
                                                    id='images'
                                                        name='imageContainer'
                                                        onChange={(e) => {
                                                            console.log(e.target.files[0])
                                                            // setFieldValue('image', e.target.files[0])
                                                            uploadfiles(e.target.files[0], setFieldValue)
                                                        }}

                                                        type="file"  placeholder='Enter title' className='hidden' />
                                                    <ErrorMessage component={'div'} className='text-red-600 text-sm' name='imageContainer'></ErrorMessage>

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
            <ToastContainer/>
        </div>
    )
}

export default ContainerHome