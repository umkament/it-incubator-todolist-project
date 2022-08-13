import {TaskStateType} from "../App";
import {v1} from "uuid";


export type ActionsType = RemoveTaskActionType | AddTaskActionType

type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  todolistID: string
  taskID: string
}
type AddTaskActionType = {
  type: 'ADD-TASK'
  todolistID: string
  title: string
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

  export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
      case "REMOVE-TASK": {
        const stateCopy = {...state}
        const tasks = state[action.todolistID]
        const filteredTasks = tasks.filter(t=> t.id !== action.taskID)
        stateCopy[action.todolistID] = filteredTasks
        return stateCopy;
      }
      case 'ADD-TASK': {
        const stateCopy = {...state}
        const tasks = stateCopy[action.todolistID]
        const newTask = {id: v1(), title: action.title, isDone: false}
        const newArrayOfTasks = [newTask, ...tasks]
        stateCopy[action.todolistID] = newArrayOfTasks
        return stateCopy
      }
  default:
    throw new Error('I don\'t understand this type')
  }
}




export const removeTaskAC = (todolistID: string,taskID: string ): RemoveTaskActionType => {
  return {type: "REMOVE-TASK", todolistID: todolistID, taskID: taskID}
}
export const addTaskAC = (todolistID: string, title: string): AddTaskActionType => {
  return { type: "ADD-TASK", todolistID, title}
}
