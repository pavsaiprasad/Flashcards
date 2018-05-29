import React, { Component } from 'react';
import { Alert, View, TextInput, Text, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { receiveDecks, addDeck } from '../actions'
import TextButton from './TextButton'
import { purple, white, lightPurp, lightgray } from '../utils/colors'
import { addNewDeck } from '../utils/api';

class AddNewDeck extends Component {
    state = {
        title: '',
    };

    handleOnPress = (payload) => {
        if (this.state.title.length < 1) {
            return Alert.alert(
                'Your question',
                'cannot be left blank.',
                { text: 'OK' },
                { cancelable: false }
            );
        }
        const { dispatch } = this.props
        const { title } = this.state;
        addNewDeck(payload)
            .then((deck) => {this.props.addDeck(decks); this.props.goBack()})
    };

    render() {
        return (
            <View>
                <Text style={{ fontSize: 25, color: purple, paddingBottom: 15 }}>What is the title of your new deck?</Text>
                <TextInput
                    style={{ height: 50, borderColor: 'gray', borderWidth: 1}}
                    placeholder="Deck title"
                    maxLength={50}
                    blurOnSubmit
                    keyboardType="default"
                    onChangeText={title => this.setState({ title })}
                />
                <Button title='Submit' style={{ padding: 20, color:purple}} onPress={() => this.handleOnPress(this.state)}>
                </Button>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch, { navigation }) {
    return {
        addDeck: (deck) => dispatch(addDeck(deck)),
        goBack: () => navigation.goBack(),
    }
}

export default connect(null, mapDispatchToProps)(AddNewDeck);
