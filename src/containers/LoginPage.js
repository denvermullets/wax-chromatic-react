import React from "react"
import LoginForm from "../components/LoginForm"

const LoginPage = (props) => {
  return (
    <>
      <LoginForm
        updateUsername={props.updateUsername}
        userLoggedIn={props.userLoggedIn}
        loggedIn={props.loggedIn}
      />
    </>
  )
}

export default LoginPage
