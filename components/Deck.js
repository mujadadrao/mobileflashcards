import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {black, gray, red, white} from "../utils/colors";
import {getDeck, removeDeck} from "../utils/api";

class Deck extends Component {
    state = {
        deck: null,
        loaded: false,
    }

    deleteDeck = (deckName) => {
        const {navigation} = this.props;
        removeDeck(deckName);
        navigation.navigate('Home');
    }

    getDeckObject = (title) => {
        if(!this.loaded) {
            getDeck(title).then(
                (deck) => {
                    if (this.mounted) {
                        this.setState({
                            deck: deck,
                            loaded: true,
                        })
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

    startQuiz = () => {
        const {navigation} = this.props;
        navigation.navigate('Quiz', {
            deck: this.state.deck,
        });
    }

    addCard = (deckName) => {
        const {navigation} = this.props;
        navigation.navigate('Add Card', {deckName: deckName});
    }

    render() {
        const {title} = this.props.route.params;
        this.getDeckObject(title);
        if(this.state.deck === null){
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )
        }
        const questions = this.state.deck && this.state.deck.questions.length;
        return (
            <View style={styles.container}>
                <View style={styles.deckContainer}>
                    <Text style={{fontSize: 28}}>{title}</Text>
                    <Text style={{fontSize: 18, color: gray}}>{questions} cards</Text>
                </View>
                <View style={[styles.btnContainer, {marginBottom: 5}]}>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: white}]} onPress={() => this.addCard(title)}>
                        <Text style={[styles.btnText, {color: black}]}>Add Card</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: black}]} onPress={() => this.startQuiz()}>
                        <Text style={[styles.btnText, {color: white}]}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: white, marginTop: 30}]}
                                      onPress={() => this.deleteDeck(title)}>
                        <Text style={[styles.btnText, {color: red}]}>Delete Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: `center`,
    },
    deckContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 120,
        borderWidth: 1,
        borderColor: black,
        backgroundColor: white,
        marginBottom: 10
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: white,
    },
    btn: {
        borderWidth: 1,
        borderColor: black,
        width: 200,
        height: 50,
        justifyContent: `center`,
        alignItems: `center`,
    }
});

export default Deck;