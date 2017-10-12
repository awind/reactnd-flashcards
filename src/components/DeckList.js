import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Button, Platform } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { addDecks } from '../actions'
import { black, white, blue, lightPurp } from '../utils/colors'
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

const AddBtn = styled.TouchableOpacity`
    padding: 20px;
`

const AddText = styled.Text`
    color: white;
    text-align: center;
`


class DeckList extends Component {

    handleAddDeck = () => {
        this.props.navigation.navigate('AddDeck', )
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            headerStyle: { backgroundColor: blue },
            headerTitleStyle: { color: white },
            headerTintColor: white,
            headerRight: (<AddBtn onPress={() => params.handleAddDeck()}>
                <AddText>Add</AddText>
            </AddBtn>),
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        getDecks().then(decks => dispatch(addDecks(decks)))

        this.props.navigation.setParams({handleAddDeck: this.handleAddDeck})
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