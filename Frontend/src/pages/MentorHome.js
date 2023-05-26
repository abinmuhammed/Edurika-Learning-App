import React from 'react'
import Banner from '../components/Banner/Banner'
import Feautures from '../components/Feautures/Feautures'
import Footer from '../components/adminHome/Footer/Footer'
function MentorHome() {
    
  return (
   <div>
    
    <Banner Mentor="MentorCall" ></Banner>
    <Feautures Mentor="MentorCall"></Feautures>
    <Footer></Footer>
    
   </div>
  )
}

export default MentorHome