import React from 'react'
import { Link } from 'react-router-dom'

function Home ({ decks, deleteHandler}) {
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
        </>
    )
}

export default Home