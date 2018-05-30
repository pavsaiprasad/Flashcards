import React from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import { fetchDecks } from '../actions';
import { purple, white, lightPurp, lightgray } from '../utils/colors'

class Home extends React.Component {
    componentDidMount() {
        this.props.fetchDecks();
    }

    componentDidUpdate() {
        this.props.fetchDecks()
    }

    navigateToDeckView() {
    this.props.navigation.navigate(
        'DeckView',
        {
            deckKey: item.key,
            title: item.title
        }
    );
    } 

    renderItem = ({ item, index }) =>
        <TouchableOpacity
            onPress={this.navigateToDeckView.bind(this)}
        >
            <View style={[{ flex: 2 }, index % 2 == 0 ? { backgroundColor: lightPurp, padding: 10 } :
                { backgroundColor: '#dfecca', padding: 10 }]}>
                <Card
                    title={item.title}
                    subtitle={`${item.questions.length} cards`}>
                    <Text>
                        {`${item.questions.length} cards`}
                    </Text>
                </Card>
            </View>
        </TouchableOpacity>;


    render() {
        return (
            <View style={styles.container}>
                {this.props.decks.length > 0
                    ?
                    <FlatList
                        data={this.props.decks}
                        renderItem={this.renderItem}
                    />
                    : <Card title="Click on the Add Deck tab to get started" />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapStateToProps = state => {
    return { 
        decks : state.decks 
    };
};

export default connect(mapStateToProps, { fetchDecks })(Home);

