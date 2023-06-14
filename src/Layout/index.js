// Imports
import React, { useState, useEffect} from "react"
import { Switch, Route } from "react-router-dom"
import { listDecks, deleteDeck } from "../utils/api"
import Header from "./Header"
import NotFound from "./NotFound"
import Home from "./Home"
import Study from "./Study"
import CreateDeck from "./CreateDeck"
import Deck from "./Deck"
import EditDeck from './EditDeck'
import AddCard from './AddCard'
import EditCard from './EditCard'

// Contains the main routing and deck loading/deleting
function Layout() {
  const [decks, setDecks] = useState([])

  // Fetches the decks from the API
  useEffect(() => {
    const loadDecks = async () => {
      const data = await listDecks()
      setDecks(data)
    }
    loadDecks()
  }, [])

  // Calles deleteDeck to remove specified deck from API. Logs result to public.
  const deleteDeckHandler = async (id) => {
    if (window.confirm('Delete this deck?\nYou will not be able to recover it.')) {
      await deleteDeck(id)
      window.location.reload()
      console.log(`Deck ID: ${id} - Deleted`)
    } else {
      console.log(`Deck ID: ${id} - Deletion Cancelled`)
    }
  }

  // Returns the routing for the app
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path={'/decks/:deckId/study'}>
            <Study />
          </Route>
          <Route path={'/decks/new'}>
            <CreateDeck decks={decks} setDecks={setDecks} />
          </Route>
          <Route path={'/decks/:deckId/edit'}>
            <EditDeck />
          </Route>
          <Route path={'/decks/:deckId/cards/new'}>
            <AddCard />
          </Route>
          <Route path={'/decks/:deckId/cards/:cardId/edit'}>
            <EditCard />
          </Route>
          <Route path={'/decks/:deckId'}>
            <Deck deleteHandler={deleteDeckHandler} />
          </Route>
          <Route exact path='/'>
            <Home decks={decks} deleteHandler={deleteDeckHandler} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
