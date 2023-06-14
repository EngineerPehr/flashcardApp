// Imports
import React, { useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { readDeck, deleteCard } from '../utils/api'

// Displays a specified deck with its associated cards, if any. Receives the deleteDeckHandler from src/Layout/index.
function Deck ({ deleteDeckHandler }) {
    // Deck ID received from path
    const { deckId } = useParams()
    const [deck, setDeck] = useState({})

    // Fetches the specified deck from the API
    useEffect(() => {
        const abortcontroller = new AbortController()
        const loadDeck = async () => {
            const deckData = await readDeck(deckId)
            setDeck(deckData)
        }
        loadDeck()
        return () => {
            abortcontroller.abort()
        }
    }, [deckId])

    // Uses deleteCard to remove the selected card from the API.
    const deleteCardHandler = async (id) => {
        if (window.confirm('Delete this Card?\nYou will not be able to recover it.')) {
            await deleteCard(id)
            window.location.reload()
            console.log(`Card ID: ${id} - Deleted`)
          } else {
            console.log(`Card ID: ${id} - Deletion Cancelled`)
          }
    }
    
    // Creates a card for each card in the deck, if any exist.
    const cardItems = deck.cards?.map((card, i) => {
        return (
        <div className='card border-dark' key={i}>
            <div className='card-header text-center'>
                {/* Card Number */}
                <h3>{`Card #${i+1}`}</h3>
            </div>
            <div className='card-body'>
                {/* Card Text Data */}
                <h4>Front:</h4>
                <p>{card.front}</p>
                <h4>Back:</h4>
                <p>{card.back}</p>
            </div>
            <div className='card-footer'>
                <div className='row justify-content-around'>
                    {/* Card Controls */}
                    <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className='btn btn-secondary'>Edit</Link>
                    <button className='btn btn-danger' onClick={() => deleteCardHandler(card.id)}>Delete</button>
                </div>
            </div>
        </div>
        )
    })

    return (
        <>
        {/* Breadcrumb navigation */}
        <nav>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to='/'>Home</Link>
                </li>
                <li className='breadcrumb-item active'>{deck.name}</li>
            </ol>
        </nav>
        {/* Deck Card */}
        <div className='card border-dark'>
            <h2 className='card-header text-center'>{deck.name}</h2>
            <p className='card-body'>{deck.description}</p>
            <div className='card-footer'>
                <div className='row justify-content-around'>
                    {/* Deck Controls */}
                    <Link to={`/decks/${deckId}/edit`} className='btn btn-secondary'>Edit</Link>
                    <Link to={`/decks/${deckId}/study`} className='btn btn-primary'>Study</Link>
                    <Link to={`/decks/${deckId}/cards/new`} className='btn btn-success'>Add Cards</Link>
                    <button className='btn btn-danger' onClick={() => deleteDeckHandler(deckId)}>Delete</button>
                </div>
            </div>
        </div>
        {/* Card Cards */}
        <div className='card-deck my-3'>
            {cardItems}
        </div>
        </>
    )
}

export default Deck