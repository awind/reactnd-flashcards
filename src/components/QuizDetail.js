import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { white, blue, red, green } from '../utils/colors'

const MainView = styled.View`
    flex: 1;
`

const ContainerView = styled.View`
    flex: 1;
    padding-top: 20px;
`

const TopLeftTitle = styled.Text`
    font-size: 24;
    margin-top: 100px;
    text-align: center;
`

const ActionBtnContainer = styled.View`
    align-item: center;
    justify-content: center;
    flex: 1;
`

const BackBtnContainer = styled.View`
    align-items: center;
    justify-content: space-around;
    margin-top: 16;
`

const TextButton = styled.TouchableOpacity`
    margin-top: 16px;
    width: 280px;
    borderRadius: 5;
    justify-content: center;
`

const CorrentText = styled.Text`
    background: green;
    font-size: 18;
    padding: 8px;
    text-align: center;
    color: white;
`

const WrongText = styled.Text`
    background: red;
    font-size: 18;
    padding: 8px;
    text-align: center;
    color: white;
`

const HeaderText = styled.Text`
    font-size: 28;
`

const SubheadText = styled.Text`
    font-size: 18;
    color: green;
    margin-top: 8px;
`



class QuizDetail extends Component {

    static navigationOptions = {
        headerStyle: { backgroundColor: blue },
        headerTitleStyle: { color: white },
        headerTintColor: white,
    }

    state = {
        questionIndex: 0,
        correctAnswers: 0,
        isShowAnswer: false,
    }

    startQuiz = () => {
        this.setState(
            {
            questionIndex: 0, 
            correctAnswers: 0, 
            isShowAnswer: false
        })
    }

    showAnswer = () => {
        this.setState({
            isShowAnswer: !this.state.isShowAnswer,
        })
    }

    backToDeck = () => {
        this.props.navigation.goBack()
    }

    handleCorrectBtn = () => {
        const { questionIndex, correctAnswers } = this.state
        this.setState({
            questionIndex: questionIndex + 1,
            correctAnswers: correctAnswers + 1,
            isShowAnswer: false,
        })
    }

    handleIncorrectBtn = () => {
        this.setState({
            questionIndex: this.state.questionIndex + 1,
        })
    }

    render() {
        const {questions} = this.props.navigation.state.params
        const {questionIndex, correctAnswers, isShowAnswer} = this.state
        const isQuestionLeft = questionIndex < questions.length
        const questionLeftCount = questions.length - questionIndex

        return (
            <MainView>
                {isQuestionLeft ? (
                    <ContainerView>

                        <View style={{justifyContent: 'flex-start', flex: 1}}>
                            <View>
                                <TopLeftTitle>{questionLeftCount} / {questions.length}</TopLeftTitle>
                            </View>
                        </View>

                        <View style={{flex: 4}}>
                            <View>
                                {isShowAnswer ? (
                                    <View style={{alignItems: 'center'}}>
                                        <HeaderText>{questions[questionIndex].answer}</HeaderText>

                                        <TouchableOpacity onPress={this.showAnswer}>
                                            <SubheadText>Question</SubheadText>
                                        </TouchableOpacity>

                                    </View>) : (
                                    <View style={{alignItems: 'center'}}>
                                        <HeaderText>{questions[questionIndex].question}</HeaderText>

                                        <TouchableOpacity onPress={this.showAnswer}>
                                            <SubheadText>Answer</SubheadText>
                                        </TouchableOpacity>

                                    </View>
                                )}
                            </View>
                        </View>

                        <View style={{alignItems: 'center', flex: 2}}>
                            <TextButton onPress={this.handleCorrectBtn}>
                                <CorrentText>Correct</CorrentText>
                            </TextButton>
                            <TextButton onPress={this.handleIncorrectBtn}>
                                <WrongText>Incorrect</WrongText>
                            </TextButton>
                        </View>

                    </ContainerView>) : (
                    <ContainerView>
                        <TopLeftTitle>{correctAnswers} / {questions.length} of your answer is Correct</TopLeftTitle>
                        <BackBtnContainer>
                            <TouchableOpacity onPress={this.backToDeck}>
                                <WrongText>Back to Deck</WrongText>
                            </TouchableOpacity>
                        </BackBtnContainer>
                    </ContainerView>
                )}
            </MainView>
        )
    }
}

function mapStateToProps(state) {
    return {
        decks: state,
    }
}

export default connect(mapStateToProps, )(QuizDetail)
