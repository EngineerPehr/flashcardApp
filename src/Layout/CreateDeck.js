// Imports
import React, { useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { createDeck } from "../utils/api"
import DeckForm from "./DeckForm"

// Creates a new deck and adds it to the API
function CreateDeck ({ decks, setDecks }) {
    const history = useHistory()
    // Empty deck. The id is assigned by the API.
    const [deck, setDeck] = useState({})
    // Adds the new deck to the API. Takes user to the deck's page.
    const submitHandler = async (event) => {
        event.preventDefault()
        const newDeck = await createDeck(deck)
        setDecks([...decks, newDeck])
        history.push(`/decks/${newDeck.id}`)
    }

    return (
        <>
        {/* Breadcrumb navigation */}
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to='/'>Home</Link>
                </li>
                <li className="breadcrumb-item active">Create Deck</li>
            </ol>
        </nav>
        <div className="card border-dark">
            <h2 className="card-header">Create Deck</h2>
            <DeckForm deck={deck} setDeck={setDeck} submitHandler={submitHandler} />
        </div>
        </>
    )
}

export default CreateDeck