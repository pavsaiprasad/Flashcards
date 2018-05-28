import { AsyncStorage } from 'react-native'
import { initialDataForDecks} from './data'

export function fetchDecks() {
    return AsyncStorage.getItem('Flashard:decks')
        .then(getDeckData)
} 

export function getDeckData(results) {
    return results === null
        ? initialDataForDecks
        : JSON.parse(results)
}