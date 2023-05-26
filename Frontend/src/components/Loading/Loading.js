import React from 'react'
import stylehere from './Loading.module.css'

function Loading(props) {
  return (
   
    <div className={stylehere.loader}>
    <div className={stylehere.loader2}>
       {props.Title?props.Title:Loading} 
      <span></span>
    </div>
  </div>
  )
}

export default Loading