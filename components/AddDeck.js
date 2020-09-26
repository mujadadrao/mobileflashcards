import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import {black, gray, white} from "../utils/colors";
import {getDecks, saveDeckTitle} from "../utils/api";

class AddDeck extends Component {
    state = {
        deckName: '',
    }

    handleTextChange = (deckName) => {
        this.setState(() => ({
            deckName,
        }));
    };

    handleSubmit = () => {
        const {navigation} = this.props;
        saveDeckTitle(this.state.deckName);
        this.setState(() => ({
            deckName: '',
        }));
        navigation.navigate('Home');
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput} value={this.state.deckName} onChangeText={this.handleTextChange}
                           placeholder={'Enter deck name here?'} autoFocus={true}
                           returnKeyType="done" onSubmitEditing={this.handleSubmit}/>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: black}]} onPress={this.handleSubmit}>
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

export default AddDeck;