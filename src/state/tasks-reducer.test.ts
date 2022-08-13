import {TaskStateType} from "../App";

export type ActionsType = Action1Type | Action2Type

type Action1Type = {
  type: '1'
  id: string
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
      case '1': {
        return {...state};
      }
      case '2': {
        return {...state}
      }
  default:
    throw new Error('I don\'t understand this type')
  }
}




export const action1AC = (todolistID: string): Action1Type => {
  return {
    type: "1",
    id: todolistID
  }
}
export const action2AC = (title: string): Action2Type => {
  return {
    type: "2",
    title: title
  }
}
