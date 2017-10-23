import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Button, Platform, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { addDecks } from '../actions'
import { black, white, blue, red } from '../utils/colors'
import DeckItem from './DeckItem'
import styled from 'styled-components/native'

const ListContainer = styled.View`
    flex: 1;
    flex-direction: row;
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

const LeftSwipeButton = styled.View`
    flex: 1;
    alignItems: flex-end;
    justifyContent: center;
    paddingRight: 20;
    background: red;
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
                <AddText>Add Deck</AddText>
            </AddBtn>),
        }
    }

    componentDidMount() {
        getDecks().then(decks => this.props.addDecks(decks))
        // set params for right button
        this.props.navigation.setParams({handleAddDeck: this.handleAddDeck})
    }
    
    renderItem = ({item}) => {

        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetail', item)}>
                <DeckItem 
                    title={item.title}
                    questions={item.questions}
                />
            </TouchableOpacity>
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
                { Object.keys(this.props.decks).length !== 0 ?
                    <FlatList
                        data={Object.values(this.props.decks).sort((firstItem, secondItem) => firstItem.title > secondItem.title)}
                        renderItem={this.renderItem}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={(item, index) => index} /> 
                        : <View style={{justifyContent: 'center'}}><Text style={{fontSize: 28, textAlign:'center', color: 'gray'}}>No Data.</Text></View>
                }
            </ListContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    decks: state,
})

// const mapDispatchToProps = (dispatch) => ({
//     addDecks(decks) {
//         dispatch(addDecks(decks))
//     }
// })

export default connect(mapStateToProps, { addDecks })(DeckList)