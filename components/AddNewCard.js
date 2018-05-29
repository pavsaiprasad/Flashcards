import React from 'react';
import { View} from 'react-native';
import {
    Card,
    Button,
    FormLabel,
    FormInput,
    FormValidationMessage
} from 'react-native-elements';
import { addCardToDeck } from '../utils/api';


class AddNewCard extends React.Component {
    state = {
        questionText: '',
        answerText: '',
        errorMessage: ''
    };

    handleSubmit = () => {
        if (this.state.questionText && this.state.answerText) {
            const { questionText, answerText } = this.state;
            const title = this.props.navigation.state.params.title;

            const card = {
                question: questionText,
                answer: answerText
            };

            addCardToDeck(title, card);

            this.setState({
                errorMessage: false,
                questionText: '',
                answerText: ''
            });

            this.props.navigation.goBack();
        } else {
            this.setState({ errorMessage: true })
        }
    };

    render() {
        return (
            <View>
                <Card title="Add a Card" >
                    <FormLabel>Question:</FormLabel>
                    <FormInput
                        onChangeText={questionText => this.setState({ questionText })}
                        value={this.state.titleText}
                    />
                    <FormLabel>Answer:</FormLabel>
                    <FormInput
                        onChangeText={answerText => this.setState({ answerText })}
                        value={this.state.titleText}
                    />
                    <FormValidationMessage>
                        {this.state.errorMessage ? 'Please fill all the fields' : ''}
                    </FormValidationMessage>
                    <Button
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

export default AddNewCard;
