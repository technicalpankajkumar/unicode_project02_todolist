import React from 'react'
import './filter.css'
import Input from './field/Input'

export default function Filter() {


    return (<div className='filter'>
        <div>
            <Input type="text" className="filter-title-search" placeholder="search by title"/>
        </div>
        &nbsp;
        <div>
            <select defaultValue={'default'} id="priority" className='filter-select-priority'>
                <option value="default" disabled >Priority --</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
        </div>
        &nbsp;
        <div>
            <select defaultValue={'default'} id="priority" className='filter-select-status'>
                <option value="default" disabled >Status --</option>
                <option value="complete">Complete</option>
                <option value="pending">Pending</option>
            </select>
        </div>
    </div>)
}