import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { blue, white } from '../utils/colors'
import styled from 'styled-components/native'

class AddQuestion extends Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: blue },
        headerTitleStyle: { color: white },
        headerTintColor: white,
    }

    render() {
        return (
            <View>
                <Text>Add Question</Text>
            </View>
        )
    }
}

export default AddQuestion