import React from 'react'
import Input from './field/Input'
import Button from './field/Button'

export default function CompleteTodo({ todoList2, changePriority2, onClear , onArchive}) {

    return (<div className='todo-complete'>
        <p className='todo-title complete-title'>
            <span>Complete Test</span>
            <span>
                <Button type="button" className="btn todo-achieve-btn" onClick={onArchive}> Archive </Button>
                <Button type="button" className="btn todo-clear-btn" onClick={onClear}>Clear Test</Button>
            </span>
        </p>
        <div className='todo-complete-list'>
            {
                (todoList2.length === 0) && <div className='no-todo-list'><span style={{ color: "gray" }}>No Todo List</span></div>
            }
            {
                todoList2.map((data, index) => {
                    return <div className='todo-lists' key={data.id}>
                        <Input type='checkbox' name={data.priority} id={data.id} checked onChange={changePriority2} />
                        <p className={`priority-color-${data.priority} title-paragraph`} title={`title:- ${data.title}`}><del>{data.title}</del></p>
                    </div>
                })
            }
        </div>
    </div>
    )
}