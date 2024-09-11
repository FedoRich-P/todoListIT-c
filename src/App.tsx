import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const firstListId = v1()
    const secondListId = v1()

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: firstListId, title: 'What i know', filter: 'all'},
        {id: secondListId, title: 'What i want  to know', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [firstListId]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Angular', isDone: false},
        ],
        [secondListId]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: true},
            {id: v1(), title: 'Angular', isDone: true},
        ],
    })


    const removeTask = (todoListId: string,taskId: string) => {
       setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id != taskId)})
    }

    const addTask = (todoListId: string, title: string) => {
        setTasks({...tasks, [todoListId]: [{id: v1(), title, isDone: false}, ...tasks[todoListId]]})
    }

    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map(todo => (todo.id === todoListId ? {...todo, filter} : todo)))
    }

    const changeTaskStatus = (todoListId: string,taskId: string, taskStatus: boolean) => {
       setTasks({...tasks, [todoListId]:tasks[todoListId].map(task=> task.id === taskId ? {...task, isDone: taskStatus} : task)})
    }

    const tasksList = todoLists.map(({id, title, filter}) => {
        return (
            <Todolist
                key={id}
                todoListId={id}
                title={title}
                tasks={tasks[id]}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        )
    })

    return (
        <div className="App">
            {tasksList}
        </div>
    );
}

export default App;