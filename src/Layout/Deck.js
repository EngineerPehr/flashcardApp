import React, { useState, useEffect} from "react"
import { Link, useParams } from 'react-router-dom'
import { readDeck, deleteCard } from "../utils/api"

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

    const deleteCardHandler = async (id) => {
        if (window.confirm('Delete this Card?\nYou will not be able to recover it.')) {
            await deleteCard(id)
            window.location.reload()
          } else {
            console.log('Card deletion cancelled')
          }
    }
    
    const cardItems = deck.cards?.map((card, i) => {
        return (
        <div className="card border-dark" key={i}>
            <div className="card-header text-center">
                <h3>{`Card #${i+1}`}</h3>
            </div>
            <div className="card-body">
                <h4>Front:</h4>
                <p>{card.front}</p>
                <h4>Back:</h4>
                <p>{card.back}</p>
            </div>
            <div className='card-footer'>
                <div className="row justify-content-around">
                    <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className='btn btn-secondary'>Edit</Link>
                    <button className="btn btn-danger" onClick={() => deleteCardHandler(card.id)}>Delete</button>
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
            <h2 className="card-header text-center">{deck.name}</h2>
            <p className="card-body">{deck.description}</p>
            <div className="card-footer">
                <div className="row justify-content-around">
                    <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link>
                    <Link to={`/decks/${deckId}/study`} className="btn btn-primary">Study</Link>
                    <Link to={`/decks/${deckId}/cards/new`} className='btn btn-success'>Add Cards</Link>
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