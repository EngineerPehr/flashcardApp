// Import
import React from 'react'
import { Link } from 'react-router-dom'

// Takes user input via form and returns it to the parent component
function CardForm ({deckId, card, setCard, submitHandler, add}) {
    // Simple change handler
    const changeHandler = ({target}) => {
        setCard({...card, [target.name]: target.value})
    }

    return (
        <>
        <form onSubmit={submitHandler}>
            <div className='card-body'>
                {/* Front Input */}
                <div className='form-group'>
                    <label htmlFor='front'>Front:</label>
                    <textarea name='front' className='form-control' value={card.front} onChange={changeHandler} />
                </div>
                {/* Back Input */}
                <div className='form-group'>
                    <label htmlFor='back'>Back:</label>
                    <textarea name='back' className='form-control' value={card.back} onChange={changeHandler} />
                </div>
            </div>
            {/* Ternary statement controls which buttons appear at the bottom of the form */}
            {add ? (
                <div className='card-footer'>
                    <Link to={`/decks/${deckId}`} className='btn btn-secondary mx-1'>Done</Link>
                    <button type='submit' className='btn btn-primary mx-1'>Save</button>
                </div>
                ) : (
                <div className='card-footer'>
                    <Link to={`/decks/${deckId}`} className='btn btn-secondary mx-1'>Cancel</Link>
                    <button type='submit' className='btn btn-primary mx-1'>Submit</button>
                </div>
                )
            }
        </form>
        </>
    )
}

export default CardForm