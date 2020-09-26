import {AsyncStorage} from 'react-native';

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';


export function getInitialData() {
    return {
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        },
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
    };
}


export async function getDecks() {
    try {
        const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
        if (decks === null) {
            await resetDecks();
        }
        return decks === null ? getInitialData() : JSON.parse(decks);
    } catch (error) {
        console.log(error);
    }
}

export async function getDeck(deckName) {
    try {
        const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
        return JSON.parse(decks)[deckName];
    } catch (error) {
        console.log(error);
    }
}

export async function saveDeckTitle(deckName) {
    try {
        await AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [deckName]: {
                    title: deckName,
                    questions: [],
                }
            })
        );
    } catch (error) {
        console.log(error);
    }
}

export async function removeDeck(deckName) {
    try {
        const decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
        const data = JSON.parse(decks);
        data[deckName] = undefined;
        delete data[deckName];
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

export async function addCardToDeck(deckName, card) {
    try {
        const deck = await getDeck(deckName);
        await AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [deckName]: {
                    questions: [...deck.questions].concat(card)
                }
            })
        );
    } catch (error) {
        console.log(error);
    }
}

export async function resetDecks() {
    try {
        await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(getInitialData()));
    } catch (error) {
        console.log(error);
    }
}