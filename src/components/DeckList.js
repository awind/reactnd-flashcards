import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { addDecks } from '../actions'
import { black, white, blue } from '../utils/colors'
import DeckItem from './DeckItem'
import styled from 'styled-components/native'

const ListContainer = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
`

const ItemContainer = styled.View`
    background: white;
`

const SeparatorLine = styled.View`
    height: 1;
    width: 100%;
    background: #CED0CE;
`


class DeckList extends Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: blue },
        headerTitleStyle: { color: white },
    }

    componentDidMount() {
        const { dispatch } = this.props
        getDecks().then(decks => dispatch(addDecks(decks)))
    }

    renderItem = ({item}) => {
        return (
            <ItemContainer>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetail', item)}>
                    <DeckItem 
                        title={item.title}
                        questions={item.questions}
                    />
                </TouchableOpacity>
            </ItemContainer>
        )   
    }

    renderSeparator = () => {
        return (
            <SeparatorLine />
        )
    }

    render() {
        return (
            <ListContainer>
                <FlatList 
                    data={Object.values(this.props.decks).sort((a, b) => a.title > b.title)}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item, index) => index}
                />
            </ListContainer>
        )
    }
}

function mapStateToProps(state) {
    return {
        decks: state,
    }
}

export default connect(mapStateToProps, )(DeckList)