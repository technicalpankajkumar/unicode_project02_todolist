import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

export default function DeleteAlertDialog({ onDelete, deleteId }) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    toast.success("Thanks for closing !!")
  };

  const handleDelete = () => {
    onDelete(deleteId)
    toast.success("item is deleted !!")
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Alert !!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure delete item !!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
