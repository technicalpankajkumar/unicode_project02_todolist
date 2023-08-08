import React from 'react'
import Input from './field/Input'

export default function PendingTodo({ todoList, remove, changePriority }) {


    return (<div className='todo-pending'>
        <p className='todo-title'>Pending Test</p>
        <div className='todo-pending-list'>
            {
                (todoList.length === 0) && <div className='no-todo-list'><span style={{ color: "gray" }}>No Todo List</span></div>
            }
            {
                todoList.map((data, index) => {
                    return <div className='todo-lists' key={data.id}>
                        <Input type='checkbox' name={data.priority} id={data.id} onChange={changePriority} />
                        <p className={`priority-color-${data.priority} title-paragraph`} title={`title:- ${data.title}`}>{data.title}</p>
                        <i className="bi bi-trash3 delete-icon" onClick={(e) => remove(e, data.id)}></i>
                    </div>
                })
            }
        </div>
    </div>)
}