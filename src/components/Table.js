import React, { useContext } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { context } from './Layout';

export default function Table() {

  const contextAPI = useContext(context)
  const { onDelete, todoList: data, onStatusChange, search } = contextAPI;

  let slicedRecord = [...data];

  //filter function always run.....
  if (search.title || search.status || search.priority) {
    slicedRecord = slicedRecord.filter(todo => {
      return ((todo.title ? todo.title.toLowerCase().includes(search.title.toLowerCase()) : true))
    })

    if (search.status != 'none') {
      if (search.status != '') {
        slicedRecord = slicedRecord.filter(todo => {
          return (todo.status ? todo.status === search.status : true)
        })
      }
    }
    else {
      slicedRecord = [...data]
    }

    if (search.priority != 'none') {
      if (search.priority != '') {
        slicedRecord = slicedRecord.filter(todo => {
          return (todo.priority ? todo.priority === search.priority : true)
        })
      }

    }
    else {
      slicedRecord = [...data]
    }

  }


  return (
    <div className='todo-table-container'>
      <table className="todo-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>TITLE</th>
            <th>PRIORITY</th>
            <th>CHANGE STATUS</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {
            data.length === 0 && <tr><td colSpan={6} style={{ color: "gray", textAlign: "center", padding: "10px" }}>No Data Found</td></tr>
          }
          {
            slicedRecord.length != 0 ?
              slicedRecord.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td className={`title-color-${item.priority}`}>{item.title}</td>
                    <td>{item.priority}</td>
                    <td><input type="checkbox" value={item.status} checked={item.status === 'complete' ? true : false} onChange={(e) => onStatusChange(e, item.id)} /></td>
                    <td>{item.status}</td>
                    <td>
                      <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => onDelete(item.id)}>Delete</Button>
                    </td>
                  </tr>
                );
              })
              : <tr><td colSpan={6} style={{ color: "gray", textAlign: "center", padding: "10px" }}>No Data Found</td></tr>
          }
        </tbody>
      </table>
    </div>
  );
}
