import React, { useMemo, useRef, useState } from 'react'
import { BsImages } from "react-icons/bs";
import JoditEditor from 'jodit-react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
    title: yup.string().required("Must enter title"),
    subtitle: yup.string().required("Must enter subtitle"),
    desc: yup.string().required("Must enter description"),


})

function SaleHome() {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typings...'
    }),
        []
    );
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
                            (Enter the title, Subtitle, Description and image for home Instagram section.)
                        </div>
                    </div>

                    {/* second grid */}
                    <div className='col-span-3 w-full h-full pt-4 pb-14 rounded-sm shadow-xl'>
                        <Formik
                        initialValues={{
                            title:"",
                            subtitle: "",
                            desc: "",
                            image:""
                        }}
                        
                        onSubmit={(values)=>(
                            console.log(values)
                        )}

                        validationSchema={schema}
                        >
                            
                            {
                                ({handleSubmit, setFieldValue}) => (
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
                                                     name='desc'
                                                        ref={editor}
                                                        value={content}
                                                        config={config}
                                                        tabIndex={1}
                                                        onChange={newContent => setFieldValue('desc', newContent)}
                                                    />
                                                    
                                                <ErrorMessage component={'div'} name='desc' className='text-red-600 text-sm'></ErrorMessage>
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

export default SaleHome;