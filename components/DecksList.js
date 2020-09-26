import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {gray, white} from '../utils/colors';
import {getDecks} from "../utils/api";
import {isEmptyArray} from "../utils/helpers";

const DeckDetails = (props) => {
    const {title, cards} = props;
    return (
        <View style={styles.deckContainer}>
            <View>
                <Text style={styles.deckText}>{title}</Text>
            </View>
            <View>
                <Text style={styles.cardText}>{cards} cards</Text>
            </View>
        </View>
    )
}

export class DecksList extends Component {
    state = {
        decks: null,
        selectedDeck: null,
        loaded: false
    }

    getLatestDecks = () => {
        if (!this.loaded){
            getDecks().then(
                (decks) => {
                    if(this.mounted){
                        this.setState(() => ({
                            decks,
                            loaded: true,
                        }))
                    }
                }
            )
        }
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }


    onPress = (title, cards) => {
        const {navigation} = this.props;
        navigation.navigate('Deck', {
            title: title,
            cards: cards
        })
    }

    render() {
        this.getLatestDecks();
        if (this.state.decks === null) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )
        }

        const decksArray = Object.values(this.state.decks);
        if (isEmptyArray(decksArray)){
            return (
                <View style={styles.container}>
                    <Text style={{fontWeight: 'bold', fontSize: 25, borderWidth: 1,}}>
                        Please add cards by tapping on Add Deck button in tab bar at the bottom...
                    </Text>
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                {decksArray.map(
                    (deck) => {
                        return (
                            <TouchableOpacity key={deck.title} onPress={() => this.onPress(deck.title, deck.questions.length)}>
                                <DeckDetails title={deck.title} cards={deck.questions.length}/>
                            </TouchableOpacity>
                        );
                    })}
                <View style={{marginBottom: 30}}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
        marginTop: 20,
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 16,
    },
    deckContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexBasis: 120,
        minHeight: 120,
        borderWidth: 1,
        borderColor: '#aaa',
        backgroundColor: white,
        borderRadius: 5,
        marginBottom: 10
    },
    deckText: {
        fontSize: 28
    },
    cardText: {
        fontSize: 18,
        color: gray
    }
});

export default DecksList;