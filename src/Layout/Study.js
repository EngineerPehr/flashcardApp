import React, { useState, useEffect} from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { readDeck } from "../utils/api"

function Study () {
    const history = useHistory()
    const { deckId } = useParams()
    const [deck, setDeck] = useState({})
    const [cardIndex, setCardIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)

    useEffect(() => {
        const abortcontroller = new AbortController()
        const loadDeck= async () => {
            const data = await readDeck(deckId)
            setDeck(data)
        }
        loadDeck()
        return () => {
            abortcontroller.abort()
        }
    }, [deckId])
    const flipHandler = () => {
        setIsFlipped(!isFlipped)
    }
    const nextHandler = () => {
        if (cardIndex === (deck.cards?.length - 1)) {
            const confirmed = window.confirm(`Restart cards?\nClick 'cancel' to return to home page.`)
            if (confirmed) {
                setCardIndex(0)
            } else {
                history.push('/')
            }
        } else {
            setCardIndex(cardIndex + 1)
        }
        setIsFlipped(false)
    }
    const cards = deck.cards
    const currentCard = deck.cards?.[cardIndex]
    const enoughCards = (
        <div className="card border-dark">
            <h4 className="card-header">{`Card ${cardIndex + 1} of ${cards?.length}`}</h4>
            <div className="card-body">
                <p className="card-text">{isFlipped ? currentCard?.back : currentCard?.front}</p>
            </div>
            <div className="card-footer">
                <button className="btn btn-secondary mx-1" onClick={flipHandler}>Flip</button>
                {isFlipped && (
                    <button className="btn btn-primary mx-1" onClick={nextHandler}>Next</button>
                )}
            </div>
        </div>
    )

    const notEnoughCards = (
        <div className="card border-dark">
            <h4 className="card-header">Not enough cards</h4>
            <p className="card-body">{`You need at least 3 cards to study. There are ${cards?.length} in this deck.`}</p>
            <div className="card-footer">
                <Link to={`/decks/${deckId}/cards/new`} className='btn btn-primary'>Add Cards</Link>
            </div>
        </div>
    )

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
                <li className="breadcrumb-item">Study</li>
            </ol>
        </nav>
        <h3>{`Study: ${deck.name}`}</h3>
        {cards?.length < 3 ? notEnoughCards : enoughCards} 
        </>
    )


}

export default Study