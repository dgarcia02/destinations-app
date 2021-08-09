import React, { useState, useEffect } from 'react'
import '../App.css'
import NewUserForm from './NewUserForm'
import axios from 'axios'


const Auth = (props) => {
    // =============== useStates ============== //
    // this is set to true because that way it will give the user the option to login in the beginning
    const [toggleLogin, setToggleLogin] = useState(true)
    const [toggleError, setToggleError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [toggleLogout, setToggleLogout] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    // =============== Handles ============== //
    const handleCreateUser = (userObj) => {
        // post to create a new user to the database
        axios.post(
            "http://localhost:3001/newaccount", userObj)
            .then((response) => {
                // if the user inputs a unique username then it will set these new useStates
                if(response.data.username){
                    console.log(response);
                    // these will make it so no errors will show
                    setToggleError(false)
                    setErrorMessage('')
                    // this will set the currentUser useState the username value
                    setCurrentUser(response.data)
                    // handleToggleLogout()
                // if the user does not put a unique username then it will log these errors
                } else {
                    setErrorMessage(response.data)
                    setToggleError(true)
                }
            })
    }

    return(
        <div>
            <p>testing</p>
            <NewUserForm handleCreateUser={ handleCreateUser } toggleError={ toggleError } errorMessage={errorMessage}/>
        </div>
    )
}

export default Auth;
