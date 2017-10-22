import * as Type from '../actions/actionTypes'

function decks(state = {}, action) {
    const type = action.type
    switch(type) {
        case Type.ADD_DECKS:
            return {
                ...state,
                ...action.decks,
            }
        case Type.ADD_DECK:
            return {
                ...state,
                ...action.deck,
            }
        case Type.ADD_QUESTION:
            const { title, questions, question, answer } = action.data
            const newQuestions = JSON.parse(JSON.stringify(questions)).concat([{ question, answer}])

            return {
                ...state,
                [title]: {...state[title], questions: newQuestions},
            }
        case Type.REMOVE_DECK:
            const item = action.title
            let newState = Object.assign({}, state)
            delete newState[item]
            return newState
        default:
            return state
    }
}

export default decks