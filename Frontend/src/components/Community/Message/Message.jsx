import React from 'react'
import '../Message/Message.css'
import propic from '../../../images/Elon musk.png'
import {format} from "timeago.js"

function Message({message,own}) {
  return (
    <div className={own ?' message own ':'message'}>
        <div className="messageTop m-1" >
            <img className='msgImg m-1 ' src={propic} alt="" />
            <p className='messageText m-2 '>{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>


    </div>
  )
}

export default Message