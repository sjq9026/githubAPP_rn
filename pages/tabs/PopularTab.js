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
import  ScrollableTabView, {ScrollableTabBar} from  "react-native-scrollable-tab-view";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class PopularTab extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
          <ScrollableTabView
              renderTabBar={() => <DefaultTabBar/>}>
              <Text tabLabel='Tab1'/>
              <Text tabLabel='Tab2'/>
              <Text tabLabel='Tab3'/>
              <Text tabLabel='Tab4'/>
              <Text tabLabel='Tab5'/>
              <Text tabLabel='Tab6'/>
          </ScrollableTabView>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit 33333App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
