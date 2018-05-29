import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Header } from 'react-native';
import { connect } from 'react-redux';
import { fetchDecks } from '../utils/api';
import { receiveDecks, addDeck } from '../actions'
import { RECEIVE_DECKS, ADD_DECK } from '../actions'
import { purple, white, lightPurp, lightgray } from '../utils/colors'

class Home extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        fetchDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
    }
    
    render() {
        console.log('.....', this.props.decks);
        this.renderItemList = ({ item, index }) => {
            const { title, questions } = item;
            return (
                <View style={[{ flex: 2}, index % 2 == 0 ? { backgroundColor: lightPurp, padding: 10 } : 
                    { backgroundColor: lightgray, padding: 10 }]}>

                    <Text style={{ fontSize: 25, color: purple }}>{title}</Text>
                    <Text style={{ fontSize: 16, color: purple }}>{questions?questions.length:0} cards</Text>
                </View>
            );
        };

        mapsDeckTitleAndQuestions = (decks) =>
            Object.keys(decks).map(key => ({
                title: decks[key].title,
                questions: decks[key].questions,
            }));

        const decks = mapsDeckTitleAndQuestions(this.props.decks); 
        return (
            <View>
                <FlatList
                    data={decks}
                    renderItem={this.renderItemList}
                    keyExtractor={item => item.title}
                />
            </View>  
        )
    }
}

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Home);
