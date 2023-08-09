import React,{useContext} from 'react'
import { Button, Input } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { context } from './Layout';


export default function Filter() {

    const contextAPI =useContext(context)
    const {search,onSearch,onSearchClear,filterChange}= contextAPI;

    return <div className='filter-container'>
        <Input type="text" value={search.title} placeholder='Search by Title' className='filter-input' onChange={filterChange}/>
        &nbsp;
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
                labelId="priority-select-label"
                id="priority-select"
                value={search.priortiy}
                label="Priority"
                name="priority"
                onChange={filterChange}
            >
                <MenuItem value="none">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={'high'}>High</MenuItem>
                <MenuItem value={'medium'}>Medium</MenuItem>
                <MenuItem value={'low'}>Low</MenuItem>
            </Select>
        </FormControl>
        &nbsp;
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
                labelId="status-select-label"
                id="status-select"
                value={search.status}
                label="Status"
                name="status"
                onChange={filterChange}
            >
                <MenuItem value="none">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={'complete'}>Complete</MenuItem>
                <MenuItem value={'pending'}>Pending</MenuItem>
            </Select>
        </FormControl>
        &nbsp;
        <Button variant="contained" color="primary">Search Now</Button>
        &nbsp;
        <Button variant="contained" color="error">Clear Now</Button>
    </div>
}