import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { context } from './Layout'

export default function ClearArchive({ isArchiveDialog, onClearCompletedTask, onUnArchive }) {

    const contextAPI = useContext(context)
    const { onArchive, archiveValue,unArchiveValue, todoList } = contextAPI;

    return (
        <>
            {
                isArchiveDialog ? <></> : <div style={{ padding: "4px", textAlign: "end" }}>
                    <Button variant='contained' color="primary" onClick={onArchive}>Archive {archiveValue.length}</Button>
                    &nbsp;
                    <Button variant='contained' color="error" onClick={onClearCompletedTask}>Clear Completed Task {todoList.filter(item => item.status === 'complete').length}</Button>
                </div>
            }
            {
                isArchiveDialog && <Button variant='contained' color="primary" onClick={onUnArchive}>Unarchive {unArchiveValue.length}</Button>
            }
        </>
    )
}