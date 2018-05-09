import React from 'react';
import { FlatList, ScrollView, Dimensions, ActivityIndicator, Text, View, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';
import FastImage from 'react-native-fast-image'

import styles from '../styles/PostStyles';

export default class Newsline extends React.Component {

  static navigationOptions = {
    title: "Newsline",
  };

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://newsline.artba.org/wp-json/feed/v1/posts')
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
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
        <FlatList
          style={{paddingTop: 22}}
          data={this.state.dataSource}
          renderItem={({item}) =>
          <View style={styles.container}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("NewslineDetails", item: item)}
              activeOpacity={1}
              underlayColor={'#eeeeee'}>
              <View style={{paddingTop: 5}}>
                <FastImage
                  source={{
                    uri: item.image,
                    priority: FastImage.priority.high
                  }}
                  style={styles.image}
                />
                <Text style={styles.title}>
                  {item.title}
                </Text>
                <Text style={styles.category}>
                  Newsline
                </Text>
                <Text style={styles.date}>
                  { new Date(item.date_published).toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                </Text>
                <View style={styles.hr}/>
              </View>
            </TouchableHighlight>
            <Text>{"\n"}</Text>
          </View>
          }
          keyExtractor={(item, index) => item.id}
        />
    );
  }
}
