import { AsyncStorage } from 'react-native'
import { initialDataForDecks} from './data'

export function fetchDecks() {
    return AsyncStorage.getItem('Flashcard:decks')
        .then(getDeckData)
}

export function addNewDeck(deck) {
    return AsyncStorage.mergeItem('Flashcard:decks')
        .then(deck)
}  

export function getDeckData(results) {
    if(results === null){
        AsyncStorage.mergeItem('Flashcard:decks', JSON.stringify(initialDataForDecks))
        return initialDataForDecks;
    } else{
        return JSON.parse(results) 
    }
}