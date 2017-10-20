import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { blue, white, black, green } from '../utils/colors'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { deleteDeck } from '../utils/api'
import { removeDeck } from '../actions'

const ContainerView = styled.View`
    flex: 1;
`

const TextContainerView = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
`

const AddCardBtn = styled.TouchableOpacity`
    background: white;
    margin: 24px;
    padding: 10px;
    borderRadius: 7;
    border-width: 1px;
    border-color: black;
    height: 45px;
`

const StartBtn = styled.TouchableOpacity`
    background: green;
    margin-left: 24px;
    margin-right: 24px;
    margin-top: 16px;
    padding: 24px;
    height: 45px;
    borderRadius: 5;
    border-width: 1px;
    border-color: white;
    justify-content: center;
`

const DeleteBtn = styled.TouchableOpacity`
    background: red;
    margin-left: 24px;
    margin-right: 24px;
    margin-top: 16px;
    padding: 24px;
    height: 45px;
    borderRadius: 5;
    border-width: 1px;
    border-color: white;
    justify-content: center;
`

const AddCardTitle = styled.Text`
    color: black;
    font-size: 22;
    text-align: center;
`

const StartQuestionTitle = styled.Text`
    color: white;
    font-size: 22;
    text-align: center;
`

class DeckDetail extends Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: blue },
        headerTitleStyle: { color: white },
        headerTintColor: white,
    }

    handleDelete = (title) => {
        const { dispatch } = this.props
        deleteDeck(title).then(decks => dispatch(removeDeck(title)))
        this.props.navigation.goBack()
    }

    render() {
        const { title } = this.props.navigation.state.params
        const questions = this.props.decks[title] && this.props.decks[title].questions

        return (
            <ContainerView>
                <TextContainerView>
                    <Text style={{fontSize: 36}}>{title}</Text>
                    <Text style={{fontSize: 24, marginTop: 12}}>{questions && questions.length} cards</Text>
                </TextContainerView>

                <AddCardBtn 
                    onPress={() => {
                        this.props.navigation.navigate('AddQuestion', {
                            title,
                            questions,
                        })
                }}>
                    <AddCardTitle>Add Card</AddCardTitle>
                </AddCardBtn>

                <StartBtn onPress={() => {this.props.navigation.navigate('QuizDetail', {title, questions}) }}>
                    <StartQuestionTitle>Start Quiz</StartQuestionTitle>
                </StartBtn>

                <DeleteBtn onPress={() => this.handleDelete(title)}>
                    <StartQuestionTitle>Delete Deck</StartQuestionTitle>
                </DeleteBtn>
            </ContainerView>

        )
    }
}

function mapStateToProps(state) {
    return {
        decks: state,
    }
}

export default connect(mapStateToProps, )(DeckDetail)
