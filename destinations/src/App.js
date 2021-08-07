import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

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

    return (
        <main>
            <h1>Destinations</h1>
            <section>
                <form onSubmit={ handleNewDestinationsSubmit }>
                    Image: <input type="text" onChange={ handleNewImage } /><br/>
                    Location: <input type="text" onChange={ handleNewLocation } /><br/>
                    Language: <input type="text" onChange={ handleNewLanguage } /><br/>
                    Population: <input type="text" onChange={ handleNewPopulation } /><br/>
                    <input type="submit" value='Create New Destination' />
                </form>
            </section>
        </main>
    )
}

export default App;
