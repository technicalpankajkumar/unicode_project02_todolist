import React, { createContext, useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import { v4 as uuid } from 'uuid'
import Table from './Table'
import Filter from './Filter'
import ClearArchive from './ClearArchive'

export const context = createContext()

function Layout() {
    let uniqueId = uuid()
    const [obj, setObj] = useState({ id: uniqueId, title: "", priority: "low", status: "pending" })
    const [todoList, setTodoList] = useState([])
    const [titleErr, setTitleErr] = useState(false)
    const [render, setRender] = useState(false)

    const [search, setSearch] = useState({ title: "", status: "", priority: "" })
    const [archiveValue, setArchiveValue] = useState([])

    useEffect(() => {
        setTodoList(JSON.parse(localStorage.getItem("todoLists")) || [])
        setArchiveValue(JSON.parse(localStorage.getItem("archiveLists")) || [])
    }, [render])

    const onChange = (e) => {
        const { name, value } = e.target;
        setObj(pre => ({ ...pre, [name]: value }))
        setTitleErr(false)
    }

    const onSmash = () => {
        let storageList = JSON.parse(localStorage.getItem("todoLists")) || []

        if (Object.values(obj).every(item => item !== '')) {
            localStorage.setItem("todoLists", JSON.stringify([...storageList, { id: uniqueId, ...obj }]))

            setObj({ title: "", priority: "low", status: "pending" })
            setTitleErr(false)
            setRender(!render)
        }
        else {
            setTitleErr(true)
        }
    }

    const onStatusChange = (e, id) => {
        let localStore = JSON.parse(localStorage.getItem("todoLists") || [])
        let obj = localStore.find(item => item.id === id)
        let index = localStore.findIndex(item => item.id === id)

        if (e.target.checked) {
            localStore[index] = { ...obj, status: "complete" }
            localStorage.setItem("todoLists", JSON.stringify(localStore))
            setRender(!render)
        } else {
            localStore[index] = { ...obj, status: "pending" }
            localStorage.setItem("todoLists", JSON.stringify(localStore))
            setRender(!render)
        }
    }

    const onDelete=(id)=>{
        let localStore = JSON.parse(localStorage.getItem("todoLists") || [])
         const index = localStore.findIndex(item => item.id == id)
         
         localStore.splice(index,1)
         localStorage.setItem("todoLists",JSON.stringify(localStore))
         setRender(!render)
    }

    // filter
    const filterChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setSearch(pre => ({ ...pre, [name]: value }))
    }
    const onSearch = () => {

    }
    const onSearchClear = () => {

    }

    // archive and clear completed task

    const onArchive = () => {
        let localData = JSON.parse(localStorage.getItem("archiveLists")) || []
        let localTodoData = JSON.parse(localStorage.getItem("todoLists")) || []

        localStorage.setItem("todoLists", JSON.stringify([...localTodoData,...localData]))
        localStorage.setItem("archiveLists", JSON.stringify([]))
        setRender(!render)
    }

    const onClearCompletedTask = () => {
        let localData = JSON.parse(localStorage.getItem("archiveLists")) || []

        let localTodoData = JSON.parse(localStorage.getItem("todoLists")) || []
        let completedData = localTodoData.filter(item => item.status === 'complete')
        let pendingData = localTodoData.filter(item => item.status === 'pending')

        localStorage.setItem("archiveLists", JSON.stringify([...localData, ...completedData]))
        localStorage.setItem("todoLists", JSON.stringify(pendingData))

        setRender(!render)
    }

    return (
        <context.Provider
            value={{
                obj,setObj, onChange,
                onSmash, titleErr,
                search, onSearch,
                onSearchClear, filterChange,
                onArchive, onClearCompletedTask,
                archiveValue , onDelete, todoList , onStatusChange
            }}>
            <TodoForm />
            <div style={{ border: "1px solid gray", borderRadius: "4px", marginTop: "10px" }}>
                <Filter />
                <Table/>
                <ClearArchive />
            </div>
        </context.Provider>
    )
}

export default Layout