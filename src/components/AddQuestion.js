import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import { blue, white } from '../utils/colors'
import styled from 'styled-components/native'
import { addQuestion } from '../actions'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'

const ContainerView = styled.View`
    flex: 1;
    align-items: center;
    padding-top: 20px;
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
    background: black;
    padding: 8px;
    height: 44px;
    border-radius: 1px;
`
const SubmitText = styled.Text`
    color: white;
    fontSize: 22;
    text-align: center;
`

class AddQuestion extends Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: blue },
        headerTitleStyle: { color: white },
        headerTintColor: white,
    }

    state = {
        question: '',
        answer: '',
    }

    handleSubmit = () => {
        const { title, questions } = this.props.navigation.state.params
        const { question, answer } = this.state

        if(question === '') {
            Alert.alert('Mandatory', 'Question field can not be empty.')
            return
        }
        if(answer === '') {
            Alert.alert('Mandatory', 'Answer field can not be empty')
            return
        }
        const params = { title, questions, question, answer}
        this.props.dispatch(addQuestion(params))

        addCardToDeck({
            deckTitle: title,
            card: {question, answer},
        })
        Alert.alert('Success!', 'Question Added',
        [
            // OK Action
            {
                text: 'OK', 
                onPress: () => this.props.navigation.goBack()
            },
        ],)
    }

    render() {
        const {question, answer} = this.state
        return (
            <ContainerView>
                <InputView 
                    defaultValue="Question"
                    value={question}
                    placeholder="Question title"
                    onChangeText={inputQuestion => this.setState({question: inputQuestion})}
                />
                <InputView 
                    defaultValue="Answer"
                    placeholder="Answer body"
                    value={answer}
                    onChangeText={inputAnswer => this.setState({answer: inputAnswer})}
                 />

                 <SubmitBtn
                    onPress={this.handleSubmit}
                 >
                    <SubmitText>Submit</SubmitText>
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

export default connect(mapStateToProps, )(AddQuestion)