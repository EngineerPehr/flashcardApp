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

function Layout() {
  const [decks, setDecks] = useState([])

  useEffect(() => {
    const loadDecks = async () => {
      const data = await listDecks()
      setDecks(data)
    }
    loadDecks()
  }, [decks])

  const deleteHandler = (id) => {
    window.confirm('Delete this deck?\nYou will not be able to recover it.') ? deleteDeck(id) : console.log('Deletion cancelled')
  }

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path='/'>
            <Home decks={decks} deleteHandler={deleteHandler} />
          </Route>
          <Route path={'/decks/:deckId/study'}>
            <Study />
          </Route>
          <Route path={'/decks/new'}>
            <CreateDeck decks={decks} setDecks={setDecks} />
          </Route>
          <Route path={'/decks/:deckId'}>
            <Deck />
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
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
