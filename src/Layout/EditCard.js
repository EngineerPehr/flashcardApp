import React, { useState, useEffect} from "react"
import { Link, useParams, useHistory } from 'react-router-dom'
import { readDeck, readCard, updateCard } from "../utils/api"

function EditCard () {
    const history = useHistory()
    const { deckId, cardId } = useParams()
    const [card, setCard] = useState({})
    const [deck, setDeck] = useState({})
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
    const changeHandler = ({target}) => {
        setCard({...card, [target.name]: target.value})
    }
    const submitHandler = async (event) => {
        event.preventDefault()
        await updateCard(card)
        history.push(`/decks/${deckId}`)
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
                <li className="breadcrumb-item">Edit Card</li>
            </ol>
        </nav>
        <div className="card border-dark">
            <h2 className="card-header">Edit Card</h2>
            <form onSubmit={submitHandler}>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor='front'>Front:</label>
                        <textarea name='front' className="form-control" value={card.front} onChange={changeHandler} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='back'>Back:</label>
                        <textarea name='back' className="form-control" value={card.back} onChange={changeHandler} />
                    </div>
                </div>
                <div className="card-footer">
                    <Link to={`/decks/${deckId}`} className="btn btn-secondary mx-1">Cancel</Link>
                    <button type="submit" className="btn btn-primary mx-1">Submit</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default EditCard