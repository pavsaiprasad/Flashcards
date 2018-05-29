import React, { Component } from 'react';
import { Alert, View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCard } from '../actions'
import { purple, white, lightPurp, lightgray } from '../utils/colors'
import DeckView from './DeckView'
import { NavigationActions } from 'react-navigation'

class AddNewCard extends Component {
    state = {
        question: '',
        answer: '',
    };
    
    push = (routeName, params) => {
         return NavigationActions.navigate({
             routeName,
             params
        })
    }
    handleOnPress = () => {
        if (this.state.question.length < 2) {
            return Alert.alert(
                'Your question',
                'needs more than 2 characters.',
                { text: 'OK' },
                { cancelable: false }
            );
        }

        if (this.state.answer.length < 2) {
            return Alert.alert(
                'Your answer',
                'needs more than 2 characters.',
                { text: 'OK' },
                { cancelable: false }
            );
        }

        const { title } = this.props.navigation.state.params;
        const payload = {
            title,
            question: this.state.question,
            answer: this.state.answer,
        };
        this.props.addNewCard(payload);
        this.props.navigation.dispatch(this.push('Home'))
    };

    render() {
        return (
            <View>
                <Text style={{ fontSize: 20, color: purple, padding: 15, marginTop:20 }}>What question would you like to add?</Text>
                <TextInput
                    style={{ height: 50, borderColor: 'gray', borderWidth: 1 }}
                    placeholder="Question"
                    maxLength={100}
                    blurOnSubmit
                    keyboardType="default"
                    onChangeText={question => this.setState({ question })}
                />
                <Text style={{ fontSize: 20, color: purple, padding: 15 }}>What answer would you like to add?</Text>
                <TextInput
                    style={{ height: 50, borderColor: 'gray', borderWidth: 1 }}
                    placeholder="Answer"
                    maxLength={100}
                    blurOnSubmit
                    keyboardType="default"
                    onChangeText={answer => this.setState({ answer })}
                /> 
                <Button title='Submit' style={{ padding: 20, color: purple }} onPress={() => this.handleOnPress(this.state)}>
                </Button>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch, { navigation }) {
    return {
        addNewCard: (card) => dispatch(addCard(card)),
        goBack: () => navigation.push({
            component: DeckView
        })
    }
}

export default connect(null, mapDispatchToProps)(AddNewCard);
