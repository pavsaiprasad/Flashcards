import React from 'react';
import { View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
    Button,
    Card
} from 'react-native-elements';
import StyledButton from './StyledButton'

class QuizView extends React.Component {
    state = {
        showQuestion: true,
        questions: this.shuffleQuestions(),
        currentQuestion: 0,
        correctAnswers: 0
    };
    
    resetQuiz() {
        this.setState(() => {
            return {
                showQuestion: true,
                questions: this.shuffleQuestions(),
                currentQuestion: 0,
                correctAnswers: 0
            }
        });
    }

    backToDeck() {
        const backAction = NavigationActions.back();
        this.resetQuiz();
        this.props.navigation.dispatch(backAction);
    }

    shuffleQuestions() {
        const questions = this.props.navigation.state.params.questions;
        let i = questions.length - 1;

        do {
            const randomIndex = Math.floor(Math.random() * (questions.length - 1));
            const swapTarget = questions[randomIndex];
            questions[randomIndex] = questions[i];
            questions[i] = swapTarget;
            i--;
        } while (i >= 0);

        return questions;
    }

    renderCard() {
        const {
            questions,
            currentQuestion,
            correctAnswers
    } = this.state;

        if (currentQuestion < questions.length) {
            return (
                <Card
                    title={
                        this.state.showQuestion
                            ? `Q: ${questions[currentQuestion].question}`
                            : `A: ${questions[currentQuestion].answer}`
                    }
                >
                    <View>
                        <Text>
                            {`Question ${currentQuestion + 1} of ${questions.length}`}
                        </Text>
                    </View>
                    <StyledButton
                        backgroundColor='#292477'
                        onPress={() => this.setState({ showQuestion: !this.state.showQuestion })}
                        title = {this.state.showQuestion ? "Find out the Answer" : "Next Question"}
                    />
                    <StyledButton
                        title="Got the answer right! 😊"
                        backgroundColor='#377D22'
                        onPress={() => {
                            this.setState({
                                currentQuestion: currentQuestion + 1,
                                correctAnswers: correctAnswers + 1,
                                showQuestion: true 
                            });
                        }}
                    />
                    <StyledButton
                        title="Got it wrong ☹️"
                        backgroundColor='#96C051'
                        onPress={() => this.setState({ 
                            currentQuestion: currentQuestion + 1, 
                            showQuestion: true })}
                    />
                </Card>
            );
        }
        return (
            <Card
                title={`You got ${correctAnswers} out of ${questions.length}`}
            >
                <Button
                    title="Take the quiz again 🔁"
                    backgroundColor='#292477'
                    onPress={() => this.resetQuiz()}
                />
                <Button
                    buttonStyle={[ { marginTop: 10 }]}
                    title="Back to Deck "
                    backgroundColor='#96C051'
                    onPress={() => this.backToDeck()}
                />
            </Card>
        );
    }

    render() {
        return (
            <View>
                {this.renderCard()}
            </View>
        );
    }
}

export default QuizView;
