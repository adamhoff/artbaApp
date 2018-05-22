import React from 'react';
import { FlatList, Dimensions, ScrollView, StyleSheet, Text, View, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import HTML from 'react-native-render-html';

import styles from '../styles/EventStyles';

export default class Events extends React.Component {

  constructor(){
    super();
    this.state = {
      isLoading: true,
      dataSource: []
    }
  }

  componentDidMount(){
    return fetch('https://www.artba.org/wp-json/eventon/events')
      .then((response) => response.json())
      .then((responseJson) => {
        let result = Object.keys(responseJson.events).map(function(key) {
          return [Number(key), responseJson.events[key]];
        });
        result = result.sort((a, b) => {
          return new Date(a[1].start * 1000) - new Date(b[1].start * 1000)
        })
        this.setState({
          isLoading: false,
          dataSource: result,
        }, function(){
          console.log(this.state.dataSource)
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  renderItem = ({ item }) => {
    const Entities = require('html-entities').AllHtmlEntities;
    const entities = new Entities();
    if(item[1].name != "Work Zone Management Conference"){
      return(
        item[1].start == item[1].end
        ?
        <ScrollView style={styles.container, styles.background} key={item.name}>
          <View style={styles.eventContainer}>
            <View style={{margin: 15, marginBottom: 5}}>
              <Text style={styles.title}>
                {entities.decode(item[1].name)}
              </Text>
              <Text style={styles.date}>
                {new Date(item[1].start * 1000).toLocaleString([], {month: 'short', day: '2-digit'})}
              </Text>
              <View >
                <HTML html={entities.decode(item[1].event_subtitle)}/>
              </View>
            </View>
          </View>
        </ScrollView>
        :
        <ScrollView style={styles.container, styles.background} key={item.name}>
          <View style={styles.eventContainer}>
            <View style={{margin: 15, marginBottom: 5}}>
              <Text style={styles.title}>
                {entities.decode(item[1].name)}
              </Text>
              <Text style={styles.date}>
                {new Date(item[1].start * 1000).toLocaleString([], {month: 'short', day: '2-digit'})} - {new Date(item[1].end * 1000).toLocaleString([], {month: 'short', day: '2-digit'})}
              </Text>
              <View style={styles.subtitle}>
                <HTML html={entities.decode(item[1].event_subtitle)}/>
              </View>
            </View>
          </View>
        </ScrollView>
    );
  }
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
        <Image source={require('../assets/ARTBA-Logo-2016.png')}/>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}
