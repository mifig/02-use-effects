import React, { useImperativeHandle, useRef } from "react"

const LoginInput = React.forwardRef(({ name, classes, inputState, inputChangeHandler, validateInputHandler }, ref) => {
  const inputRef = useRef()
  
  const activate = () => {
    inputRef.current.focus()
  }
  
  useImperativeHandle(ref, () => {
    return {
      activate: activate
    }
  })
  
  return (
    <div
      className={`${classes.control} ${
        inputState.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={name}>{name}</label>
      <input
        ref={inputRef}
        type={name}
        id={name}
        value={inputState.value}
        onChange={inputChangeHandler}
        onBlur={validateInputHandler}
      />
    </div>
  )
})

export default LoginInput