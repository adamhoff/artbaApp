import React from 'react';
import { ScrollView, Text, View, Image, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import FastImage from 'react-native-fast-image';

import styles from '../styles/PostStyles';

export default class Details extends React.Component {
  static navigationOptions = {
    header: null
  };
  render(){
    const Entities = require('html-entities').AllHtmlEntities;
    const entities = new Entities();
    const { params } = this.props.navigation.state
    return(
      <View style={{flex: 1, backgroundColor: 'white', paddingTop: 22}}>
      <ScrollView>
        <FastImage source={{uri: params.image}} style={{width: Dimensions.get('window').width, height: 220}} />
        <Text style={styles.titleDetail}>
          {entities.decode(params.title)}
        </Text>
          <Text style={styles.dateDetail}>
            {new Date(params.date_published).toLocaleString([], {year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'})}
          </Text>
        <View style={styles.content}>
          <HTML ignoredTags={[ ...IGNORED_TAGS, 'img']} html={entities.decode(params.content_html)}/>
        </View>
      </ScrollView>
      </View>
    )
  }
}
