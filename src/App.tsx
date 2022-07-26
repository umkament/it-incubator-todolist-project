import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
  id: string,
  title: string
  filter: FilterValueType
}
export type TaskStateType = {
  [key: string]: Array<TasksType>
}

export function App() {
  console.log('App rendered')
  function removeTask (id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    tasksObj[todolistId] = tasks.filter(t=> t.id !== id)
    setTasks({...tasksObj})
  }

  function addTask(title: string, todolostId: string) {
    let tasks = tasksObj[todolostId]
    let newTask = {id: v1(), title: title, isDone: false}
    tasksObj[todolostId] = [...tasks, newTask]
    setTasks({...tasksObj})
  }

  function changeTaskStatus(taskID: string, isDone:boolean, todolostId: string) {
    let tasks = tasksObj[todolostId]
    let task = tasks.find(t=>t.id === taskID)
    if(task){
      task.isDone=isDone;
      setTasks({...tasksObj})
    }
  }

  function changeTasksFilter (value: FilterValueType, todolistId: string) {
    let todolist = todolists.find(tl=>tl.id===todolistId)
    if(todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistID1, title: "what to watch", filter: "all"},
    {id: todolistID2, title: "list for to do", filter: "completed"}
  ])

  function removeTodolist(todolistId: string) {
    let removedTodolist = todolists.filter((tl)=>tl.id !== todolistId)
    setTodolists(removedTodolist)

    delete tasksObj[todolistId]
    setTasks({...tasksObj})
  }

  let [tasksObj, setTasks] = useState<TaskStateType>( {
    [todolistID1]: [
      {id: v1(), isDone: true, title: "interstellar"},
      {id: v1(), isDone: false, title: "terminator"},
      {id: v1(), isDone: true, title: "true detective"},
      {id: v1(), isDone: false, title: "avatar"}
    ],
    [todolistID2]: [
      {id: v1(), isDone: true, title: "вымыть руки"},
      {id: v1(), isDone: false, title: "кушать"},
      {id: v1(), isDone: true, title: "чистить зубы"},
      {id: v1(), isDone: false, title: "спать"}
    ]
  })

  function addTodolist (title: string) {
    debugger
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title: title
    }
  setTodolists([todolist, ...todolists])
      setTasks({
        ...tasksObj,
        [todolist.id]:[]
      })
  }

    return (
        <div className="App">
          <AddItemForm addItem={addTodolist}/>
          {
            todolists.map(tl =>{

              let tasksForTodolist = tasksObj[tl.id];
              if (tl.filter==="completed") {
                tasksForTodolist = tasksForTodolist.filter(t=>t.isDone)
              }
              if (tl.filter==="active") {
                tasksForTodolist = tasksForTodolist.filter(t=>!t.isDone)
              }
               return <Todolist
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  tasks={tasksForTodolist}
                  filter={tl.filter}
                  addTask={addTask}
                  removeTask={removeTask}
                  changeTasksFilter={changeTasksFilter}
                  changeTaskStatus={changeTaskStatus}
                  removeTodolist={removeTodolist}
            />})
          }
        </div>
    );
}


