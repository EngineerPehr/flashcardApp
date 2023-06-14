import React, { useState, useEffect} from "react"
import { Link, useParams } from 'react-router-dom'
import { readDeck, createCard } from "../utils/api"
import CardForm from "./CardForm"

function AddCard () {
    const { deckId } = useParams()
    const blankCard = {
        front: '',
        back: '',
    }
    const [card, setCard] = useState({})
    const [deck, setDeck] = useState({})
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
    }, [deck])
    const submitHandler = async (event) => {
        event.preventDefault()
        await createCard(deckId, card)
        setCard(blankCard)
        console.log('Card created')
    }
    return (
        <>
        <nav>
        <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to='/'>Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item">Add Card</li>
            </ol>
        </nav>
        <div className="card border-dark">
            <h2 className="card-header">Add Card</h2>
            <CardForm deckId={deckId} card={card} setCard={setCard} submitHandler={submitHandler} add={true}/>
        </div>
        </>
    )
}

export default AddCard