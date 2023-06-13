import React, { useState, useEffect} from "react"
import { Link, useParams } from 'react-router-dom'
import { readDeck, createCard } from "../utils/api"

function AddCard () {
    const { deckId } = useParams()
    const initialCard = {
        front: '',
        back: '',
    }
    const [card, setCard] = useState(initialCard)
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
        setCard({...card, [target.name]: target.value})
    }
    const submitHandler = async (event) => {
        event.preventDefault()
        await createCard(deckId, card)
        setCard(initialCard)
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
                    <Link to={`/decks/${deckId}`} className="btn btn-secondary mx-1">Done</Link>
                    <button type="submit" className="btn btn-primary mx-1">Save</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default AddCard