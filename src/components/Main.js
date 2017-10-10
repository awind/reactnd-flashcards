import React, { Component } from 'react'
import { View, StatusBar, Platform } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import styled from 'styled-components/native'
import reducer from '../reducers'
import DeckList from './DeckList'
import AddDeck from './AddDeck'
import AddQuestion from './AddQuestion'
import DeckDetail from './DeckDetail'
import QuizDetail from './QuizDetail'
import { blue, white } from '../utils/colors'

const Tabs = TabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Deck List'
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck'
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? blue : white,
        style: {
            backgroundColor: Platform.OS === 'ios' ? white : blue,
        }
    }
})

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            title: 'Home',
        }
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            title: 'Deck Detail',
        }
    },
    AddQuestion: {
        screen: AddQuestion,
        navigationOptions: {
            title: 'Add Question',
        }
    },
    QuizDetail: {
        screen: QuizDetail,
        navigationOptions: {
            title: 'Quiz Detail'
        }
    },
}, {
    headerMode: 'float',
})

function DeckStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

export default class Main extends Component {
    
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <DeckStatusBar backgroundColor={blue} barStyle='light-content'/>
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}