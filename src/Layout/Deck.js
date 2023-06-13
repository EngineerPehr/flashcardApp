import React, { useState, useEffect} from "react"
import { Link, useParams } from 'react-router-dom'
import { readDeck, updateDeck, createCard, updateCard, deleteCard } from "../utils/api"

function Deck ({ deleteHandler }) {
    const { deckId } = useParams()
    const [deck, setDeck] = useState({})

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
    }, [deck])
    
    // const cards = deck.cards
    // const cardItems = cards.map((card, i) => {
    //     <div className="card">
    //         <div className="card-title">
    //             <h5>{`Card #${i+1}`}</h5>
    //         </div>
    //         <div className="card-body">
    //             <p>{card.front}</p>
    //             <p>{card.back}</p>
    //         </div>
    //         <div className='card-footer'>
    //             <button>Edit</button>
    //             <button>Delete</button>
    //         </div>
    //     </div>
    // })

    return (
        <>
        <nav></nav>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className="bg-gray p-1">
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mx-1">Edit</Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary mx-1">Study</Link>
            <Link to={`/decks/${deckId}/cards/new`} className='btn btn-success mx-1'>Add Cards</Link>
            <button className="btn btn-danger mx-1" onClick={() => deleteHandler(deckId)}>Delete</button>
        </div>
        <div className="card-group">
            Cards go here
        </div>
        </>
    )
}

export default Deck