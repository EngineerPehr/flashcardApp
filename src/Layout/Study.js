import React, { useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { readDeck } from "../utils/api"

function Study () {
    const { deckId } = useParams()
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

    return (
        <>
        <nav></nav>
        <h3>{deck.name}</h3>
        <p>Need Cards</p>
        </>
    )


}

export default Study