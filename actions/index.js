import { AsyncStorage } from 'react-native';
import {
    getDecks,
    getDeck
} from '../utils/api';

import {
    GET_DECKS,
    GET_DECK,
} from '../utils/types';



export function fetchDecks() {
    return (dispatch) => {
        getDecks().then(data => dispatch({ type: GET_DECKS, payload: data }));
    }
}

export function getDeckDetails(deck) {
    return (dispatch) => {
        getDeck(deck)
            .then(cardDeck => {
                dispatch({ type: GET_DECK, payload: JSON.parse(cardDeck) })
            });
    }
}
