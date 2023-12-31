# Flashcard App in React
## By Pehr Lofgreen

### Introduction

The Flashcard App is a React app that allows the user to create, edit, and study decks of simple text-based flashcards that are stored in an API.

### src/Layout/index.js

This component contains the React routing for the app. It handles loading the flashcard decks from the API via `listDecks`, and passes that data to the components that need it. It also contains the `deleteDeckHandler` function.

#### listDecks

This is a Qualified-provided helper function. It fetches the array of decks from the API.

#### deleteDeckHandler

This function is the handler for when the user clicks on a deck's delete button. It presents the user with a modal confirmation window. If the user confirms the deletion, then it calls the `deleteDeck` function. The page then returns the user to the `Home` page, or refreshes the page if the user is already on the `Home` page. It then logs ``Deck ID: ${id} - Deleted`` to the console. If the user cancels, the page is neither changed nor refreshed, and the function logs ``Deck ID: ${id} - Deletion Cancelled``. The id variable refers to the deck's id property. These logs are included to aid in potential debugging.

#### deleteDeck

This is a Qualified-provided helper function. It takes a deck id as an argument and removes the corresponding deck from the API. This cannot be reversed, so it is paired with a modal confrimation window.

### Home

This component is the main hub and displays the decks given to it by `src/Layout/index` as separate cards, with controls to view, study, or delete the deck. Deletions are handled by `deleteDeckHandler`, which is passed in from `src/Layout/index`. It also has access the `CreateDeck` component.

### DeckForm

This component is used by `CreateDeck` and `EditDeck` to create a set of deck data that is used to generate a new deck or update an existing deck, respectively. It is passed a deck object, a `setDeck` function to pass the altered deck back to `CreateDeck` or `EditDeck`, the parent component's respective `submitHandler`, and `create`, a boolean for if the deck is being created or edited. Submits are handled by the parent component due to the difference in functionallity. The `Cancel` button is toggled by the value of `create`, with true returning the user to the `Home` page and false returning the user to the `Deck` page.

### CreateDeck

This component uses `DeckForm` to collect a name and description from the user for a new deck. It then calls `createDeck` to add the deck to the API and takes the user to the new deck's page.

#### createDeck

This is a Qualified-provided helper function. It takes an object with name and description keys, assigns it an id, then adds the completed deck to the API.

### Deck

This is a deck-specific hub component for all deck-related actions, such as editing the deck, adding/editing/deleting cards within the deck, or studying the deck. Only one deck is shown on this page at a time. A user can access this screen from the `Home` page or the `CreateDeck` page. The cards associated with the deck are shown as well, if any exist.

#### deleteCard

This is a Qualified-provided helper function. It takes a card's id and removes the card from the API. This funciton is only able to be called from the buttons on the `Deck` page. This cannot be reversed, so it is paired with a modal confrimation window.

### EditDeck

This component allows a user to edit an existing deck's name and/or desription. It gets the current deck's information via `readDeck` and passes it down to the `DeckForm`. The `DeckForm` then passes the edited data back to `EditDeck`, which uses `updateDeck` to update the API.

#### readDeck

This is a Qualified-provided helper function. It takes a deck's id and fetches the specified deck from the API.

#### updateDeck

This is a Qualified-provided helper function. It takes a deck's id and an object with the updated name and description. It then updates the specified deck within the API.

### CardForm

This component is used by `AddCard` and `EditCard` to create a set of card data that is used to generate a new card or update an existing card, respectively. It is passed a deck id, a card object, a `setCard` function to pass the altered card back to `AddCard` or `EditCard`, the parent component's respective `submitHandler`, and add, a boolean for if a card is being added versus edited. Submits are handled by the parent component due to the difference in functionallity. The controls at the bottom are toggled based on the value of add, with true rendering `Save` and `Done` buttons while false renders `Submit` and `Cancel` buttons.

### AddCard

This component uses `CardForm` to collect a front and back from the user for a new card. It then calls `createCard` to add the card to the deck within the API. `Save` leaves the user on the `AddCard` page, so that they can add multiple cards at a time. The `Done` button returns the user to the deck's page.

#### createCard

This is a Qualified-provided helper function. It takes a deck id and an object with front and back keys, assigns it a card id, then adds the completed card to the API, associated with the given deck.

### EditCard

This component allows a user to edit an existing card's front and/or back. It gets the current deck and card information via `readDeck` and `readCard`, then passes it down to the `CardForm`. The `CardForm` then passes the edited data back to `EditCard`, which uses `updateCard` to update the API.

#### readCard

This is a Qualified-provided helper function. It takes a card's id and fetches the specified card from the API.

#### updateCard

This is a Qualified-provided helper function. It takes a card object with the updated front and back. It pulls the id from the object, then updates the specified card within the API.

### Study

This page presents the cards in a deck in an easy to study fashion. It shows the front of one card with a `Flip` button. Upon flipping the card, the back of the card is displayed along with the `Flip` button and a `Next` button. The `Flip` button will return the front of the card. The `Next` button loads the front of the next card. If the card is the last one in the deck, the `Next` button presents a modal window to the user. If the user confirms, the deck is reset. If they cancel, they are returned to the Home page.

### All other files and functions

The rest of the app was provided by Qualified as part of the assessment.