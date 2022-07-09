import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

export type FilterValueType = "all" | "active" | "completed"

export function App() {

  let [tasks, setTasks] = useState<Array<TasksType>>( [
    {id: 1, isDone: true, title: "interstellar"},
    {id: 2, isDone: false, title: "terminator"},
    {id: 3, isDone: true, title: "true detectiv"},
    {id: 4, isDone: false, title: "avatar"}
  ])
  let [filter, setFilter] = useState<FilterValueType>("all")

  function removeTask (id: number) {
    let filtredTasks = tasks.filter(t=> t.id !== id)
    setTasks(filtredTasks)
  }

  function changeTask (value: FilterValueType) {
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
                  removeTask={removeTask}
                  changeTask={changeTask}

               />
            </div>
        </div>
    );
}


