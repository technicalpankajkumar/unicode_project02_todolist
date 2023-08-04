import './App.css';
import React,{useEffect, useState} from 'react'
import { v4 as uuid } from 'uuid'
import FormTodo from './component/FormTodo';
import CompleteTodo from './component/CompleteTodo';
import PendingTodo from './component/PendingTodo';

function App() {

  const uniqueId = uuid();

  const [todoList, setTodoList] = useState([])
  const [todoList2, setTodoList2] = useState([])
  const [oneList, setOneList] = useState({ id: "hjdfjasdh", title: "", priority: "low" })

  useEffect(()=>{
    setTodoList(JSON.parse(localStorage.getItem("todoList")) || [])
    setTodoList2(JSON.parse(localStorage.getItem("todoList2")) || [])
  },[])

  const onChange = (e) => {
      setOneList(pre => ({ ...pre, title: e.target.value }))
  }
  const onClick = (e) => {
      console.log(e.target.value)
      setOneList(pre => ({ ...pre, priority: e.target.value }))
  }
  const onAdd = () => {
      setTodoList(pre => [...pre, { id: uniqueId, ...oneList }])
      //localStorage save
      let getLocalStorageData = JSON.parse(localStorage.getItem("todoList")) || []
      localStorage.setItem("todoList",JSON.stringify([...getLocalStorageData,{ id: uniqueId, ...oneList }]))
      
      //clear previous data in the field
      setOneList({ title: "", priority: "low" })
  }
  const changePriority = (e) => {
      let newData = todoList.find(data => data.id === e.target.id)
      setTodoList2(pre => [...pre, newData])
      let oldData = todoList.filter(data => data.id !== e.target.id)
      setTodoList(oldData)

      //localStorage code
      let getLocalStorageData = JSON.parse(localStorage.getItem("todoList"))
      let newlocalData = getLocalStorageData.find(data => data.id === e.target.id)

      let preData = JSON.parse(localStorage.getItem("todoList2")) || []
      localStorage.setItem("todoList2",JSON.stringify([...preData,newlocalData]))

      let oldlocalData = getLocalStorageData.filter(data => data.id !== e.target.id)
      localStorage.setItem("todoList",JSON.stringify(oldlocalData))
  }

  const changePriority2 = (e) => {
      let newData = todoList2.find(data => data.id === e.target.id)
      setTodoList(pre => [...pre, newData])

      let oldData = todoList2.filter(data => data.id !== e.target.id)
      setTodoList2(oldData)

      //localStorage code
      let getLocalStorageData = JSON.parse(localStorage.getItem("todoList2"))
      let newlocalData = getLocalStorageData.find(data => data.id === e.target.id)

      let preData = JSON.parse(localStorage.getItem("todoList")) || []
      localStorage.setItem("todoList",JSON.stringify([...preData,newlocalData]))

      let oldlocalData = getLocalStorageData.filter(data => data.id !== e.target.id)
      localStorage.setItem("todoList2",JSON.stringify(oldlocalData))
  }

  const onClear = () => {
      setTodoList2([])
  }


//delete not working...
  const remove = (e, id) => {
      let selectNode = e.target.parentNode.parentNode.className;

      if (selectNode === "todo-pending-list") {
        let newData = todoList.filter(data => data.id !== id)
          setTodoList(newData)
 
          //localStorage code 
        let totallistStorage = JSON.parse(localStorage.getItem("todoList")) || []
          let newlocalData = totallistStorage.filter(data => data.id !== id);
          localStorage.setItem("todoList",JSON.stringify(newlocalData))

      } else {
          let newData = todoList2.filter(data => data.id !== id)
          setTodoList2(newData)

           //localStorage code 
        let totallistStorage2 = JSON.parse(localStorage.getItem("todoList2")) || []
        let oldlocalData = totallistStorage2.filter(data => data.id !== e.target.id)
        localStorage.setItem("todoList",JSON.stringify(oldlocalData))
      }
  }

  return (
    <div className='todo-container'>
      <div className="todo">
        <FormTodo onChange={onChange} onAdd={onAdd} oneList={oneList} onClear={onClear} onClick={onClick}/>
        <CompleteTodo todoList2={todoList2} changePriority2={changePriority2} remove={remove} />
        <PendingTodo todoList={todoList} remove={remove} changePriority={changePriority}/> 
      </div>
    </div>
  );
}

export default App;
