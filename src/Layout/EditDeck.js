// Imports
import React, { useState, useEffect} from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { readDeck, updateDeck } from "../utils/api"
import DeckForm from "./DeckForm"

// Edits an existing deck and updates the API
function EditDeck () {
    // Deck ID retrieved from the path
    const { deckId } = useParams()
    const history = useHistory()
    // Empty deck provided
    const [deck, setDeck] = useState({})
    // Updates the deck in the API. Returns the user to the deck's page.
    const submitHandler = async (event) => {
        event.preventDefault()
        await updateDeck(deck)
        history.push(`/decks/${deckId}`)
    }
    // Loads the current deck from the API
    useEffect(() => {
        const abortcontroller = new AbortController()
        const loadDeck = async () => {
            const data = await readDeck(deckId)
            setDeck(data)
        }
        loadDeck()
        return () => {
            abortcontroller.abort()
        }
    }, [deckId])

    return (
        <>
        {/* Breadcrumb navigation */}
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to='/'>Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item">Edit Deck</li>
            </ol>
        </nav>
        {/* DeckForm access */}
        <div className="card border-dark">
            <h2 className="card-header">Edit Deck</h2>
            <DeckForm deck={deck} setDeck={setDeck} submitHandler={submitHandler} create={false}/>
        </div>
        </>
    )
}

export default EditDeck