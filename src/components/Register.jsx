import React, { useState } from 'react'

const Registration = () => {
  const [check,setCheck]=useState(false);
    const [formData,setFormData]=useState({
        user:"",
        pwd:""
    });
    const handleForm=(event)=>{
          // event.preventDefault();
          const {name,value}=event.target;
          setFormData({...formData,[name]:value})

    }
    const handleSubmit=(e)=>{
           e.preventDefault();
          setCheck(true)
    }
  return (
    <div className='d-flex flex-column justify-content-center align-items-center' >
        <h2 className='bg-warning text-dark text-center mt-3 w-100'>Registration</h2>
        <form className='d-flex flex-column w-50' onSubmit={handleSubmit}>
            <input 
            type="text"
            name={"user"}
            value={formData.user}
            onChange={handleForm}
            placeholder='Enter user name'
            className='mt-3'
            />
            <input 
            type="password"
            name={"pwd"}
            value={formData.pwd}
            onChange={handleForm}
            placeholder='Enter password'
            className='mt-3'
            />
            <button type='submit' className='btn btn-primary mt-3'>Register</button>
        </form>
      {check && <DisplayReg user={formData.user} pwd={formData.pwd}/>}
    </div>
  )
}
const DisplayReg=(props)=>{
   const {user,pwd}=props;
   return (
    <div>
      <h3>User: {user}</h3>
      <h3>Pwd: {pwd}</h3>
      </div>
   )
}
export default Registration