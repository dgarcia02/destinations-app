import React, { useState } from 'react'
import '../App.css'

const App = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const triggerLogin = (event) => {
        event.preventDefault()
        // setting up a variable that will be used in App.js
        // the value is from the useStates from lines 5 & 6
        let userObj = {
            username: username,
            password: password
        }
        // this is the props that the original App.js uses
        props.handleLogin(userObj)
    }

    return (
        <div>
            <h1>Login</h1>
            <form >
                <input type='text' placeholder='username' onChange={ (event) => {setUsername(event.target.value)} } />
                <input type='password' placeholder='password' onChange={ (event) => {setPassword(event.target.value)} } />
                { props.toggleError ?
                    <h5>{props.errorMessage}</h5>
                    :
                    null
                }
                <input type='submit' value='Login' />
            </form>
        </div>
    )

}

export default App
