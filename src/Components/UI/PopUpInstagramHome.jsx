import React, { useMemo, useRef, useState } from 'react'
import { BsImages } from "react-icons/bs";
import JoditEditor from 'jodit-react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { HiMiniBackspace } from "react-icons/hi2";


const schema = yup.object().shape({
    title: yup.string().required("Must enter title"),
    subtitle: yup.string().required("Must enter subtitle"),
    description: yup.string().required("Must enter description"),


})

function InstagramHome({cancelInstagram, getPrevData, getData}) {
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
            axios.post('http://localhost:3000/fileupload', formData).then((res)=>{
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
        <div className=' h-screen w-full fixed top-0 overflow-y-scroll left-0 z-10 py-6 bg-black/60'>
            <div className='flex w-8/12 bg-white p-10 mx-auto flex-col gap-10 items-center'>

               <div className='flex justify-between items-center w-11/12'>
                <div></div>
                    <div className='text-2xl font-semibold capitalize'>
                     Instagram Home Edit
                    </div>
                    {/* cross icon */}
                    <div 
                    onClick={()=>{
                        cancelInstagram()
                    }}
                    className='text-3xl cursor-pointer'><HiMiniBackspace/></div>
               </div>

                    <div className='w-full h-full rounded-sm'>
                        {
                        console.log(getPrevData)
                        }

                        {
                            getPrevData?
                            
                        <Formik
                        initialValues={{
                            title: getPrevData? getPrevData.title : "",
                            subtitle: getPrevData? getPrevData.subtitle : "",
                            description: getPrevData? getPrevData.description : "",
                            image:"",
                            imageid: getPrevData? getPrevData.imageid.id : "",
                            imageUrl: getPrevData? getPrevData.imageid.imageUrl : ""
                        }}
                        validationSchema={schema}
                        
                        onSubmit={(values, {resetForm})=>{
                            console.log(values)
                            try {
                                axios.patch(`http://localhost:3000/instagramhome/${getPrevData && getPrevData.id}`, values).then((response)=>{
                                    // console.log(response);
                                    getData()
                                    cancelInstagram()
                                    resetForm()
                                    
                                }).catch((err)=>{
                                    console.log(err);
                                    
                                })
                            } catch (error) {
                                console.log(error);
                                
                            }
                            
                        }
                        }>
                            
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
                                                            values.imageUrl?
                                                            <img className='h-40 w-auto object-cover' src={values.imageUrl} alt="" />:

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

                                            {/* buttons */}
                                            <div className='flex gap-4'>
                                                {/* edit button */}
                                                <button 
                                                onClick={()=>{

                                                }}
                                                type='submit' className='bg-cyan-700 text-white cursor-pointer uppercase text-xs   rounded-2xl px-12 py-2.5'>edit</button>

                                                {/* cancel button */}
                                                <button 
                                                onClick={()=>{
                                                    cancelInstagram()
                                                }}
                                                type='submit' className='bg-cyan-700 text-white cursor-pointer uppercase text-xs   rounded-2xl px-12 py-2.5'>cancel</button>
                                            </div>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>
                        :
                        <div>Loading...</div>
                        }
                    </div>
            </div>
        </div>
    )
}

export default InstagramHome;