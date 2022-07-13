import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"

export function App() {

  let [tasks, setTasks] = useState<Array<TasksType>>( [
    {id: v1(), isDone: true, title: "interstellar"},
    {id: v1(), isDone: false, title: "terminator"},
    {id: v1(), isDone: true, title: "true detectiv"},
    {id: v1(), isDone: false, title: "avatar"}
  ])
  let [filter, setFilter] = useState<FilterValueType>("all")

  function removeTask (id: string) {
    let filtredTasks = tasks.filter(t=> t.id !== id)
    setTasks(filtredTasks)
  }

  function addTask(title: string) {
    let newTask = {id: v1(), title: title, isDone: false}
    let newTasks = [...tasks, newTask]
    setTasks(newTasks)
  }

  function changeTaskStatus(taskID: string, isDone:boolean) {
    let task = tasks.find(t=>t.id === taskID)
    if(task){task.isDone=isDone}
    setTasks([...tasks])
  }

  function changeTasksFilter (value: FilterValueType) {
    setFilter(value)
  }

    let tasksForTodolist = tasks;
    if (filter==="completed") {
      tasksForTodolist = tasks.filter(t=>t.isDone)
    }
    if (filter==="active") {
      tasksForTodolist = tasks.filter(t=>!t.isDone)
    }

    return (
        <div className="App">
            <div>
               <Todolist
                  title="What to show"
                  tasks={tasksForTodolist}
                  filter={filter}
                  addTask={addTask}
                  removeTask={removeTask}
                  changeTasksFilter={changeTasksFilter}
                  changeTaskStatus={changeTaskStatus}
               />
            </div>
        </div>
    );
}


