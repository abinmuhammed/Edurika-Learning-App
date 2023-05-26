import React from "react";
import { Navigate,Outlet } from "react-router-dom";

const PrivateAdmin=()=>{
    const auth=localStorage.getItem('ADMIN')
    return auth ?<Outlet></Outlet>:<Navigate to="/admin/AdminLogin" />
}

const Privateuser=()=>{
    const auth=localStorage.getItem('user')
    return auth ? <Outlet></Outlet>:<Navigate to='/user/login'></Navigate>
}
 
   
const PrivateMentor=()=>{
    const auth=localStorage.getItem('MentorID')
    return auth ? <Outlet></Outlet>:<Navigate to='/mentor'></Navigate>
}


export  {PrivateAdmin,Privateuser,PrivateMentor}