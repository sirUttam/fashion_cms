import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import JoditEditor from 'jodit-react';
import React, { useMemo, useRef } from 'react'
import { BsImages } from 'react-icons/bs';
import * as yup from 'yup';
import { HiMiniBackspace } from "react-icons/hi2";


const schema = yup.object().shape({
  title: yup.string().min(6, "this is too short").required("this is required"),
  subtitle: yup.string().required('Enter subTitle'),
  description: yup.string().required("This cannot be empty"),
  // image: yup.string()
})

function PopUpBoxEditHero({cancelButton, prevDataHero, getData}) {
  const editor = useRef(null);
  // const [content, setContent] = useState('');
  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Start typings...'
  }),
    []
  );

   const fileuploadHero = (data, updateValue) => {
        // console.log(data)
        try {
            const formdata = new FormData();
            formdata.append("images", data); //images named fromed backend

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
    <div className='fixed top-0 left-0 w-full h-screen overflow-y-scroll bg-black/30 z-10 py-6'>

<div className='flex flex-col w-8/12 mx-auto items-center bg-white gap-12 p-10'>
 <div className='flex w-11/12 mx-auto justify-between items-center'>
<div></div>
   <div className='text-xl capitalize font-semibold underline'>
    Hero Home
  </div>
{/* cross icon */}
  <div
  onClick={()=>{
    cancelButton()
  }}
  className='text-3xl cursor-pointer'><HiMiniBackspace/></div>
 </div>
   <div className='w-full h-full rounded-sm'>
    {console.log(prevDataHero,"here")}
    {
      prevDataHero?
        <Formik
          initialValues={{
            title: prevDataHero? prevDataHero.title : "",
            subtitle: prevDataHero? prevDataHero.subtitle : "",
            description: prevDataHero ? prevDataHero.description : "",
            image: "",
            imageid: prevDataHero ? prevDataHero.imageid.id : "",
            imageUrl: prevDataHero ? prevDataHero.imageid.imageUrl : ""
          }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            console.log(values)
            try {
              axios.patch(`http://localhost:3000/homeherosection/${prevDataHero && prevDataHero.id}`, values).then(res => {
                console.log(res)
                resetForm()
                getData()    // this helps such that we do not need to reload the browser after editing
                cancelButton()  //this closes the popup editing form right after submitting
              }).catch(err => {
                console.log(err)
              })
            } catch (error) {
              console.log(error)
            }
          }

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
                      <label className='cursor-pointer h-48' htmlFor="hero">
                        {
                          values.imageUrl ?
                            <img className='h-40 w-auto object-contain' src={values.imageUrl} /> :

                            <div className='flex justify-center items-center text-gray-300 text-5xl h-full'>
                              <BsImages />
                            </div>
                        }
                      </label>
                      <input name='image'
                        onChange={(e) => {
                          // console.log(e.target.files[0])
                          fileuploadHero(e.target.files[0], setFieldValue)
                          // setFieldValue('image', e.target.files[0])
                        }}
                        type="file" id='hero' placeholder='Enter title' className='hidden ' />
                      <ErrorMessage name='image' component={'div'} className='text-red-600' />
                    </div>
                  </div>

                  {/* button submit */}
                  <div className='flex gap-4'>
                    {/* edit button */}
                    <button type='submit' className='bg-cyan-700 text-white cursor-pointer uppercase text-xs   rounded-2xl px-12 py-2.5'>Edit</button>

                    {/* cancel button */}
                    <button
                    onClick={()=>{
                      cancelButton()
                    }}
                     className='bg-cyan-700 text-white cursor-pointer uppercase text-xs   rounded-2xl px-12 py-2.5'>Cancel</button>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>:
        <div>loading.......</div>

    }
      </div>
</div>
     
    </div>
  )
}

export default PopUpBoxEditHero