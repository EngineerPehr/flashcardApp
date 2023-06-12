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
            <li key={i}>
                <h3>{deck.name}</h3>
                <p>{`${i} cards`}</p>
                <p>{deck.description}</p>
                <button>View</button>
                <button>Study</button>
                <button>Delete</button>
            </li>
        )
    })

    return (
        <>
        <button>Create Deck</button>
        <ul>{deckList}</ul>
        </>
    )
}

export default Home