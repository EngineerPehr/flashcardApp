import React from "react"
import { Link } from "react-router-dom"

function DeckForm ({ deck = {}, setDeck, submitHandler, create }) {
    const changeHandler = ({target}) => {
        setDeck({...deck, [target.name]: target.value})
    }
    const { name = '', description = '' } = deck

    return (
        <form onSubmit={submitHandler}>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor='name'>Name:</label>
                    <input name='name' type='text' className="form-control" value={name} onChange={changeHandler}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Description:</label>
                    <textarea name='description' className="form-control" value={description} onChange={changeHandler}/>
                </div>
            </div>
            <div className="card-footer">
                {/* Ternary controls where the Cancel button takes the user */}
                {create ? (
                    <Link to={`/`} className="btn btn-secondary mx-1">Cancel</Link> 
                    ) : (
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary mx-1">Cancel</Link>
                    )
                }
                <button type="submit" className="btn btn-primary mx-1">Submit</button>
            </div>
        </form>
    )
}

export default DeckForm