import React from 'react';
import {
    Text,
    View
} from 'react-native';
import {
    Button,
    Card,
    FormInput,
    FormValidationMessage,
    FormLabel
} from 'react-native-elements';
import { saveDeckTitle } from '../utils/api';
import StyledButton from './StyledButton'

export default class AddNewDeck extends React.Component {
    state = {
        titleText: '',
        errorMessage: false
    };

    handleSubmit = () => {
        if (this.state.titleText) {
            const { titleText } = this.state;
            saveDeckTitle(titleText);
            this.setState({
                errorMessage: false,
                titleText: ''
            });
            this.props.navigation.navigate(
                'DeckView',
                {
                    deckKey: titleText,
                    title: titleText
                },
            );
        } else {
            this.setState({ errorMessage: true })
        }
    };

    render() {
        return (
            <View>
                <Card title="Add new Deck" >
                    <FormLabel>What is the title of your new deck?</FormLabel>
                    <FormInput
                        onChangeText={titleText => this.setState({ titleText })}
                        value={this.state.titleText}
                    />
                    <FormValidationMessage>
                        {this.state.errorMessage ? 'Please fill this field' : ''}
                    </FormValidationMessage>
                    <StyledButton
                        title="Submit"
                        raised
                        backgroundColor='#292477'
                        onPress={this.handleSubmit}
                    />
                </Card>
            </View>
        );
    }
}