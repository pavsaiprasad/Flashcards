import {
    GET_DECKS,
} from '../utils/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_DECKS:
            return action.payload;
        default:
            return state;
    }
};
