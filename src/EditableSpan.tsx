import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
  title: string
  onChange: (newTitle: string) => void

}

export function EditableSpan(props: EditableSpanPropsType) {

  let [editMode, setEditMode] = useState<boolean>(false)
  let [title, setTitle] = useState('')

  const activateEditMode =()=> {
    setEditMode(true)
    setTitle(props.title)
  }
  const activateViewMode =()=> {
    setEditMode(false)
    props.onChange(title)
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
     ? <input onBlur={activateViewMode}
              value={title}
              autoFocus
              onChange={onChangeTitleHandler}
     />
     : <span onDoubleClick={activateEditMode}>{props.title}</span>
}