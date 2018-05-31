import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import AddNewDeck from './components/AddNewDeck'
import { Provider } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import Home from './components/Home'
import DeckView from './components/DeckView'
import AddNewCard from './components/AddNewCard'
import QuizView from './components/QuizView';
import reducer from './reducers'
import store from './utils/store';
import { setLocalNotification } from './utils/notification-helper';

function Status({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={30} color={tintColor} />
    },
  },
  AddNewDeck: {
    screen: AddNewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'Home',
    },
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: 'Deck',
    },
  },
  AddNewDeck: {
    screen: AddNewDeck,
    navigationOptions: {
      title: 'New Deck',
    },
  },
  AddNewCard: {
    screen: AddNewCard,
    navigationOptions: {
      title: 'New Card',
    },
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: 'Quiz',
    },
  },
  
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Status backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

