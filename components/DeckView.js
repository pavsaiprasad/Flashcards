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
                            onPress={() => {
                                this.props.navigation.navigate(
                                    'AddNewCard',
                                    {
                                        title: this.props.title
                                    }
                                );
                            }
                            }
                        />
                        <StyledButton
                            backgroundColor='#96C051'
                            title='Start Quiz'
                            onPress={() => {
                                this.props.navigation.navigate(
                                    'QuizView',
                                    {
                                        title: this.props.title,
                                        questions: this.props.questions
                                    }
                                );
                            }
                            }
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
