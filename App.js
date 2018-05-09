import React from 'react';
import { FlatList, Dimensions, ScrollView, StyleSheet, Text, View, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import FastImage from 'react-native-fast-image';

import Newsline from './newsline/Newsline';
import MwartbaDetails from './mwartba/MwartbaDetails';
import NewslineDetails from './newsline/NewslineDetails';
import TranspoAdvocate from './transpo_advocate/TranspoAdvocate';
import TranspoAdvocateDetails from './transpo_advocate/TranspoAdvocateDetails';

import styles from './styles/PostStyles';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      isLoading: true,
      dataSource: []
    }
  }

  componentDidMount(){
    const url1 = fetch('https://mwrtba.org/wp-json/feed/v1/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.items
      })
    const url2 = fetch('https://newsline.artba.org/wp-json/feed/v1/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.items
      })
    const url3 = fetch('https://transportationinvestment.org/wp-json/feed/v1/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.items
      })


    Promise.all([url1, url2, url3])
    .then((responseJson) => {
      let responseConcat = responseJson[0].concat(responseJson[1], responseJson[2])
      responseConcat = responseConcat.sort((a, b) => {
        return new Date(b.date_published) - new Date(a.date_published)
      })
      this.setState({
        dataSource: responseConcat,
        isLoading: false,
      }, function(){
        console.log(responseConcat)
      });
    })
    .catch((error) => {
      console.log(error)
    })
  }



  renderItem = ({ item }) => {
      return(
        <View style={styles.container} key={item.title}>
          <View style={{paddingTop: 5, flex: 1}}>
            <FastImage source={{uri: item.image, priority: FastImage.priority.high}} style={styles.image}/>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>{}</Text>
            <Text style={styles.date}>
              {new Date(item.date_published).toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}
            </Text>
          </View>
          <View
            style={{ height: 1, width: Dimensions.get('window').width-30, backgroundColor: '#c12222', marginLeft: 15, marginTop: 10, marginBottom: 10}}>
          </View>
        </View>
      )
  }

  render(){
    return(
      this.state.isLoading
      ?
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#c12222"/>
      </View>
      :
      <View style={{flex: 1, height: '100%'}}>
        <Image source={require('./assets/ARTBA-Logo-2016.png')}/>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const HomeStack = StackNavigator({
  Home: { screen: App },
  MwartbaDetails: {screen: MwartbaDetails },
  NewslineDetails: { screen: NewslineDetails },
  TranspoAdvocateDetails: { screen: TranspoAdvocateDetails }
});

export default TabNavigator({
  Home: { screen: HomeStack }
},
{
  tabBarOptions: {
    activeTintColor: '#e80000',
    inactiveTintColor: 'gray',
    labelStyle: {
      fontSize: 12,
      paddingBottom: 15

    },
    activeBackgroundColor: '#EEEEEE',
    inactiveBackgroundColor: 'white',
    style: {
      alignItems: 'center',
      height: 45
    }
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false,
});
