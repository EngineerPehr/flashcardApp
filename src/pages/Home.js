import React, { useState, useEffect } from 'react'
import { Link, Switch, Route, useParams} from 'react-router-dom'
import { listDecks, deleteDeck } from '../utils/api/index'
import CreateDeck from './CreateDeck'
import Deck from './Deck'
import Study from './Study'

function Home () {
    const { url } = useParams()
    const [decks, setDecks] = useState([])

    useEffect(() => {
        const loadDecks = async () => {
            const data = await listDecks()
            setDecks(data)
        }
        loadDecks()
    }, [decks])

    const deleteHandler = (id) => {
        if (window.confirm('Delete this deck?\nYou will not be able to recover it.')) deleteDeck(id)
    }

    const deckList = decks.map((deck, i) => {
        return (
            <li className='card border-dark my-3 w-75' key={i}>
                <div className='card-header text-center'>
                    <h3 className='card-title'>{deck.name}</h3>
                    <p className='card-subtitle'>{`${deck.cards.length} cards`}</p>
                </div>
                <div className='card-body'>
                    <p className='card-text'>{deck.description}</p>
                </div>
                <div className='card-footer'>
                    <div className='row justify-content-around align-middle'>
                        <Link to={`/decks/${deck.id}`} className='btn btn-secondary'>View</Link>
                        <Link to={`/decks/${deck.id}/study`} className='btn btn-primary'>Study</Link>
                        <button className='btn btn-danger' onClick={() => deleteHandler(deck.id)}>Delete</button>
                    </div>
                </div>
            </li>
        )
    })

    return (
        <>
        <Link to={`/decks/new`} className="btn btn-dark">Create Deck</Link>
        <ul className="list-unstyled card-deck">{deckList}</ul>
        <Switch>
            <Route path={`/decks/new`}>
                <CreateDeck />
            </Route>
            <Route path={`/decks/:deckId`}>
                <Deck />
            </Route>
            <Route path={`/decks/:deckId/study`}>
                <Study deckId={deckId}/>
            </Route>
        </Switch>
        </>
    )
}

export default Home