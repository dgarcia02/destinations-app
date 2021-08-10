import React, { useState, useEffect } from 'react'
import '../App.css'
import NewUserForm from './NewUserForm'
import LoginForm from './LoginForm'
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
            "http://localhost:3000/newaccount", userObj)
            .then((response) => {
                // if the user inputs a unique username then it will set these new useStates
                if(response.data.username){
                    // console.log(response);
                    // these will make it so no errors will show
                    setToggleError(false)
                    setErrorMessage('')
                    // this will give the currentUser useState the username value
                    setCurrentUser(response.data)
                    handleToggleLogout()
                // if the user does not put a unique username then it will log these errors
                } else {
                    setErrorMessage(response.data)
                    setToggleError(true)
                }
            })
    }

    const handleLogin = (userObj) => {
        // console.log(userObj);
        axios.put("http://localhost:3000/login", userObj)
        .then((response) => {
            if(response.data.username) {
                console.log(response);
                setToggleError(false)
                setErrorMessage('')
                setCurrentUser(response.data)
                handleToggleLogout()
            } else {
                setToggleError(true)
                setErrorMessage(response.data)
            }
        })
    }

    const handleLogout = () => {
        setCurrentUser({})
        handleToggleLogout()
    }

    const handleToggleForm = () => {
        setToggleError(false)
        if (toggleLogin === true) {
            setToggleLogin(false)
        } else {
            setToggleLogin(true)
        }
    }

    const handleToggleLogout = () => {
        if(toggleLogout) {
            setToggleLogout(false)
        } else {
            setToggleLogout(true)
        }
    }

    return(
        <div>
            { toggleLogout ?
                <button onClick={ handleLogout }>Logout</button>
                :
                <div>
                    { toggleLogin ?
                        <LoginForm handleLogin={handleLogin} toggleError={toggleError} errorMessage={errorMessage} />
                        :
                        <NewUserForm handleLogin={handleLogin} toggleError={toggleError} errorMessage={errorMessage} />
                    }
                    <button onClick={ handleToggleForm }>{toggleLogin ? 'Need an account?' : 'Already have an account?'}</button>
                </div>
            }

            { currentUser.username ?
                <div>
                    <h4>Hello {currentUser.username}</h4>
                </div>
                :
                null
            }
        </div>
    )
}

export default Auth;
