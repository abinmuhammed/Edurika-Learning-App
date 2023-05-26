import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AdminNavBar from '../components/ADMIN-Components/AdminNav/adNavBar'
import Categories from '../pages/Admin-pages/Categories'
import AddCategoryForm from '../components/ADMIN-Components/AddCategories/AddCategoryForm'
import UserManage from '../components/ADMIN-Components/user Management/userManage'
import CourseAManage from '../pages/Admin-pages/CourseAManage'
import Adminlogin from '../pages/Admin-pages/Adminlogin'
import {PrivateAdmin} from '../components/Private/VerifyAdmin'
import MentorMange from '../pages/Admin-pages/MentorMange'
import AdminHome from '../pages/Admin-pages/Adminhome/AdminHome'
function AdminRoutes() {
  return (
  
<>
<AdminNavBar></AdminNavBar>
<Routes>
 <Route path="/AdminLogin" element={<Adminlogin></Adminlogin>}></Route>
 <Route element={<PrivateAdmin/>}>
 <Route path="/adminHome" element={<AdminHome></AdminHome>}></Route>
 <Route path="/Categories" element={<Categories></Categories>}></Route>
 <Route path="/AddCategory" element={<AddCategoryForm></AddCategoryForm>}></Route>
 <Route path="/UserMangement" element={<UserManage></UserManage>}></Route>
 <Route path="/CourseManagement" element={<CourseAManage></CourseAManage>}></Route>
 <Route path="/mentorMangement" element={<MentorMange></MentorMange>}></Route>
</Route>
  
</Routes>


</>



  )
}

export default AdminRoutes