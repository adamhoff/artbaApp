import React from 'react';
import { FlatList, Dimensions, ScrollView, StyleSheet, Text, View, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import { YellowBox } from 'react-native';
import Details from './details/Details';
import Events from './events/Events';
import styles from './styles/PostStyles';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


class App extends React.Component {

static navigationOptions = {
  header: null
};
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
          console.log(this.state.dataSource)
        });
      })
    .catch((error) => {
      console.log(error)
    })
  }

  renderItem = ({ item }) => {
    const Entities = require('html-entities').AllHtmlEntities;
    const entities = new Entities();
    return(
      <View style={styles.container, styles.background} key={item.title}>
        <TouchableHighlight onPress={() => this.props.navigation.navigate("Details", item: item)}
          activeOpacity={1}
          underlayColor={'#eeeeee'}>
          <View style={{paddingTop: 5, flex: 1}}>
            <FastImage source={{uri: item.image, priority: FastImage.priority.high}} style={styles.image}/>
              <Text style={styles.title}>{entities.decode(item.title)}</Text>
              <Text style={styles.date}>
                {new Date(item.date_published).toLocaleString([], {year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'})}
              </Text>
          </View>
        </TouchableHighlight>
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
      <View style={{flex: 1, height: '100%', backgroundColor: 'white', paddingTop: 22}}>
        <Image source={require('./assets/ARTBA-Logo-2016.png')}/>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const HomeStack = StackNavigator({
  Home: { screen: App },
  Details: {screen: Details },
});

export default TabNavigator({
  Home: { screen: HomeStack },
  Events: { screen: Events}
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
