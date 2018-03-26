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
    Button,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import  Popover from  "../other/Popover";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
var spinnerTextArray = ['深圳南山', '深圳宝安', '深圳罗湖', '深圳福田']
export default class TrendingTab extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            //下拉列表是否可见
            isVisible: false,
            //下拉列表大小范围
            spinnerRect: {},
        }
    }
  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity
              ref='spinner'
              style={{flexDirection:'row',alignItems:'center',marginTop:10}}
              underlayColor='transparent'
              onPress={()=>this.showSpinner()}>
              <Text>
                  点击可以弹出下拉菜单
              </Text>

          </TouchableOpacity>

          <Popover
              //设置可见性
              isVisible={this.state.isVisible}
              //设置下拉位置
              fromRect={this.state.spinnerRect}
              placement="bottom"
              //点击下拉框外范围关闭下拉框
              onClose={()=>this.closeSpinner()}
              //设置内容样式
              contentStyle={{opacity:0.82,backgroundColor:'#343434'}}
              style={{backgroundColor: 'red'}}>
              <View style={{alignItems: 'center'}}>
                  {spinnerTextArray.map((result, i, arr) => {
                      return <TouchableHighlight key={i} onPress={()=>this.onItemClick(arr[i])}
                                                 underlayColor='transparent'>
                          <Text
                              style={{fontSize: 18,color:'white', padding: 8, fontWeight: '400'}}>
                              {arr[i]}
                          </Text>
                      </TouchableHighlight>
                  })
                  }
              </View>
          </Popover>


      </View>
    );



  }

    //显示下拉列表
    showSpinner() {
        this.refs.spinner.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                spinnerRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    //隐藏下拉列表
    closeSpinner() {
        this.setState({
            isVisible: false
        });
    }

    //下拉列表每一行点击事件
    onItemClick(spinnerItem) {
        this.closeSpinner();
        this.toast.show(spinnerItem, DURATION.LENGTH_SHORT);
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
