/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    TouchableHighlight,
    Dimensions,
    Image
} from 'react-native';
import  GlobalStyle from "../../res/styles/GlobalStyle"
import {MORE_MENU} from "../other/MoreMenu"
import {FLAG} from "../Utils/DataUtil";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const width = Dimensions.get("window").width;
export default class MineTab extends Component<Props> {


    /* <Button style={styles.welcome} title="点击设置标签"
                        onPress={() => this.props.navigation.navigate('CustomKeyPage', {
                            isRemove: false,
                            languageFlag: FLAG.hot_language
                        })}>
                </Button>
                <Button style={styles.welcome} title="拖拽排序"
                        onPress={() => this.props.navigation.navigate('SortKeyPage', {languageFlag: FLAG.hot_language})}>
                </Button>

                <Button style={styles.welcome} title="删除标签"
                        onPress={() => this.props.navigation.navigate('CustomKeyPage', {
                            isRemove: true,
                            languageFlag: FLAG.hot_language
                        })}>
                </Button>


                <Button style={styles.welcome} title="点击设置所有语言"
                        onPress={() => this.props.navigation.navigate('CustomKeyPage', {
                            isRemove: false,
                            languageFlag: FLAG.all_language
                        })}>
                </Button>
                <Button style={styles.welcome} title="拖拽排序所有语言"
                        onPress={() => this.props.navigation.navigate('SortKeyPage', {languageFlag: FLAG.all_language})}>
                </Button>

                <Button style={styles.welcome} title="删除语言"
                        onPress={() => this.props.navigation.navigate('CustomKeyPage', {
                            isRemove: true,
                            languageFlag: FLAG.all_language
                        })}>
                </Button>*/
    render() {
        return (
            <View style={styles.container}>

                <View style={{flexDirection:"row",height:45,width:width,justifyContent:"center",alignItems:"center",backgroundColor:"#377DFE"}}>
                    <Text style={{color:"white"}}>My</Text>
                </View>

                <ScrollView>
                    <TouchableHighlight onPress={()=>{this.onClick(MORE_MENU.About)}}>
                        <View style={styles.github}>
                            <View style={{flexDirection: "row"}}>
                                <Image source={require("../../imgs/ic_star.png")}
                                       style={{width: 20, height: 20}}/>
                                <Text>GitHub Popular</Text>
                            </View>

                            <Image source={require("../../imgs/ic_star.png")}
                                   style={{width: 20, height: 20}}/>
                        </View>
                    </TouchableHighlight>
                    <View style={GlobalStyle.line}/>
                </ScrollView>


            </View>
        );
    }

    onClick(flag){

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },


    github: {
        height: 60,
        width: width,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});
