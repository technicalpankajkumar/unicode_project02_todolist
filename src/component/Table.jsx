import React from 'react'
import Filter from './Filter'
import './table.css'

export default function Table() {

    return <div className='filter-table'>
        <Filter />
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Title</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>SN</td>
                        <td>Title</td>
                        <td>Priority</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}