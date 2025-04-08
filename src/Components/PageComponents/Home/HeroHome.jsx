import React, { useMemo, useRef, useState } from 'react'
import { BsImages } from "react-icons/bs";
import JoditEditor from 'jodit-react'
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import axios from 'axios';

const schema = yup.object().shape({
    title: yup.string().min(6, "this is too short").required("this is required"),
    subtitle: yup.string().required('Enter subTitle'),
    description: yup.string().required("This cannot be empty"),
    // image: yup.string()
})
function HeroHome() {
  const [data,setData]= useState(null)


    const editor = useRef(null);
    // const [content, setContent] = useState('');
    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typings...'
    }),
        []
    );
    return (
        <div className=' h-fit py-10'>
            <div className='flex w-11/12 mx-auto flex-col gap-10'>
                <div className='text-2xl font-semibold '>
                    Home Section
                </div>
                <div className='grid grid-cols-4'>
                    {/* first grid */}
                    <div className='flex flex-col'>
                        <div className='underline capitalize font-medium text-lg'>
                            Home Hero Section
                        </div>
                        <div className='w-4/5 text-gray-700 font-medium text-sm'>
                            (Enter the title, sub-Title, description and image for home hero section.)
                        </div>
                    </div>

                    {/* second grid */}
                    <div className='col-span-3 w-full h-full pt-4 pb-14 rounded-sm shadow-2xl'>
                        <Formik
                            initialValues={{
                                title: "",
                                subtitle: "",
                                description: "",
                                image: ""
                            }}
                            validationSchema={schema}
                            onSubmit={(values,{resetForm}) =>{
                                try {
                                    axios.post('http://localhost:3000/homeherosection',values).then(res=>{
                                        console.log(res)
                                        resetForm()
                                    }).catch(err=>{
                                        console.log(err)
                                    })
                                } catch (error) {
                                    console.log(error)
                                }}

                            }
                        >

                            {/* <Formik>
                                   { ({handleSubmit,setFieldValue})=>{
                                        return(
                                            <Form>
                                            </Form>
                                        )
                            </Formik> */}


                            {({ handleSubmit, setFieldValue,values }) => {
                                return (
                                    <Form onSubmit={handleSubmit}>
                                        <div className='flex flex-col gap-6 w-11/12 mx-auto'>
                                            {/* title */}
                                            <div className='flex flex-col gap-1'>
                                                <div className='capitalize text-sm font-medium'>
                                                    Title *
                                                </div>
                                                <div>
                                                    <Field name='title' type="text" placeholder='Enter title' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                                    <ErrorMessage name='title' component={'div'} className='text-red-400' />
                                                </div>
                                            </div>

                                            {/* sub title */}
                                            <div className='flex flex-col gap-1'>
                                                <div className='capitalize text-sm font-medium'>
                                                    Subtitle *
                                                </div>
                                                <div>
                                                    <Field name='subtitle' type="text" placeholder='Enter title' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                                    <ErrorMessage name='subtitle' component={'div'} className='text-red-500 text-sm' />
                                                </div>
                                            </div>

                                            {/* description */}
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
                                                    <ErrorMessage name='description' component={'div'} className='text-red-500 text-sm' />
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
                                                    <input name='image'
                                                    multiple
                                                     onChange={(e) => {
                                                        // console.log(e.target.files[0])
                                                        setFieldValue('image', e.target.files[0])
                                                    }} 
                                                    type="file" id='hero' placeholder='Enter title' className='hidden ' />
                                                    <ErrorMessage name='image' component={'div'} className='text-red-600' />
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