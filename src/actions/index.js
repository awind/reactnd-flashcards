import * as Type from './actionTypes'

export const addDecks = (decks) => ({
    type: Type.ADD_DECKS,
    decks,
})

export const addDeck = (deck) => ({
    type: Type.ADD_DECK,
    deck,
})

export const addQuestion = (data) => ({
    type: Type.ADD_QUESTION,
    data,
})

export const removeDeck = (title) => ({
    type: Type.REMOVE_DECK,
    title,
})