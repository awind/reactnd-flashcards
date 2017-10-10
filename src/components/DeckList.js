import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { getDecks } from '../utils/api'


class DeckList extends Component {

    componentDidMount() {
        const data = getDecks().then((results) => {
            console.log(results)
        })
    }

    render() {
        return (
            <View>
                <Text>Deck List</Text>
            </View>
        )
    }
}

export default DeckList