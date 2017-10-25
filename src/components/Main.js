import React, { Component } from 'react'
import { View, StatusBar, Platform } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import { StackNavigator } from 'react-navigation'
import styled from 'styled-components/native'
import reducer from '../reducers'
import DeckList from './DeckList'
import AddDeck from './AddDeck'
import AddQuestion from './AddQuestion'
import DeckDetail from './DeckDetail'
import QuizDetail from './QuizDetail'
import { blue, white } from '../utils/colors'
import { setLocalNotification } from '../utils/helpers'

const MainNavigator = StackNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            title: 'Deck List',
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            title: 'Add Deck'
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

const prevGetStateForActionHomeStack = MainNavigator.router.getStateForAction

MainNavigator.router = {
    ...MainNavigator.router,
    getStateForAction(action, state) {
        if (state && action.type === 'ReplaceCurrentScreen') {
            const routes = state.routes.slice(0, state.routes.length - 1)
            routes.push(action)
            return {
                ...state,
                routes,
                index: routes.length - 1,
            }
        }
        return prevGetStateForActionHomeStack(action, state);
    },
}

function DeckStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

export default class Main extends Component {

    componentDidMount() {
        setLocalNotification()
    }
    
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