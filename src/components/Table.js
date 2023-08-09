import React, { useContext } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { context } from './Layout';

export default function Table() {

  const contextAPI = useContext(context)
  const {onDelete, todoList : data , onStatusChange} = contextAPI ;
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
            data.length === 0 && <tr><td colSpan={6} style={{color:"gray",textAlign:"center",padding:"10px"}}>No Data Found</td></tr>
          }
          {data.map((item, index )=> {
            return (
              <tr key={item.id}>
                <td>{index+1}</td>
                <td className={`title-color-${item.priority}`}>{item.title}</td>
                <td>{item.priority}</td>
                <td><input type="checkbox" value={item.status} checked={item.status === 'complete' ? true : false} onChange={(e)=>onStatusChange(e,item.id)}/></td>
                <td>{item.status}</td>
                <td>
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>onDelete(item.id)}>Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
