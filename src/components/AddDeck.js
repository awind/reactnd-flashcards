import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native'
import { black, white, blue, green } from '../utils/colors'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeck } from '../utils/api'

const ContainerView = styled.View`
    flex: 1;
    align-items: center;
    margin-top: 20px;
`
const InputView = styled.TextInput`
    width: 300px;
    height: 44px;
    padding: 8px;
    margin: 24px;
    border-width: 1px;
    border-color: white;
    background: white;
`

const TitleView = styled.Text`
    fontSize: 24;
    margin-top: 16px;
    margin-bottom: 8px;
`

const SubmitBtn = styled.TouchableOpacity`
    background: green;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 48px;
    padding-right: 48px;
    height: 44px;
    border-radius: 1px;
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
        const input = this.state.text
        const { decks } = this.props
        if(!input) {
            Alert.alert('Warninga', 'Deck name can not be empty!')
        } else {
            if(decks[input]) {
                Alert.alert('Error', 'Deck already exists.')
            } else {
                const newDeck = {[input]: {title: input, questions: []}}
                this.props.addDeck(newDeck)
                saveDeck(newDeck)
                this.setState({text: ''})
                this.props.navigation.goBack()
            }
        }
    }

    render() {
        return (
            <ContainerView>
                <TitleView>What is the title of your new deck?</TitleView>

                <KeyboardAvoidingView>
                    <InputView 
                        value={this.state.text}
                        onChangeText={(text) => this.setState({text})} />
                </KeyboardAvoidingView>

                <SubmitBtn onPress={this.addNewDeck}>
                    <SubmitTitle>Submit</SubmitTitle>
                </SubmitBtn>
            </ContainerView>
        )
    }
}

const mapStateToProps = (state) => ({
    decks: state,
})

const mapDispatchToProps = (dispatch) => ({
    addDeck(newDeck) {
        dispatch(addDeck(newDeck))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)