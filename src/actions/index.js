import * as Type from './actionTypes'

export function addDecks(decks) {
    return {
        type: Type.ADD_DECKS,
        decks,
    }
}

export function addDeck(deck) {
    return {
        type: Type.ADD_DECK,
        deck,
    }
}

export function addQuestion(data) {
    return {
        type: Type.ADD_QUESTION,
        data,
    }
}

export function removeDeck(title) {
    return {
        type: Type.REMOVE_DECK,
        title,
    }
}