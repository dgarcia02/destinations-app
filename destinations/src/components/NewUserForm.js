import React, { useState } from 'react'
import '../App.css'

const App = (props) => {
    // useStates for the new user
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const triggerCreateUser = (event) => {
        event.preventDefault()
        let userObj = {
            // the value comes from the useState
            username: username,
            password: password
        }
        // this links to the handle in the original App.js file
        props.handleCreateUser(userObj)
    }

    return(
        <div>
            <h1>Create an Account</h1>
            {/* this is the form that asks for the user's username and password for the new user*/}
            <form onSubmit={ triggerCreateUser }>
                {/* username input tag that sets the new username to the input value by using (event.target.value) */}
                <input type='text' placeholder='username' onChange={ (event) => { setUsername(event.target.value) } } />
                <input type='password' placeholder='password' onChange={ (event) => { setPassword(event.target.value) } } />
                {props.toggleError ?
                    <h5>{props.errorMessage}</h5>
                    :
                    null
                }
                <input type='submit' value='Create' />
            </form>
        </div>
    )
}

export default App;
