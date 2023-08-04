import React from 'react'
import Input from './field/Input'

export default function PendingTodo({todoList,remove,changePriority}) {


    return (<div className='todo-pending'>
        <p className='todo-title'>Pending Tast</p>
        <div className='todo-pending-list'>
            {
                todoList.map((data, index) => {
                    return <div className='todo-lists' key={data.id}>
                        <Input type='checkbox' name={data.priority} id={data.id} onChange={changePriority} />
                        <p
                            className={`priority-color-${data.priority}`}
                            style={{ width: "350px", padding: "0px 6px" }}
                        >{data.title}</p>
                        <i className="bi bi-trash3 delete-icon" onClick={(e) => remove(e, data.id)}></i>
                    </div>
                })
            }
        </div>
    </div>)
}