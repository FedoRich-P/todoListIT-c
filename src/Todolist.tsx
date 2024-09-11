import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, filter: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
}

export const Todolist = (props: PropsType) => {
    const {title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus, todoListId} = props
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(todoListId, taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(todoListId, filter)
    }

    let  tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist =  tasks.filter(task => task.isDone)
    }

    const createTasksList = tasksForTodolist.map((task) => {

        const removeTaskHandler = () => {
            removeTask(todoListId, task.id)
        }

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = e.currentTarget.checked
            changeTaskStatus(todoListId, task.id, newStatusValue)
        }

        return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
            <span>{task.title}</span>
            <Button onClick={removeTaskHandler} title={'x'}/>
        </li>
    })


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title={'+'} onClick={addTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {createTasksList}
                    </ul>
            }
            <div>
                <Button
                    className={filter === 'all' ? 'active-filter' : ''}
                    title={'All'}
                    onClick={() => changeFilterTasksHandler('all')}/>
                <Button
                    className={filter === 'active' ? 'active-filter' : ''}
                    title={'Active'}
                    onClick={() => changeFilterTasksHandler('active')}/>
                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}