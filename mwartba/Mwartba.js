import React from 'react';
import { FlatList, ScrollView, ActivityIndicator, Text, View, Image, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';
import FastImage from 'react-native-fast-image';

import styles from '../styles/PostStyles';

import MwartbaDetails from './MwartbaDetails';

export default class Mwartba extends React.Component {

  static navigationOptions = {
    title: "MWARTBA",
  };

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://mwrtba.org/wp-json/feed/v1/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.items,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{paddingTop: 22, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <View style={{flex: 1, height: '100%'}}>
        <Image source={require('../assets/ARTBA-Logo-2016.png')}/>
        <FlatList style={{paddingTop: 22}} data={this.state.dataSource} extraData={this.state} renderItem={({item}) =>
          <View style={styles.container}>
            <TouchableHighlight onPress={() => this.props.navigation.navigate("MwartbaDetails", item: item)}
              activeOpacity={1}
              underlayColor={'#eeeeee'}>
              <View style={{paddingTop: 5, flex: 1}}>
                <FastImage source={{uri: item.image, priority: FastImage.priority.high}} style={styles.image}/>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.category}>MWARTBA</Text>
                <Text style={styles.date}>
                   {new Date(item.date_published).toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}
                </Text>
                <View style={styles.hr}/>
              </View>
            </TouchableHighlight>
            <Text>{"\n"}</Text>
          </View>
          }
          keyExtractor={(item, index) => item.id}
        />
      </View>
    );
  }
}
