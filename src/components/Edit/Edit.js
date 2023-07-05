import React, { useEffect } from 'react'

function Edit(prop) {
    useEffect(() => {
     let post =  JSON.parse( localStorage.getItem('post')||[])
     },[]);
  return (
    <div>
        <h1>Edit Post</h1>
         
    </div>
  )
}

export default Edit