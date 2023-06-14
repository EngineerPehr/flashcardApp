import React, { useState, useEffect} from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { readDeck, updateDeck } from "../utils/api"
import DeckForm from "./DeckForm"

function EditDeck () {
    const { deckId } = useParams()
    const history = useHistory()
    const [deck, setDeck] = useState({})
    const submitHandler = async (event) => {
        event.preventDefault()
        await updateDeck(deck)
        history.push(`/decks/${deckId}`)
    }

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
                <li className="breadcrumb-item">Edit Deck</li>
            </ol>
        </nav>
        <div className="card border-dark">
            <h2 className="card-header">Edit Deck</h2>
            <DeckForm deck={deck} setDeck={setDeck} submitHandler={submitHandler} />
        </div>
        </>
    )
}

export default EditDeck