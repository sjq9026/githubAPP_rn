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
  View,
    Button
} from 'react-native';
import {FLAG} from "../Utils/DataUtil";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class MineTab extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.welcome} title="点击设置标签" onPress={()=> this.props.navigation.navigate('CustomKeyPage',{isRemove:false,languageFlag:FLAG.hot_language})}>
        </Button>
        <Button style={styles.welcome} title="拖拽排序" onPress={()=> this.props.navigation.navigate('SortKeyPage',{languageFlag:FLAG.hot_language})}>
        </Button>

        <Button style={styles.welcome} title="删除标签" onPress={()=> this.props.navigation.navigate('CustomKeyPage',{isRemove:true,languageFlag:FLAG.hot_language})}>
        </Button>



          <Button style={styles.welcome} title="点击设置所有语言" onPress={()=> this.props.navigation.navigate('CustomKeyPage',{isRemove:false,languageFlag:FLAG.all_language})}>
          </Button>
          <Button style={styles.welcome} title="拖拽排序所有语言" onPress={()=> this.props.navigation.navigate('SortKeyPage',{languageFlag:FLAG.all_language})}>
          </Button>

          <Button style={styles.welcome} title="删除语言" onPress={()=> this.props.navigation.navigate('CustomKeyPage',{isRemove:true,languageFlag:FLAG.all_language})}>
          </Button>




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
