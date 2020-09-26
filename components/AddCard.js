import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import {black, gray, white} from "../utils/colors";
import {addCardToDeck, getDeck} from "../utils/api";

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
    }

    handleQuestionTextChange = (question) => {
        this.setState(() => ({
            question,
        }));
    };

    handleAnswerTextChange = (answer) => {
        this.setState(() => ({
            answer,
        }));
    };

    handleSubmit = () => {
        const {navigation} = this.props;
        const{deckName} = this.props.route.params;
        const card = {
            question: this.state.question,
            answer: this.state.answer
        };
        this.setState(() => ({
            question: '',
            answer: ''
        }));

        addCardToDeck(deckName, card);
        navigation.navigate('Deck', {
            title: deckName
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput} value={this.state.question} onChangeText={this.handleQuestionTextChange}
                           placeholder={'Enter question here?'} autoFocus={true}
                           onSubmitEditing={() => this.textInputAnswer.focus()}
                           returnKeyType="next"/>
                <TextInput style={styles.textInput} value={this.state.answer} onChangeText={this.handleAnswerTextChange}
                           placeholder={'Enter answer here?'} ref={(input) => {this.textInputAnswer = input}}
                           returnKeyType="done" onSubmitEditing={this.handleSubmit}/>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: black}]} onPress={() => this.handleSubmit()}>
                        <Text style={[styles.btnText, {color: white}]}>Submit</Text>
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
    textInput: {
        borderWidth: 1,
        borderColor: black,
        marginBottom: 20,
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

export default AddCard;