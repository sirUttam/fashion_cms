import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { BsImages } from "react-icons/bs";
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { HiMiniBackspace } from "react-icons/hi2";


const schema = yup.object().shape({
    title: yup.string().min(4, "Input at least 4 characters").required("This field is required")
})

function ContainerHome({cancelContainer,prevdata,getDataAgain}) {
 
    const uploadfiles = (data, updateValue) => {
        try {
            const formdata = new FormData()

            formdata.append("images", data)
            axios.post('http://localhost:3000/fileupload', formdata).then(res => {
                console.log(res)
                updateValue('imageid', res.data.id)
                updateValue('imageUrl', res.data.imageUrl)


            }).catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    

    return (
        <div className='h-screen fixed top-0 bg-black/40 z-10 left-0 w-full py-6'>

                  <div className='flex flex-col w-8/12 bg-white p-10 h-full mx-auto items-center gap-16'>
                  <div className='flex items-center justify-between w-11/12 mx-auto'>

                    <div></div>
                    <div className='text-xl capitalize font-semibold underline'>
                        Container Home
                    </div>
                    <div 
                    onClick={()=>{
                        cancelContainer()
                    }}
                    className='text-3xl cursor-pointer'><HiMiniBackspace/></div>
                  </div>
                      <div className='w-full h-full rounded-sm'>
                        {console.log(prevdata,"prev")}
                        {
                            prevdata?
                        <Formik
                            initialValues={{
                                title: prevdata? prevdata.title : "",
                                image: "",
                                imageUrl:prevdata? prevdata.imageid.imageUrl : "",
                                imageid: prevdata? prevdata.imageid.id : ""
                            }}
                            validationSchema={schema}
                            onSubmit={(values, { resetForm }) => {
                                try {
                                  
                                    axios.patch(`http://localhost:3000/homecontainer/${prevdata && prevdata.id}`, values).then((res) => {
                                        console.log(res);
                                        cancelContainer()
                                        getDataAgain()
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
                                        <div className='flex flex-col gap-6'>
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
                                                            values.imageUrl?
                                                                <img className='h-40 w-auto object-contain' src={values.imageUrl} alt="" /> : 
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
                                            <div className='flex gap-4'>
                                                {/* edit button */}
                                                <button type='submit' className='bg-cyan-700 text-white cursor-pointer uppercase text-xs   rounded-2xl px-12 py-2.5'>edit</button>

                                                {/* cancel button */}
                                                <button 
                                                onClick={()=>{cancelContainer()}}
                                                type='submit' className='bg-cyan-700 text-white cursor-pointer uppercase text-xs   rounded-2xl px-12 py-2.5'>Cancel</button>
                                            </div>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>:
                        <div>loading.........</div>
                        }
                    </div>
                  </div>
                  
            <ToastContainer/>
        </div>
    )
}

export default ContainerHome