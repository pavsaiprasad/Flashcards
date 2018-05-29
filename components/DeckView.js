import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { purple, white, lightPurp, lightgray } from '../utils/colors'

const DeckView = (props) => {
    const { title, questions } = props.navigation.state.params;
    return (
        <View>
            <Text style={styles.headline}>Quiz: {title}</Text>
            <Text style={styles.headlineText}>{questions ? questions.length : 0} cards</Text>
                <Button 
                    title='Start quiz' 
                style={{ padding: 20, color: purple }} 
                onPress={() =>
                    props.navigation.navigate('Quiz', {
                        title,
                        questions,
                    })
                }>
                </Button>
                <Button
                    title='Add new card'
                    style={{ padding: 20, color: purple }}
                    onPress={() => props.navigation.navigate('AddNewCard', { title })}>
                </Button>
        </View>
    );
};

const mapStateToProps = (state, ownProps) => ({
    decks: state.decks,
    ownProps: ownProps
});

const styles = StyleSheet.create({
    headline: {
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 26,
        marginTop: 20,
        color: purple,
    },
    headlineText: {
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        color: purple,
    },
});

export default connect(mapStateToProps)(DeckView);
