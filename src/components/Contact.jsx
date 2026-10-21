import React from 'react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const navigate=useNavigate();
  return (
    <div className='d-flex flex-column justify-content-center' style={{height:"80vh"}}>
      <h2>Programatically Navigation in React.js</h2>
      <div className='d-flex justify-content-center justify-content-between'>
      <button className='btn btn-primary' onClick={()=>navigate(-1)}>Back</button>
      <button className='btn btn-primary' onClick={()=>navigate("/",{replace:true})}>Home</button>
      <button className='btn btn-primary' onClick={()=>navigate(1)}>Forward</button>
      </div>
    </div>
  )
}

export default Contact