import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {black, green, purple, red, white} from "../utils/colors";
import {isEmptyArray} from "../utils/helpers";
import {setLocalNotification, clearLocalNotification} from "../utils/helpers";


class Quiz extends Component {
    state = {
        questions: null,
        correct: 0,
        incorrect: 0,
        questionNumber: 0,
        showAnswer: false,
        currentQuestion: null,
        showResult: false,
    };

    resetState = () => {
        const {deck} = this.props.route.params;
        this.setState({
            questions: deck.questions,
            correct: 0,
            incorrect: 0,
            questionNumber: 0,
            showAnswer: false,
            currentQuestion: isEmptyArray(deck.questions) ? null : deck.questions[0],
            showResult: false,
        })
    }

    componentDidMount() {
        clearLocalNotification().then(setLocalNotification);
        const {deck} = this.props.route.params;
        this.setState({
            questions: deck.questions,
            currentQuestion: isEmptyArray(deck.questions) ? null : deck.questions[0],
        })
    }

    handleShowAnswer = () => {
       this.setState((prevState) => ({
           showAnswer: !prevState.showAnswer,
       }))
    }

    handleAnswer = (answerType) => {
        if (answerType === 'correct') {
            this.setState((prevState) => ({
                correct: prevState.correct + 1
            }))
        } else {
            this.setState((prevState) => ({
                incorrect: prevState.incorrect + 1
            }))
        }

        const nextQuestionIndex = this.state.questionNumber + 1;
        if (nextQuestionIndex < this.state.questions.length){
            this.setState({
                currentQuestion: this.state.questions[nextQuestionIndex],
                questionNumber: nextQuestionIndex,
            })
        } else {
            this.setState(() => ({
                showResult: true
            }))
        }
    }

    backToDeck = () => {
        const {navigation} = this.props;
        const {deck} = this.props.route.params;
        navigation.navigate('Deck', {
            title: deck.title,
        })
    }

    render() {
        if (isEmptyArray(this.state.questions)) {
            return (
                <View style={styles.container}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        Please add questions to the deck for starting a quiz!
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={{flex: 1}}>
                    <View>
                        <Text style={styles.questionCounter}>
                            {this.state.questionNumber + 1}/{this.state.questions.length}
                        </Text>
                    </View>
                    {this.state.showResult ?
                        <View style={styles.container}>
                            <Text style={{fontWeight: 'bold', fontSize: 25, color: purple}}>
                                Results
                            </Text>
                            <Text style={{fontWeight: 'bold', fontSize: 20, color: green}}>
                                Correct: {this.state.correct}
                            </Text>
                            <Text style={{fontWeight: 'bold', fontSize: 20, color: red}}>
                                Incorrect: {this.state.incorrect}
                            </Text>
                            <Text style={{fontWeight: 'bold', fontSize: 20, color: red}}>
                                Correct Percentage: {((this.state.correct / this.state.questions.length) * 100).toFixed(0)}
                            </Text>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={[styles.btn, {backgroundColor: green, marginTop: 20}]}
                                                  onPress={() => this.resetState()}>
                                    <Text style={[styles.btnText, {color: white}]}>Restart Quiz</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={[styles.btn, {backgroundColor: red, marginTop: 5}]}
                                                  onPress={() => this.backToDeck()}>
                                    <Text style={[styles.btnText, {color: white}]}>Back to Deck</Text>
                                </TouchableOpacity>
                            </View>
                        </View> :
                        <View style={styles.container}>
                            <Text style={styles.questionText}>{
                                this.state.showAnswer? this.state.currentQuestion.answer : this.state.currentQuestion.question
                            }</Text>
                            <View>
                                <TouchableOpacity onPress={() => this.handleShowAnswer()}>
                                    <Text style={{color: red, fontWeight: 'bold', marginTop:20, marginBottom: 50}}>
                                        Show {this.state.showAnswer ? 'Question' : 'Answer'}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={[styles.btn, {backgroundColor: green}]}
                                                  onPress={() => this.handleAnswer('correct')}>
                                    <Text style={[styles.btnText, {color: white}]}>Correct</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={[styles.btn, {backgroundColor: red, marginTop: 5}]}
                                                  onPress={() => this.handleAnswer('incorrect')}>
                                    <Text style={[styles.btnText, {color: white}]}>Incorrect</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }


                </View>
            )
        }
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
    questionCounter: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: white,
        padding: 20
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: black,
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

export default Quiz;