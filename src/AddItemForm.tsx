import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

  let [taskTitle, setTaskTitle] = useState("")
  let [error, setError] = useState<string>('')

  const taskTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
    /* if (e.currentTarget.value.trim() === "") {
       setError("title is required")
     }*/ // это условие лишнее
  }
  const taskTitleKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

    setError('')
    if (e.charCode === 13 && taskTitle.trim() !== "") {
      props.addItem(taskTitle.trim());
      setTaskTitle("")
    }
    if (e.charCode === 13 && taskTitle.trim() === "") {
      setError("title is required")
    }
  }

  const addTaskButtonClickHandler = () => {
    if (taskTitle.trim() !== "") {
      props.addItem(taskTitle.trim());
      setTaskTitle("")
    } else {
      setError("title is required")
    }
  }

  return (
     <div>
       <input
          value={taskTitle}
          onChange={taskTitleChangeHandler}
          onKeyPress={taskTitleKeyPressHandler}
          className={error ? "error" : ""}
       />
       <button onClick={addTaskButtonClickHandler}>+</button>
       {error && <div className="error-message">{error}</div>}
     </div>
  )
}