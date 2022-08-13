import {TaskStateType} from "../App";


export type ActionsType = RemoveTaskActionType | Action2Type

type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  todolistID: string
  taskID: string
}
type Action2Type = {
  type: '2'
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
      case '2': {
        return {...state}
      }
  default:
    throw new Error('I don\'t understand this type')
  }
}




export const removeTaskAC = (todolistID: string,taskID: string ): RemoveTaskActionType => {
  return {
    type: "REMOVE-TASK", todolistID: todolistID, taskID: taskID
  }
}
export const action2AC = (title: string): Action2Type => {
  return {
    type: "2",
    title: title
  }
}
