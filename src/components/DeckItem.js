import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import { white, red } from '../utils/colors'

const ItemContainer = styled.View`
    flex-direction: row;
    height: 120;
    background: white;
    justify-content: center;
    align-items: center;
`

const DeckTitleView = styled.View`
    justify-content: center;
    align-items: center;
`

const DeckHeader = styled.Text`
    font-size: 24;
`

const DeckSubheader = styled.Text`
    font-size: 18;
`

class DeckItem extends Component {

    render() {
        // swipe to right
        const deleteBtn = [{
            text: 'Delete', 
            onPress: () => {console.log('On Press')},
            backgroundColor: red,
        }]
        const { title, questions } = this.props
        return (
            <ItemContainer>
                <DeckTitleView>
                    <DeckHeader>{title}</DeckHeader>
                    <DeckSubheader>{questions && questions.length} cards</DeckSubheader>
                </DeckTitleView>
            </ItemContainer>

        )
    }
}

export default DeckItem