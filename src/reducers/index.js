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
            const {title, questions, answer} = action.question
            const newQuestions = JSON.parse(JSON.stringify(questions)).concat([{ question, answer}])

            return {
                ...state,
                [title]: {...state[title], questions: newQuestions},
            }
        case Type.REMOVE_DECK:
            // const title = action.title
            let newState = Object.assign({}, state)
            delete newState[action.title]
            return newState
        default:
            return state
    }
}

export default decks