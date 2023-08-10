import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from './Table';
import Filter from './Filter';
import ClearArchive from './ClearArchive';
import { context } from './Layout';

export default function ArchiveDOM({ openArchive, setOpenArchive }) {

  const contextApi = React.useContext(context)
  const { archiveValue, setArchiveValue,setRender } = contextApi;
  const [searchArchive, setSearchArchive] = useState({ title: "", status: "none", priority: "none" })

  const handleClose = () => {
    setOpenArchive(false);
  };
 
  const onDelete = () => {

  }
  const onClearSearchArchive = () => {
    setSearchArchive({ title: "", status: "none", priority: "none" })
  }
  const filterChangeArchive = (e) => {
    const { name, value } = e.target;
    setSearchArchive(pre => ({ ...pre, [name]: value }))
  }

  const onUnArchive =()=>{
        let localData = JSON.parse(localStorage.getItem("archiveLists")) || []
        let localTodoData = JSON.parse(localStorage.getItem("todoLists")) || []

        localStorage.setItem("todoLists", JSON.stringify([...localTodoData, ...localData]))
        localStorage.setItem("archiveLists", JSON.stringify([]))
        setRender(pre => !pre)
        setOpenArchive(false)
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={openArchive}
        onClose={handleClose}
      >
        <DialogTitle>Archive Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* ARCHIVE DATA START HERE */}
            <div style={{ border: "1px solid gray", borderRadius: "4px", marginTop: "10px" }}>
              <Filter
                search={searchArchive}
                filterChange={filterChangeArchive}
                onClearSearch={onClearSearchArchive}
              >
                <ClearArchive isArchiveDialog={true} onUnArchive={onUnArchive} />
              </Filter>
              <Table archiveButton={true} data={archiveValue} onDelete={onDelete} search={searchArchive} />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}