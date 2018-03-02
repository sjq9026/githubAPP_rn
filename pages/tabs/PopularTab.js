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
    Dimensions,
    ToastAndroid
} from 'react-native';
import  ScrollableTabView,{ScrollableTabBar,DefaultTabBar} from  "react-native-scrollable-tab-view";
import NetUtil from "../Utils/NetUtil";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

var ScreenWidth = Dimensions.get('window').width;
var tabValue = ["热门","科技","军事","体育","社会","娱乐","彩票","北京","问答","更多"];
export default class PopularTab extends Component<Props> {
    constructor(props){
        super(props);
        this.state=({
            data:[]
        })
        this.renderTabItems = this.renderTabItems.bind(this);

    }


  render() {
    return (
      <View style={styles.container}>
          <ScrollableTabView style={{flex:1} }
              renderTabBar={() => <ScrollableTabBar/>}
                             initialPage={1}
                             locked={false}
                             onChangeTab={(obj)=>{
                                 this.loadData(obj.i);
                             }}
                             scrollWithoutAnimation={true}
                             tabBarUnderlineStyle={styles.lineStyle}
                             tabBarBackgroundColor={"#377DFE"}
                             tabBarActiveTextColor={"#E61A5F"}
                             tabBarInactiveTextColor={"white"}>
              {this.renderTabItems()}
              <Text>{this.data}</Text>
          </ScrollableTabView>
      </View>
    );
  }
    renderTabItems(){
      let length = tabValue.length;
      let views = [];
      for(var i=0;i<length;i++){
          views.push(<Text key={i} tabLabel={tabValue[i]}/>)
      }
            return views;
    }

  loadData(index){
        let that = this;
        var netUrl = URL+"Android"+QUERY_STR;
      ToastAndroid.show(netUrl,1000)
            NetUtil.get(netUrl)
                .then(result=>{
                        that.setState({
                            data:result.items
                        })
                })
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
    lineStyle: {
        height: 2,
        backgroundColor: '#FF0000',
    },
});
