import React, { useState, useEffect } from "react"
import { Link, Switch, Route, useParams} from 'react-router-dom'
import { listDecks } from '../utils/api/index'

function Home () {
    const [decks, setDecks] = useState([])

    useEffect(() => {
        const loadDecks = async () => {
            const data = await listDecks()
            setDecks(data)
        }
        loadDecks()
    }, [decks])

    const deckList = decks.map((deck, i) => {
        return (
            <li className='card border-dark my-3 w-75' key={i}>
                <div className="card-header text-center">
                    <h3 className="card-title">{deck.name}</h3>
                    <p className="card-subtitle">{`${deck.cards.length} cards`}</p>
                </div>
                <div className="card-body">
                    <p className="card-text">{deck.description}</p>
                </div>
                <div className="card-footer">
                    <div className="row justify-content-around align-middle">
                        <button className="btn btn-secondary">View</button>
                        <button className='btn btn-primary'>Study</button>
                        <button className="btn btn-danger">Delete</button>
                    </div>
                </div>
                    
            </li>
        )
    })

    return (
        <>
        <button className="btn btn-dark">Create Deck</button>
        <ul className="list-unstyled card-deck">{deckList}</ul>
        </>
    )
}

export default Home