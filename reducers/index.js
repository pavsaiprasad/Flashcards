import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'
import { dataForDecks } from '../utils/data';

function decks(state = dataForDecks, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            }
        case ADD_DECK:
            return {
                ...state,
                [action.deck.title]: {
                    ...action.deck,
                    questions: [],
                },
            };
        case ADD_CARD:
            return {
                ...state,
                [action.deck.title]: {
                    title: state[action.deck.title].title,
                    questions: [
                        ...state[action.deck.title].questions,
                        {
                            question: action.deck.question,
                            answer: action.deck.answer,
                        },
                    ],
                },
            };
        default:
            return state
    }
}

export default decks