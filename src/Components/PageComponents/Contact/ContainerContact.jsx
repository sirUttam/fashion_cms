import React, { useMemo, useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';

const schema = yup.object().shape({
    title: yup.string().required("Fill this field"),
    desc: yup.string().required("Description is necessary").min(10, "Type atleast 10 chars"),
    firstTitle: yup.string().required("First title necessary"),
    firstAddress: yup.string().required("Fill this field"),
    firstContact: yup.number().required("Enter Contact").min(10, "Invalid contact number").max(10, "Invalid contact number"),
    secondTitle: yup.string().required("Enter second title"),
    secondAddress: yup.string().required("Mandatory"),
    secondContact: yup.number().required("Fill this field").max(10, "Invalid contact number").min(10, "Invalid contact number"),
})

function ContainerContact() {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typings...'
    }),
        []
    );
    return (
        <div className='h-fit py-10'>
            <div className='w-11/12 mx-auto'>

                <div className='grid grid-cols-4'>
                    {/* first grid */}
                    <div className='flex flex-col'>
                        <div className='underline capitalize font-medium text-lg'>
                            Contact Container Section
                        </div>
                        <div className='w-4/5 font-semibold text-gray-700 text-sm'>
                            (Enter the title, description and Location details for contact container section.)
                        </div>
                    </div>

                    {/* second grid */}
                    <div className='col-span-3 w-full h-full pt-4 pb-14 rounded-sm shadow-xl'>
                        <Formik
                            initialValues={{
                                title: "",
                                desc: "",
                                firstTitle: "",
                                firstAddress: "",
                                firstContact: "",
                                secondTitle: "",
                                secondAddress: "",
                                secondContact: "",
                            }}

                            onSubmit={(values) => {
                                console.log(values)
                            }}

                            validationSchema={schema}
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

                                                        <Field name='title' type="text" placeholder='Enter title' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                                        <ErrorMessage component={'div'} name='title' className='text-red-600 text-sm'></ErrorMessage>

                                                    </div>
                                                </div>

                                                {/* Description */}
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

                                                        {/* console.log(newContent) */}
                                                    </div>
                                                </div>

                                                {/* First Location */}
                                                <div className='text-lg text-yellow-700 underline font-semibold'>
                                                    First Location
                                                </div>

                                                {/* First Location title */}
                                                <div className='flex flex-col gap-1'>
                                                    <div className='capitalize text-sm font-medium'>
                                                        Title *
                                                    </div>
                                                    <div>
                                                        <Field name='firstTitle' type="text" placeholder='Enter Title' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                                        <ErrorMessage component={'div'} name='firstTitle' className='text-red-600 text-sm'></ErrorMessage>
                                                    </div>
                                                </div>

                                                {/* First Location Address */}
                                                <div className='flex flex-col gap-1'>
                                                    <div className='capitalize text-sm font-medium'>
                                                        Address *
                                                    </div>
                                                    <div>
                                                        <Field name='firstAddress' type="text" placeholder='Enter Address' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                                        <ErrorMessage component={'div'} name='firstAddress' className='text-red-600 text-sm'></ErrorMessage>

                                                    </div>
                                                </div>

                                                {/* First Location Contact */}
                                                <div className='flex flex-col gap-1'>
                                                    <div className='capitalize text-sm font-medium'>
                                                        Contact Number *
                                                    </div>
                                                    <div>
                                                        <Field name='firstContact' type="number" placeholder='Enter Contact' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                                        <ErrorMessage component={'div'} name='firstContact' className='text-red-600 text-sm'></ErrorMessage>

                                                    </div>
                                                </div>

                                                {/* Second Location */}
                                                <div className='text-lg text-yellow-700 underline font-semibold'>
                                                    Second Location
                                                </div>

                                                {/* Second Location title */}
                                                <div className='flex flex-col gap-1'>
                                                    <div className='capitalize text-sm font-medium'>
                                                        Title *
                                                    </div>
                                                    <div>
                                                        <Field name='secondTitle' type="text" placeholder='Enter Title' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                                        <ErrorMessage component={'div'} name='secondTitle' className='text-red-600 text-sm'></ErrorMessage>

                                                    </div>
                                                </div>

                                                {/* Second Location Address */}
                                                <div className='flex flex-col gap-1'>
                                                    <div className='capitalize text-sm font-medium'>
                                                        Address *
                                                    </div>
                                                    <div>
                                                        <Field name='secondAddress' type="text" placeholder='Enter Address' className='border border-gray-300  outline-0 px-4 py-2 w-full rounded-sm' />
                                                        <ErrorMessage component={'div'} name='secondAddress' className='text-red-600 text-sm'></ErrorMessage>

                                                    </div>
                                                </div>

                                                {/* Second Location Contact */}
                                                <div className='flex flex-col gap-1'>
                                                    <div className='capitalize text-sm font-medium'>
                                                        Contact Number *
                                                    </div>
                                                    <div>
                                                        <Field name='secondContact' type="number" placeholder='Enter Contact' className='border border-gray-300 outline-0 px-4 py-2 w-full rounded-sm' />
                                                        <ErrorMessage component={'div'} name='secondContact' className='text-red-600 text-sm'></ErrorMessage>
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

export default ContainerContact;