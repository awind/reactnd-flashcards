import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, Button, Platform, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { getDecks, deleteDeck } from '../utils/api'
import { addDecks, removeDeck } from '../actions'
import { black, white, blue, red } from '../utils/colors'
import DeckItem from './DeckItem'
import styled from 'styled-components/native'
import Swipeable from 'react-native-swipeable'

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
        const { dispatch } = this.props
        getDecks().then(decks => dispatch(addDecks(decks)))
        // set params for right button
        this.props.navigation.setParams({handleAddDeck: this.handleAddDeck})
    }

    handleDelete = (item) => {
        const { dispatch } = this.props
        deleteDeck(item).then(decks => dispatch(removeDeck(item.title)))
    }

    swipeable = null
    
    handleUserBeganScrollingParentView() {
        this.swipeable.recenter()
    }

    handleRightActionRelease = () => {
        this.swipeable.recenter()
    }

    state = {
        leftActionActivated: false,
        toggle: false
      }

    handleLeftActionComplete = (item) => {
        const toggle = this.state.toggle
        this.setState({toggle: !toggle})
        // delete item
        deleteDeck(item).then(() => {
            this.props.dispatch(removeDeck(item))
        })

    }
    
    renderItem = ({item}) => {
        const { leftActionActivated, toggle } = this.state
        // swipe to right
        const deleteBtn = [
            <TouchableOpacity style={{flex: 1, backgroundColor: 'red', justifyContent:'center'}}><Text style={{fontSize: 18, paddingLeft: 20, color: white}}>Delete</Text></TouchableOpacity>,
        ]

        return (
            <Swipeable 
                leftActionActivationDistance={200}
                leftContent={(
                    <LeftSwipeButton>
                        {leftActionActivated ?
                        <Text style={{color: white, fontSize: 18}}>release to delete</Text> :
                        <Text style={{color: white, fontSize: 18}}>Pulling to delete</Text>}
                    </LeftSwipeButton>
                )}
                onLeftActionActivate={() => this.setState({leftActionActivated: true})}
                onLeftActionDeactivate={() => this.setState({leftActionActivated: false})}
                onLeftActionComplete={() => this.handleLeftActionComplete(item)}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckDetail', item)}>
                    <DeckItem 
                        title={item.title}
                        questions={item.questions}
                    />
                </TouchableOpacity>
            </Swipeable>
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

function mapStateToProps(state) {
    return {
        decks: state,
    }
}

export default connect(mapStateToProps, )(DeckList)