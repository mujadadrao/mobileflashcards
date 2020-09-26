import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DecksList from "./components/DecksList";
import {NavigationContainer} from '@react-navigation/native';
import AddDeck from "./components/AddDeck";
import {AntDesign, Entypo} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Deck from "./components/Deck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import {resetDecks} from "./utils/api";
import {setLocalNotification} from "./utils/helpers";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const MyTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={DecksList} options={{
                tabBarIcon: () => <Entypo name={'list'}/>
            }}/>
            <Tab.Screen name="Add Deck" component={AddDeck} options={{
                tabBarIcon: () => <AntDesign name={'addfile'}/>
            }}/>
        </Tab.Navigator>
    )
}

const MyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={MyTabs}/>
            <Stack.Screen name="Deck" component={Deck}/>
            <Stack.Screen name="Add Card" component={AddCard}/>
            <Stack.Screen name="Quiz" component={Quiz}/>
        </Stack.Navigator>
    )
}

export default class App extends Component {
    state = {
        loaded: false,
    }

    async componentDidMount() {
        setLocalNotification();
        resetDecks().then(() => {
            this.setState({
                loaded: true,
            })
        })
    }

    render() {
        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        Loading...
                    </Text>
                </View>
            )
        }
        return (
            <NavigationContainer>
                <MyStack/>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
