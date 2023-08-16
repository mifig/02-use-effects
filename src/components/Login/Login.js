import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import LoginInput from './LoginInput';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes("@") }
  } else if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes("@") }
  } else {
    return { value: "", isValid: false }
  }
}

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  } else {
    return { value: "", isValid: false }
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, 
    { value: "", isValid: null }
  )

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, 
    { value: "", isValid: null}
  )

  const authContext = useContext(AuthContext)

  useEffect((event) => {
    const timer = setTimeout(() => {
      console.log("Checking form validity!")
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      )
    }, 
    500)

    // Cleanup function - run whenever useEffect runs (so it runs before the next useEffect runs)
    return () => {
      clearTimeout(timer)
    }
  }, [emailState.isValid, passwordState.isValid])

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value })
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value })
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" })
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      authContext.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.activate()
    } else {
      passwordInputRef.current.activate()
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <LoginInput 
          ref={emailInputRef}
          name="email" 
          classes={classes} 
          inputState={emailState} 
          inputChangeHandler={emailChangeHandler} 
          validateInputHandler={validateEmailHandler} 
        />
        <LoginInput 
          ref={passwordInputRef}
          name="password" 
          classes={classes} 
          inputState={passwordState} 
          inputChangeHandler={passwordChangeHandler} 
          validateInputHandler={validatePasswordHandler} 
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
