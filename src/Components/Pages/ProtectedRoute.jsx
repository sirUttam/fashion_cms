import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function ProtectedRoute() {
    const [login, setLogin] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            setLogin(true)
        }
        else{
            setLogin(false)
            navigate('/login')
        }
    },[login])

    if(login){
        return(<Outlet/>)
    }
    else{
       return(
        <div>
        Failed
    </div>
       )
    }

}

export default ProtectedRoute