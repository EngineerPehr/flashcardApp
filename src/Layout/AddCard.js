import React, { useState, useEffect} from "react"
import { Link, useParams } from 'react-router-dom'
import { readDeck, updateDeck, createCard, updateCard, deleteCard } from "../utils/api"

function AddCard () {
    const { deckId } = useParams()
    const initialCardData = {
        front: '',
        back: '',
        deckId
    }
    const [cardData, setCardData] = useState(initialCardData)
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
    }, [deck])
    const changeHandler = ({target}) => {
        setCardData({...cardData, [target.name]: target.value})
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
            <form>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor='front'>Front:</label>
                        <textarea name='front' className="form-control" onChange={changeHandler} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='back'>Back:</label>
                        <textarea name='back' className="form-control" onChange={changeHandler} />
                    </div>
                </div>
                <div className="card-footer">
                    <Link to={`/decks/${deckId}`} className="btn btn-secondary mx-1">Done</Link>
                    <button type="submit" className="btn btn-primary mx-1">Save</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default AddCard