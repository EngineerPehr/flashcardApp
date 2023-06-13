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
    }, [deckId])
    
    const cardItems = deck.cards?.map((card, i) => {
        return (
        <div className="card border-dark" key={i}>
            <div className="card-header text-center">
                <h5>{`Card #${i+1}`}</h5>
            </div>
            <div className="card-body">
                <h6>Front:</h6>
                <p>{card.front}</p>
                <h6>Back:</h6>
                <p>{card.back}</p>
            </div>
            <div className='card-footer'>
                <div className="row justify-content-around">
                    <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className='btn btn-secondary'>Edit</Link>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
        )
    })

    return (
        <>
        <nav>
        <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to='/'>Home</Link>
                </li>
                <li className="breadcrumb-item active">{deck.name}</li>
            </ol>
        </nav>
        <div className="card border-dark">
            <h3 className="card-header text-center">{deck.name}</h3>
            <p className="card-body">{deck.description}</p>
            <div className="card-footer">
                <div className="row justify-content-around">
                    <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link>
                    <Link to={`/decks/${deckId}/study`} className="btn btn-primary">Study</Link>
                    <Link to={`/decks/${deckId}/cards/new`} className='btn btn-success'>Add Card</Link>
                    <button className="btn btn-danger" onClick={() => deleteHandler(deckId)}>Delete</button>
                </div>
            </div>
        </div>
        <div className="card-deck my-3">
            {cardItems}
        </div>
        </>
    )
}

export default Deck