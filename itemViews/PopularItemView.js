/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class PopularItemView extends Component<Props> {

  constructor(props){
    super(props);

  }


  render() {
    return (
      <View style={styles.container}>
            <Text>{this.props.data.full_name}</Text>
            <Text>{this.props.data.description}</Text>
            <Text>{this.props.data.assignees_url}</Text>
            <Text>{this.props.data.stargazers_count}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
