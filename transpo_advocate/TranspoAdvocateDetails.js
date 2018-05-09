import React from 'react';
import { ScrollView, Text, View, Image, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';

import TranspoAdvocate from './TranspoAdvocate';
import styles from '../styles/PostStyles';

export default class NewslineDetails extends React.Component {
  render(){
    const { params } = this.props.navigation.state
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Image source={{uri: params.image}} style={{width: Dimensions.get('window').width, height: 180}} />
        <Text style={styles.titleDetail}>
          {params.title}
        </Text>
        <View style={styles.hr}/>
        <View style={styles.content}>
          <HTML ignoredTags={[ ...IGNORED_TAGS, 'img']} html={params.content_html}/>
        </View>
      </View>
    );
  }
}
