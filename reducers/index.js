import { combineReducers } from 'redux';
import DecksReducer from './decks-reducer';
import DeckDetailReducer from './deck-detail-reducer';

export default combineReducers({
    decks: DecksReducer,
    deck: DeckDetailReducer
});
