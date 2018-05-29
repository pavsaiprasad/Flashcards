import {
    GET_DECK
} from '../utils/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_DECK:
            return action.payload;
        default:
            return state;
    }
};
