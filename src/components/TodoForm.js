import React, { useContext } from 'react'
import Button from '@mui/material/Button'
import { Input } from '@mui/material'
import { context } from './Layout'

function TodoForm() {
  const contextAPI = useContext(context)
  const {obj,setObj,onChange,onSmash,titleErr}= contextAPI;

  return (
    <div className='todo-form-container'>
        <div className='todo-form'>
         <Input type="text" value={obj.title} name="title" placeholder="enter title" className={`text-input ${titleErr && 'err'}`} onChange={onChange}/>
         <br/>
         <span style={{color:"red"}}>{titleErr && 'field Required'}</span>
         <br/>
         <label>Priority :- </label><br/>
         <input type="radio" value={"high"} name="priority" checked={obj.priority ==="high" && true} onChange={onChange}/>
         <label>High</label>
         <input type="radio" value="medium" name="priority" checked={obj.priority ==="medium" && true} onChange={onChange}/>
         <label>Medium</label>
         <input type="radio" value="low" name="priority" checked={obj.priority ==="low" && true} onChange={onChange}/>
         <label>Low</label><br/>
         <Button variant="contained" onClick={onSmash}>Save</Button>
        </div>
    </div>
  )
}

export default TodoForm