import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { black, white, blue } from '../utils/colors'

class AddDeck extends Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: blue },
        headerTitleStyle: { color: white },
    }

    render() {
        return (
            <View>
                <Text>Add Deck</Text>
            </View>
        )
    }
}

export default AddDeck