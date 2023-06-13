import React, { useState, useEffect} from "react"
import { useParams } from 'react-router-dom'
import { readDeck, updateDeck, createCard, updateCard, deleteCard } from "../utils/api"

function AddCard () {
    const { deckId } = useParams()
    const initialCardData = {
        front: '',
        back: '',
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
        <nav></nav>
        <h4>{`${deck.name}: Add Card`}</h4>
        <form>
            <div>
                <label htmlFor="front">Front:</label>
                <textarea name='front'></textarea>
            </div>
            <div>
                <label htmlFor="back">Back:</label>
                <textarea name='back'></textarea>
            </div>
        </form>
        </>
    )
}

export default AddCard