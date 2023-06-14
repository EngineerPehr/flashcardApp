# Flashcard App in React
## By Pehr Lofgreen

### Introduction

    The Flashcard App is a React app that allows the user to create, edit, and study decks of simple text-based flashcards. The API was provided by Qualified as part of the assessment, as well as some of the base code. As such, this README will only cover the files created or edited by me.

    As there are two index.js files with important roles, they will be referred to with their relative path, starting with the src directory.

### src/Layout/index.js

    This file contains the React routing for the app. It also handles loading the flashcard decks from the API and passing that data to the files that need it. It does this via the use of both useState and useEffect. It also contains the deleteDeckHandler function.

#### deleteDeckHandler

    This function is the handler for when the user clicks on a deck's delete button. It presents the user with a modal confirmation window. If the user confirms the deletion, then it calls the deleteDeck function (presented below) and refreshes the page. It then logs ``Deck ID: ${id} - Deleted`` to the console. If the user cancels, then it logs ``Deck ID: ${id} - Deletion Cancelled``. The id variable refers to the deck's id property. These logs are included to aid in potential debugging.

### AddCard

AddCard
CreateDeck
Deck
EditCard
EditDeck
Home
Study
Helper Functions in src/utils/api/index.js
 - stripCards, fetchJson
 - listDecks
 - createDeck
 - readDeck
 - updateDeck
 - deleteDeck
 - createCard
 - readCard
 - updateCard
 - deleteCard
Header, NotFound,