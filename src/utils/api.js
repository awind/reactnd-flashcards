import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'Flashcard:deck'

const defaultDecks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces',
          result: true,
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event',
          result: false
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.',
          result: true,
        }
      ]
    }
  }

export function initData() {
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(defaultDecks))
    return defaultDecks
}

  /**
   * return all of the decks along with their titles, 
   * questions, and answers. 
   */
export function getDecks () {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
        return results === null ? initData() : JSON.parse(results)
    })
}

export function saveDeck (deck) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck))
}

export function deleteDeck (title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY, (error, result) => {
    let decks = JSON.parse(result)
    delete decks[title]
    AsyncStorage.removeItem(DECK_STORAGE_KEY).then(() => {
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
    })
  })
}

/**
 * take in two arguments, title and card, and will add the card to the list 
 * of questions for the deck with the associated title. 
 */
export function addCardToDeck ({deckTitle, card}) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY, (error, result) => {
    let decks = JSON.parse(result)
    let newQuestions = JSON.parse(JSON.stringify(decks[deckTitle].questions))
    newQuestions[newQuestions.length] = card
    const value = JSON.stringify({
      [deckTitle]: {title: deckTitle, questions: newQuestions},
    })
    AsyncStorage.mergeItem(DECK_STORAGE_KEY, value)
  })
}