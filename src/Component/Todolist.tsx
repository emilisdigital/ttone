import { FilterValueType } from "../App"

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    task: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValueType) => void
}

export const Todolist = ({ title, task, removeTask, changeFilter }: TodolistPropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {task.map(t =>
                    <li key={t.id}>
                        <input type='checkbox' checked={t.isDone} /><span>{t.title}</span><button onClick={() => removeTask(t.id)}>X</button></li>)}
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}