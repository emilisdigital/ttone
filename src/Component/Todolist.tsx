import React from "react"
import { useState } from "react"
import { Button, ButtonGroup, Checkbox, Icon, IconButton, TextField } from "@mui/material"
import { Delete } from "@mui/icons-material"
import DeleteIcon from '@mui/icons-material/Delete';
import { FilterValueType, TaskType } from "../App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
  }

export const Todolist = ({ title, tasks, removeTask, changeFilter, addTask, changeTaskStatus }: TodolistPropsType) => {

    let [inputValue, setInputValue] = useState('')
    let [error, setError] = useState<string | null>(null)

    const removeTodolist = () => { }

    const inputValueOnChange = (e: React.ChangeEvent<HTMLInputElement>) => { setInputValue(e.currentTarget.value); setError(null) }
    const onKeyPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (inputValue.trim() !== '') { addTask(inputValue.trim()); setInputValue('') }
            else { setError('Title is required') }
        }
    }
    const addTaskOnClick = () => {
        if (inputValue.trim() !== '') {
            addTask(inputValue.trim()); setInputValue('')
        } else { setError('Title is required') }
    }
    const changeFilterAll = () => changeFilter('all')
    const changeFilterActive = () => changeFilter('active')
    const changeFilterCompleted = () => changeFilter('completed')
    return (
        <div>
            <h3>{title}
                <IconButton onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <div>
                <TextField label="Size" id="outlined-size-small" defaultValue="Small" size="small"
                    error={!!error} value={inputValue} onChange={inputValueOnChange}
                    onKeyPress={onKeyPressEnter} className={error ? 'error' : ''}
                />
                <Icon baseClassName="fas" className="fa-plus-circle" color="primary" onClick={addTaskOnClick}>+</Icon>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {tasks.map(t => {
                    const removeTaskOnClick = () => removeTask(t.id)
                    const changeTaskStatusOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
                        let newChecked = e.currentTarget.checked
                        changeTaskStatus(t.id, newChecked)
                    }
                    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
                    return <li key={t.id}>
                        <Checkbox size="small" {...label} checked={t.isDone} onChange={changeTaskStatusOnClick} />
                        <span>{t.title}</span>
                        <IconButton aria-label="delete" size="small">
                            <DeleteIcon onClick={removeTaskOnClick} fontSize="small" />
                        </IconButton>
                    </li>
                })}
            </ul>
            <div>
                {/* <button onClick={changeFilterAll}>All</button> */}
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button onClick={changeFilterAll} >All</Button>
                    <Button onClick={changeFilterActive}>Active</Button>
                    <Button onClick={changeFilterCompleted}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}