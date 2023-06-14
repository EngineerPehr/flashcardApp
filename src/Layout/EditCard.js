// Imports
import React, { useState, useEffect} from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { readDeck, readCard, updateCard } from '../utils/api'
import CardForm from './CardForm'

// Edits an existing card via CardForm and updates the API.
function EditCard () {
    const history = useHistory()
    const { deckId, cardId } = useParams()
    const [card, setCard] = useState({})
    const [deck, setDeck] = useState({})

    // Fetches the specified deck and card from the API.
    useEffect(() => {
        const abortcontroller = new AbortController()
        const loadDeckAndCard = async () => {
            const deckData = await readDeck(deckId)
            const cardData = await readCard(cardId)
            setDeck(deckData)
            setCard(cardData)
        }
        loadDeckAndCard()
        return () => {
            abortcontroller.abort()
        }
    }, [deckId, cardId])

    // Updates the card in the API and returns the user to the deck page
    const submitHandler = async (event) => {
        event.preventDefault()
        await updateCard(card)
        history.push(`/decks/${deckId}`)
    }
    return (
        <>
        {/* Breadcrumb navigation */}
        <nav>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to='/'>Home</Link>
                </li>
                <li className='breadcrumb-item'>
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className='breadcrumb-item'>Edit Card</li>
            </ol>
        </nav>
        {/* Card Form Access */}
        <div className='card border-dark'>
            <h2 className='card-header'>Edit Card</h2>
            <CardForm deckId={deckId} card={card} setCard={setCard} submitHandler={submitHandler} add={false}/>
        </div>
        </>
    )
}

export default EditCard