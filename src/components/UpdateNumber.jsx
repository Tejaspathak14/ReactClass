import React, {useState}from 'react'

const App = () => {
  const [numbers,setNumbers]=useState([
    {id:1,num:10},
    {id:2,num:20},
    {id:3,num:30},
    {id:4,num:40},
  ]);
   const plusTwo=()=>{
    setNumbers((prev)=>prev.map((row)=>({...row,num:row.num+2})));
    //  let tempNum=[...numbers];
    //  console.log(tempNum)
    //   for(let i=0;i<numbers.length;i++){
    //     tempNum[i]=tempNum[i]+2
    //   }
    //    setNumbers(tempNum)
   }
     
    return (
    <div>
      <h2>List of numbers:</h2>
      {
        numbers.map((row)=><h2 key={row.id}>{row.num}</h2>)
      }
      <button onClick={plusTwo}>Plus+2</button>
    </div>
  )
}

export default App