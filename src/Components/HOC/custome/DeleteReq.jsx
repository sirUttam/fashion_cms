import React from 'react'
import { useNavigate } from 'react-router-dom'

function DeleteReq(url) {
    const navigate = useNavigate()
        try {
            axios.delete(`http://localhost:4000/${url}`).then(res => {
                console.log(res)
                // setHeroHome([...res.data])
                // setpopup(false)
                navigate('/herohometable')
                getData()
            }).catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }


export default DeleteReq