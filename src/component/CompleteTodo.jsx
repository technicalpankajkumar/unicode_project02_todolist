import React from 'react'
import Input from './field/Input'

export default function CompleteTodo({todoList2,changePriority2,remove}){

    return ( <div className='todo-complete'>
    <p className='todo-title'>Complete Test</p>
    <div className='todo-complete-list'>
        {
            todoList2.map((data, index) => {
                return <div className='todo-lists' key={data.id}>
                    <Input type='checkbox' name={data.priority} id={data.id} checked onChange={changePriority2} />

                    <p className={`priority-color-${data.priority} title-paragraph`}
                        
                    ><del>{data.title}</del></p>
                    <i className="bi bi-trash3 delete-icon" onClick={(e) => remove(e, data.id)}></i>
                </div>
            })
        }
    </div>
</div>
)
}