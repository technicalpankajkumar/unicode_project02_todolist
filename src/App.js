import './App.css';
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import FormTodo from './component/FormTodo';
import CompleteTodo from './component/CompleteTodo';
import PendingTodo from './component/PendingTodo';

function App() {

  const uniqueId = uuid();

  const [todoList, setTodoList] = useState([])
  const [todoList2, setTodoList2] = useState([])
  const [render, setRender] = useState(false)
  const [errMsg, setErrMes] = useState(false)
  const [oneList, setOneList] = useState({ id: uniqueId, title: "", priority: "low" })

  useEffect(() => {
    setTodoList(JSON.parse(localStorage.getItem("todoList")) || [])
    setTodoList2(JSON.parse(localStorage.getItem("todoList2")) || [])
  }, [render])

  const onChange = (e) => {
    setOneList(pre => ({ ...pre, title: e.target.value }))
    setErrMes(false)
  }
  const onClick = (e) => {
    setOneList(pre => ({ ...pre, priority: e.target.value }))
  }
  const onAdd = () => {
    // setTodoList(pre => [...pre, { id: uniqueId, ...oneList }])
    //localStorage save
    if (Object.values(oneList).every(item => item !== "")) {
      let getLocalStorageData = JSON.parse(localStorage.getItem("todoList")) || []
      localStorage.setItem("todoList", JSON.stringify([...getLocalStorageData, { id: uniqueId, ...oneList }]))

      //clear previous data in the field
      setOneList({ title: "", priority: "low" })
      setErrMes(false)
      setRender(!render)
    }else{
      setErrMes(true)
    }

  }
  const changePriority = (e) => {
    //normal state management code
    // let newData = todoList.find(data => data.id === e.target.id)
    // setTodoList2(pre => [...pre, newData])
    // let oldData = todoList.filter(data => data.id !== e.target.id)
    // setTodoList(oldData)

    //localStorage code
    // let getLocalStorageData = JSON.parse(localStorage.getItem("todoList"))
    let newlocalData = todoList.find(data => data.id === e.target.id)

    // let preData = JSON.parse(localStorage.getItem("todoList2")) || []
    localStorage.setItem("todoList2", JSON.stringify([...todoList2, newlocalData]))

    let oldlocalData = todoList.filter(data => data.id !== e.target.id)
    localStorage.setItem("todoList", JSON.stringify(oldlocalData))

    //render component change after change data
    setRender(!render)
  }

  const changePriority2 = (e) => {
    //normal state management code ..
    // let newData = todoList2.find(data => data.id === e.target.id)
    // setTodoList(pre => [...pre, newData])

    // let oldData = todoList2.filter(data => data.id !== e.target.id)
    // setTodoList2(oldData)

    //localStorage code
    let newlocalData = todoList2.find(data => data.id === e.target.id)

    localStorage.setItem("todoList", JSON.stringify([...todoList, newlocalData]))

    let oldlocalData = todoList2.filter(data => data.id !== e.target.id)
    localStorage.setItem("todoList2", JSON.stringify(oldlocalData))

    //render component change after change data
    setRender(!render)
  }

  const onClear = () => {
    localStorage.setItem("achieveList",JSON.stringify(todoList2))
    setTodoList2([])
    localStorage.setItem("todoList2",JSON.stringify([]))
  }
  const onArchive =()=>{
    let achieve = JSON.parse(localStorage.getItem("achieveList")) || [] 
     if(achieve.length > 0){
      localStorage.setItem("todoList2",JSON.stringify(achieve))
      localStorage.setItem("achieveList",JSON.stringify([]))
     }
     setRender(!render)
  }


  //delete not working...
  const remove = (e, id) => {

    let selectNode = e.target.parentNode.parentNode.className;

    if (selectNode === "todo-pending-list") {
      // let newData = todoList.filter(data => data.id !== id)
      //   setTodoList(newData)

      //localStorage code 
      let deleteIndex = todoList.findIndex(data => data.id === id);
      todoList.splice(deleteIndex, 1)
      localStorage.setItem("todoList", JSON.stringify(todoList))

      //render component change after change data
      setRender(!render)
    } else {
      // let newData = todoList2.filter(data => data.id !== id)
      // setTodoList2(newData)

      //localStorage code 
      let deleteIndex = todoList2.findIndex(data => data.id === id)
      todoList2.splice(deleteIndex, 1)
      localStorage.setItem("todoList2", JSON.stringify(todoList2))

      //render component change after change data
      setRender(!render)
    }
  }

  return (
    <div className='todo-container'>
      <div className="todo">
        <FormTodo onChange={onChange} onAdd={onAdd} oneList={oneList} onClear={onClear} onClick={onClick} errMsg={errMsg}/>
        <CompleteTodo todoList2={todoList2} onClear={onClear} onArchive={onArchive} changePriority2={changePriority2} remove={remove} />
        <PendingTodo todoList={todoList} remove={remove} changePriority={changePriority} />
      </div>
    </div>
  );
}

export default App;
