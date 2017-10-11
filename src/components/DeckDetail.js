import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { blue, white, black } from '../utils/colors'
import { connect } from 'react-redux'
import styled from 'styled-components/native'


const ContainerView = styled.View`
    flex: 1;
`

const TextContainerView = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const AddCardBtn = styled.TouchableOpacity`
    background: white;
    margin: 24px;
    padding: 10px;
    borderRadius: 7;
    height: 45px;
`

const StartBtn = styled.TouchableOpacity`
    background: black;
    margin: 24px;
    padding: 40px;
    height: 45px;
    borderRadius: 2;
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

    render() {
        const { title } = this.props.navigation.state.params
        // console.log(this.props.decks[title])
        // console.log(this.props.decks[title].questions)
        const questions = this.props.decks[title] && this.props.decks[title].questions

        return (
            <ContainerView>
                <TextContainerView>
                    <Text style={{fontSize: 36}}>{title}</Text>
                    <Text style={{fontSize: 24, marginTop: 12}}>{questions.length} cards</Text>
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

                <StartBtn>
                    <StartQuestionTitle>Start Quiz</StartQuestionTitle>
                </StartBtn>
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
