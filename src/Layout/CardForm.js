import React from "react"
import { Link } from 'react-router-dom'

function CardForm ({deckId, card, setCard, submitHandler, add}) {
    const changeHandler = ({target}) => {
        setCard({...card, [target.name]: target.value})
    }
    return (
        <>
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
            {add ? (
                <div className="card-footer">
                    <Link to={`/decks/${deckId}`} className="btn btn-secondary mx-1">Done</Link>
                    <button type="submit" className="btn btn-primary mx-1">Save</button>
                </div>
                ) : (
                <div className="card-footer">
                    <Link to={`/decks/${deckId}`} className="btn btn-secondary mx-1">Cancel</Link>
                    <button type="submit" className="btn btn-primary mx-1">Submit</button>
                </div>
                )
            }
        </form>
        </>
    )
}

export default CardForm