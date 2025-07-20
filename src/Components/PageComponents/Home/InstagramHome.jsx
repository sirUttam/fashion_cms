import React, { useMemo, useRef, useState } from 'react'
import { BsImages } from "react-icons/bs";
import JoditEditor from 'jodit-react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
    title: yup.string().required("Must enter title"),
    subtitle: yup.string().required("Must enter subtitle"),
    description: yup.string().required("Must enter description"),


})

function InstagramHome() {
    const editor = useRef(null);
    // const [content, setContent] = useState('');
    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typings...'
    }),
        []
    );

    const uploadImage = (data, updateValue) =>{
        // console.log(data)
        try {
        const formData = new FormData();
        formData.append('images', data);
            axios.post('https://fashion-backend-4y4z.vercel.app/fileupload', formData).then((res)=>{
                console.log(res);
                updateValue('imageid', res.data.id)
                updateValue('image', res.data.imageUrl)

                
            }).catch((err)=>{
                console.log(err);
                
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className=' h-fit py-10'>
            <div className='w-11/12 mx-auto'>

                <div className='grid grid-cols-4'>
                    {/* first grid */}
                    <div className='flex flex-col'>
                        <div className='underline capitalize font-medium text-lg'>
                            Home Instagram Section
                        </div>
                        <div className='w-4/5  text-gray-700 font-semibold text-sm'>
                            Enter the title, Subtitle, Description and image for home Instagram section.
                        </div>
                    </div>

                    {/* second grid */}
                    <div className='col-span-3 w-full h-full pt-4 pb-14 rounded-sm shadow-xl'>
                        <Formik
                        initialValues={{
                            title:"",
                            subtitle: "",
                            description: "",
                            image:"",
                            imageid: ""
                        }}
                        validationSchema={schema}
                        
                        onSubmit={(values, {resetForm})=>{
                            console.log(values)
                            try {
                                axios.post('https://fashion-backend-4y4z.vercel.app/instagramhome', values).then((response)=>{
                                    console.log(response);
                                    resetForm()
                                    
                                }).catch((err)=>{
                                    console.log(err);
                                    
                                })
                            } catch (error) {
                                console.log(error);
                                
                            }
                            
                        }
                        }

                        >
                            
                            {
                                ({handleSubmit, setFieldValue,values}) => (
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

                                            {/* Sub title */}
                                            <div className='flex flex-col gap-1'>
                                                <div className='capitalize text-sm font-medium'>
                                                    Subtitle *
                                                </div>
                                                <div>
                                                    <Field name='subtitle' type="text" placeholder='Enter Subtitle' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                                    <ErrorMessage component={'div'} name='subtitle' className='text-red-600 text-sm'></ErrorMessage>
                                                </div>
                                            </div>

                                            {/* Price Tag */}
                                            <div className='flex flex-col gap-1'>
                                                <div className='capitalize text-sm font-medium'>
                                                    Description *
                                                </div>
                                                <div>
                                                    <JoditEditor
                                                     name='description'
                                                        ref={editor}
                                                        value={values.description}
                                                        config={config}
                                                        tabIndex={1}
                                                        onChange={newContent => setFieldValue('description', newContent)}
                                                    />
                                                    
                                                <ErrorMessage component={'div'} name='description' className='text-red-600 text-sm'></ErrorMessage>
                                                </div>

                                            </div>

                                            {/* image */}
                                            <div className='flex flex-col gap-1'>
                                                <div className='capitalize text-sm font-medium'>
                                                    Image *
                                                </div>
                                                <div className='border  border-gray-300 rounded-sm h-fit'>
                                                    <label className='cursor-pointer' htmlFor="imageId">
                                                        {
                                                            values.image?
                                                            <img className='h-40 w-auto object-cover' src={values.image} alt="" />:

                                                        <div className='flex justify-center items-center text-gray-300 text-5xl h-48'>
                                                            <BsImages />
                                                        </div>
                                                        }
                                                    </label>
                                                    <input 
                                                    onChange={(e)=>{
                                                        const filedata = e.target.files[0]
                                                        uploadImage(filedata, setFieldValue)

                                                    }}
                                                    name='image' 
                                                    type="file" 
                                                    id='imageId' 
                                                    className='hidden'/>
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

export default InstagramHome;