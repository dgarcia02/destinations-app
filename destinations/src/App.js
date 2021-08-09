import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const App = () => {
    const [newImage, setNewImage] = useState('')
    const [newLocation, setNewLocation] = useState('')
    const [newLanguage, setNewLanguage] = useState('')
    const [newPopulation, setNewPopulation] = useState(0)
    const [newDestinations, setNewDestinations] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:3000/destinations")
            .then((response) => {
                setNewDestinations(response.data)
            })
    })

    // this is the handler to set the new image
    const handleNewImage = (event) => {
        // grabs the value in the input tag
        setNewImage(event.target.value)
    }

    // handler to set the new location
    const handleNewLocation = (event) => {
        setNewLocation(event.target.value)
    }

    // handler to set new language
    const handleNewLanguage = (event) => {
        setNewLanguage(event.target.value)
    }

    // handler to set new population
    const handleNewPopulation = (event) => {
        setNewPopulation(event.target.value)
    }

    // this is the handler to submit the new destination form
    const handleNewDestinationsSubmit = (event) => {
        event.preventDefault()
        axios.post(
            "http://localhost:3000/destinations",
            {
                image: newImage,
                location: newLocation,
                language: newLanguage,
                population: newPopulation
            }
        )
        .then(() => {
            axios
                .get("http://localhost:3000/destinations")
                .then((response) => {
                    setNewDestinations(response.data)
                })
        })
        // this will reset the form inputs and will be blank after clicking create button
        event.currentTarget.reset()
    }

    // this is the handler for the delete button
    const handleDelete = (destinationData) => {
        axios
            .delete(`http://localhost:3000/destinations/${destinationData._id}`)
            .then(() => {
                axios
                    .get('http://localhost:3000/destinations')
                    .then((response) => {
                        setNewDestinations(response.data)
                    })
            })
    }

    // this is the handler for edit form
    const handleEdit = (event, destinationData) => {
        event.preventDefault()
        axios
            .put(`http://localhost:3000/destinations/${destinationData._id}`,
                {
                    location: newLocation,
                    image: newImage,
                    language: newLanguage,
                    population: newPopulation
                }
            )
            .then(() => {
                axios
                    .get("http://localhost:3000/destinations")
                    .then((response) => {
                        setNewDestinations(response.data)
                    })
            })
    }



// rendering to the browser
//////////////////////////////
    return (
        <main>


            <h1>Destinations</h1>
            <section>
                <details>
                <summary>New Destination</summary>
                    <form onSubmit={ handleNewDestinationsSubmit }>
                        Location: <input type="text" onChange={ handleNewLocation } /><br/>
                        Image: <input type="text" onChange={ handleNewImage } /><br/>
                        Language: <input type="text" onChange={ handleNewLanguage } /><br/>
                        Population: <input type="text" onChange={ handleNewPopulation } /><br/>
                        <input type="submit" value='Create New Destination' />
                    </form>
                </details>
            </section>

            <section>
                <h2>Destinations</h2>
                <>
                    {
                        newDestinations.map((destination) => {
                            return <>
                                {
                                    <>Image: <img src={destination.image} /> </>
                                }<br/>
                                {
                                    <>Location: {destination.location}</>
                                }<br/>
                                {
                                    <>Language Spoken: {destination.language}</>
                                }<br/>
                                {
                                    <>Population: {destination.population}</>
                                }<br/>

                                <details>
                                    <summary>Edit Destination</summary>
                                        <form onSubmit={ (event) => { handleEdit (event, destination)} } >
                                            Location: <input type="text" onChange={ handleNewLocation } /> <br/>
                                            Image: <input type="text" onChange={ handleNewImage } /> <br/>
                                            Language: <input type="text" onChange={ handleNewLanguage } /> <br/>
                                            Population: <input type="text" onChange={ handleNewPopulation } /> <br/>
                                            <input type="submit" value='Update Destination' />
                                        </form>
                                </details>

                                <button onClick={ (event) => {handleDelete(destination) } }>Delete</button>

                            </>
                        })
                    }
                </>
            </section>
        </main>
    )
}

export default App;
