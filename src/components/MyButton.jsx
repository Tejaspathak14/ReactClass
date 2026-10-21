import React from 'react'

const MyButton = ({getMsg}) => {
     alert("This is get Message function");
  return (
    <div>
        <button 
        className='btn btn-primary'
        onClick={getMsg}>Click Me</button>
    </div>
  )
}

export default React.memo(MyButton)