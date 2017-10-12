import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Button, Platform } from 'react-native'
import { connect } from 'react-redux'
import { getDecks, deleteDeck } from '../utils/api'
import { addDecks, removeDeck } from '../actions'
import { black, white, blue, red } from '../utils/colors'
import DeckItem from './DeckItem'
import styled from 'styled-components/native'
import Swipeout from 'react-native-swipeout'

const ListContainer = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
`

const ItemContainer = styled.View`
    background: white;
`
// FlatList separator line
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

    // handle add button action in navigation bar
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

    handleDelete = (item) => {
        const { dispatch } = this.props
        deleteDeck(item).then(decks => dispatch(removeDeck(item.title)))
    }
 
    renderItem = ({item}) => {
        const deleteButton = [
            {
                text: 'Delete',
                backgroundColor: red,
                onPress: (() => {this.handleDelete(item)})
            }
        ]
        return (
            <ItemContainer>
                <Swipeout right={deleteButton}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetail', item)}>
                        <DeckItem 
                            title={item.title}
                            questions={item.questions}
                        />
                    </TouchableOpacity>
                </Swipeout>
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