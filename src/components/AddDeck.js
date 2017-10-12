import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { black, white, blue } from '../utils/colors'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeck } from '../utils/api'

const ContainerView = styled.View`
    flex: 1;
    align-items: center;
`
const DeckInputView = styled.TextInput`
    width: 300px;
    height: 44px;
    padding: 8px;
    margin: 24px;
    border-width: 1px;
    border-color: white;
    background: white;
`

const SubmitBtn = styled.TouchableOpacity`
    background: black;
    padding: 10px;
    height: 44px;
`

const SubmitTitle = styled.Text`
    color: white;
    font-size: 22;
    text-align: center;
`

class AddDeck extends Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: blue },
        headerTitleStyle: { color: white },
        headerTintColor: white,
    }

    state = {
        text: ''
    }

    addNewDeck = () => {
        console.log('Add New Deck')
        const input = this.state.text
        const { decks } = this.props
        if(!input) {
            Alert.alert('Warninga', 'Deck name can not be empty!')
        } else {
            if(decks[input]) {
                Alert.alert('Error', 'Deck already exists.')
            } else {
                const newDeck = {[input]: {title: input, questions: []}}
                this.props.dispatch(addDeck(newDeck))
                saveDeck(newDeck)
                
                Alert.alert('Success!', 'Deck Added',
                [
                    {text: 'OK', onPress: () => this.props.navigation.goBack()},
                ],)
                this.setState({text: ''})
            }
        }
    }

    render() {
        return (
            <ContainerView>
                <Text style={{fontSize: 28}}>What is the title of your new deck?</Text>

                <DeckInputView 
                    value={this.state.text}
                    onChangeText={(text) => this.setState({text})} />

                <SubmitBtn onPress={this.addNewDeck}>
                    <SubmitTitle>Submit</SubmitTitle>
                </SubmitBtn>
            </ContainerView>
        )
    }
}

function mapStateToProps(state) {
    return {
        decks: state,
    }
}

export default connect(mapStateToProps, )(AddDeck)