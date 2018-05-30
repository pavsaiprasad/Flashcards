import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import {
    getDeckDetails,
} from '../actions';
import StyledButton from './StyledButton'

class DeckView extends React.Component {
    componentDidMount() {
        this.props.getDeckDetails(this.props.navigation.state.params.deckKey);
    }

    componentDidUpdate() {
        this.props.getDeckDetails(this.props.navigation.state.params.deckKey);
    }
   
    navigateToAddNewCard() {
    this.props.navigation.navigate(
        'AddNewCard',
        {
            title: this.props.title
        }
        );
    }

    navigateToQuizView() {
    this.props.navigation.navigate(
        'QuizView',
        {
            title: this.props.title,
            questions: this.props.questions
        }
    );
    } 

    render() {
        return (
            <View>
                <Card title={this.props.title} >
                    <Text style={{ marginBottom: 10, textAlign: 'center' }}>
                        {this.props.questions ? this.props.questions.length : 0} cards
                    </Text>
                    <View>
                        <StyledButton
                            backgroundColor='#292477'
                            title='Add Card'
                            onPress={this.navigateToAddNewCard.bind(this)}
                        />
                        <StyledButton
                            backgroundColor='#96C051'
                            title='Start Quiz'
                            onPress={this.navigateToQuizView.bind(this)}
                        />
                    </View>
                </Card>
            </View>
        )
    }
}

const mapStateToProps = state => {
    const { title, questions } = state.deck ? state.deck : ('', []);
    return { title, questions };
};

export default connect(mapStateToProps, {getDeckDetails})(DeckView);
