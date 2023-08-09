import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { context } from './Layout'

export default function ClearArchive(){

    const contextAPI = useContext(context)
    const {onArchive,onClearCompletedTask,archiveValue}=contextAPI;

    return <div style={{padding:"4px",textAlign:"end"}}>
        <Button variant='contained' color="primary" onClick={onArchive}>Archive {archiveValue.length}</Button>
        &nbsp;
        <Button variant='contained' color="error" onClick={onClearCompletedTask}>Clear Completed Task</Button>
     </div>
}