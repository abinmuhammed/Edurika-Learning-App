import React from 'react'
import profile from '../../../images/Elon musk.png'

function SearchResult({item}) {
  return (

<>
<div className="Conversation">
      <img src={profile} className="Conversation-Image" alt="" />
      <span className="ConversationName">{item.FirstName}</span>
    </div></>
  )
}

export default SearchResult