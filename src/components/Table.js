import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import ReactPaginate from 'react-paginate';
import AlertDialog from './AlertDialog';
import DeleteAlertDialog from './DeleteAlertDialog';

export default function Table({ itemsPerPage = 5, data, archiveButton, onDelete, onStatusChange, search }) {


  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setItemOffset(0)
  }, [search])

  let slicedRecord = [...data];

  //filter function always run.....
  if (search.title || search.status != 'none' || search.priority != 'none') {

    slicedRecord = slicedRecord.filter(todo => {
      return ((todo.title ? todo.title.toLowerCase().includes(search.title.toLowerCase()) : true))
    })

    if (search.status != 'none') {
      slicedRecord = slicedRecord.filter(todo => {
        return (todo.status ? todo.status === search.status : true)
      })
    }

    if (search.priority != 'none') {
      slicedRecord = slicedRecord.filter(todo => {
        return (todo.priority ? todo.priority === search.priority : true)
      })
    }

  }
  else {
    slicedRecord = [...data]
  }


  //pagination code

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = slicedRecord.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(slicedRecord.length / itemsPerPage);

  // Invoke when user click to request another page.

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % slicedRecord.length;
    setItemOffset(newOffset);
  };

  //

  return (
    <div className='todo-table-container'>
      <table className="todo-table">
        <thead>
          <tr>
            <th>SN</th>
            <th>TITLE</th>
            <th>PRIORITY</th>
            {
              !archiveButton && <th>CHANGE STATUS</th>
            }
            <th>STATUS</th>
            {
              !archiveButton && <th>ACTION</th>
            }

          </tr>
        </thead>
        <tbody>
          {
            currentItems.length != 0 ?
              currentItems.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1 + itemOffset}</td>
                    <td className={`title-color-${item.priority}`}>{item.title}</td>
                    <td>{item.priority}</td>
                    {

                      !archiveButton && <td><input
                        type="checkbox" value={item.status}
                        checked={item.status === 'complete' ? true : false}
                        onChange={(e) => onStatusChange(e, item.id)}
                      /></td>
                    }
                    <td>{item.status}</td>
                    {
                      !archiveButton && <td>
                        {
                          item.status !== 'complete'
                            ?
                            <DeleteAlertDialog onDelete={onDelete} deleteId={item.id} />
                            :
                            <AlertDialog />
                        }

                      </td>
                    }
                  </tr>
                );
              })
              : <tr><td colSpan={6} style={{ color: "gray", textAlign: "center", padding: "10px" }}>No Data Found</td></tr>
          }
        </tbody>
      </table>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          className='pagination-class'
          pageClassName="pageClassName"
          activeClassName="pagination-active-page"
          disabledClassName="pagination-disabled-page"
        />
      </div>
    </div>
  );
}
