import React, { memo} from 'react'
import Input from './field/Input'
import Button from './field/Button'

function FormTodo({onChange,onAdd,oneList,onClear,onClick}) {

    return (
        <div className='todo-form'>
            <p className='todo-title'>TodoList Form</p>
            <form>
                <div>
                    <Input
                        type="text"
                        name="title"
                        id="title"
                        value={oneList.title}
                        className="todo-form-input"
                        onChange={onChange}
                    />
                    <Button
                        type="button"
                        className="btn todo-add-btn"
                        onClick={onAdd}>ADD TODO
                    </Button>
                </div>
                <div>
                    <p style={{ fontSize: "14px", marginBottom: "5px", padding: "5px 0px", color: "gray" }}>Priority</p>
                    <div className='todo-priority-check'>
                        <Input type='radio' name="priority" value="high" id="high" className="todo-high" onChange={onClick} checked={oneList.priority === "high"} />
                        <label >high</label>
                        <Input type='radio' name="priority" value="medium" id="medium" className="todo-medium" onChange={onClick} checked={oneList.priority === "medium"} />
                        <label>medium</label>
                        <Input type='radio' name="priority" value="low" id="low" className="todo-low" onChange={onClick} checked={oneList.priority === "low"} />
                        <label>low</label>
                    </div>
                    <Button type="button" className="btn todo-clear-btn" onClick={onClear}>Clear Completed Test</Button>
                </div>
            </form>
        </div>
    )
}

export default memo(FormTodo)