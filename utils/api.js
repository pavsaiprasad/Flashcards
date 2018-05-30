import { AsyncStorage } from 'react-native';

export async function getDecks() {
    const keys = await AsyncStorage.getAllKeys()
    const stores = await AsyncStorage.multiGet(keys);
    return stores.map((result, index, store) => {
        let key = store[index][0];
        let value = JSON.parse(store[index][1]);
        if (value) {
            return {
                key,
                title: value.title,
                questions: value.questions
            };
        }
    }).filter(items => {
        if (items) {
            return typeof items.questions !== 'undefined'
        }
    });
}

export function getDeck(id) {
    return AsyncStorage.getItem(id);
}

export function saveDeckTitle(title) {
        return AsyncStorage.setItem(title, JSON.stringify({ title, questions: [] }));
}

export function addCardToDeck(title, card) {
        AsyncStorage.getItem(title).then(result => {
            const data = JSON.parse(result);

            let questions = data.questions;
            questions.push(card);

            AsyncStorage.mergeItem(title, JSON.stringify({
                questions
            }));
        });
}