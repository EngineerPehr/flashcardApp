import React, { useState, useEffect} from "react"
import { Link, useHistory } from 'react-router-dom'
import { createDeck } from "../utils/api"

function CreateDeck ({ decks, setDecks }) {
    const history = useHistory()
    const initialDeckData = {
        name: '',
        description: '',
    }
    const [deckData, setDeckData] = useState(initialDeckData)
    const changeHandler = ({target}) => {
        setDeckData({...deckData, [target.name]: target.value})
    }
    const submitHandler = async (event) => {
        event.preventDefault()
        const newDeck = await createDeck(deckData)
        setDecks([...decks, newDeck])
        history.push(`/decks/${newDeck.id}`)
    }

    return (
        <>
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to='/'>Home</Link>
                </li>
                <li className="breadcrumb-item active">Create Deck</li>
            </ol>
        </nav>
        <h2>Create Deck</h2>
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor='name'>Name:</label>
                <input name='name' type='text' className="form-control" onChange={changeHandler}/>
            </div>
            <div className='form-group'>
                <label htmlFor='description'>Description:</label>
                <textarea name='description' className="form-control" onChange={changeHandler}></textarea>
            </div>
            <button type='reset' className="btn btn-secondary mx-1">Cancel</button>
            <button type="submit" className="btn btn-primary mx-1">Submit</button>
        </form>
        </>
    )
}

export default CreateDeck