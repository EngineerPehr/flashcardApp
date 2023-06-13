import React, { useState, useEffect} from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { readDeck, updateDeck } from "../utils/api"

function EditDeck () {
    const { deckId } = useParams()
    const history = useHistory()
    const [deck, setDeck] = useState({})
    const changeHandler = ({target}) => {
        setDeck({...deck, [target.name]: target.value})
    }
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
            <form onSubmit={submitHandler}>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor='name'>Name:</label>
                        <input name='name' type='text' className="form-control" value={deck.name} onChange={changeHandler}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description:</label>
                        <textarea name='description' className="form-control" value={deck.description} onChange={changeHandler}></textarea>
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

export default EditDeck