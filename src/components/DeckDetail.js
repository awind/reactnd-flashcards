import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { blue, white } from '../utils/colors'
import { connect } from 'react-redux'

class DeckDetail extends Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: blue },
        headerTitleStyle: { color: white },
        headerTintColor: white,
    }

    render() {
        return (
            <View>
                <Text>Deck Detail</Text>
            </View>
        )
    }
}

export default DeckDetail
