import React from 'react'
import './Feautures.css'
import card1 from '../../images/card1.png'
import card22 from '../../images/Scard2.png'
import card3 from '../../images/Scard3.png'
import card4 from '../../images/Scard4.png'
import card2 from '../../images/teach1.png'


function Feautures({Mentor}) {
  return (
    <div className=''>
 <div className=' col-4 ms-5 mt-4'>
<h3 className='text-light mb-4 ms-lg-4 what-text '>What features do we have to offer ?</h3>
 </div>
 <div className=' cardbox  justify-content-center mb-4 align-content-center'>


 <div className=''><img className='col-7 ' src= {Mentor?card2:card1}  alt="" /></div>
 <div className=''><img className='col-7' src={Mentor?card2:card22} alt="" /></div>
 <div className=''><img className='col-7' src={Mentor?card2:card3} alt="" /></div>
 <div className=''><img className='col-7' src={Mentor?card2:card4} alt="" /></div>
 </div > 
 

    </div>
  )
}

export default Feautures