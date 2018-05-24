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

                                <Text style={{height:25,width:width,lineHeight:25,backgroundColor:"gray",opacity:0.5,}}>Custom trending Language</Text>
                    <View style={GlobalStyle.line}/>
                    <TouchableHighlight onPress={()=>{this.onClick(MORE_MENU.Custom_Language)}}>
                        <View style={styles.selitem}>
                            <View style={{flexDirection: "row"}}>
                                <Image source={require("../../imgs/ic_star.png")}
                                       style={{width: 20, height: 20}}/>
                                <Text>{MORE_MENU.Custom_Language}</Text>
                            </View>

                            <Image source={require("../../imgs/ic_star.png")}
                                   style={{width: 20, height: 20}}/>
                        </View>
                    </TouchableHighlight>

                    <View style={GlobalStyle.line}/>

                    <View style={GlobalStyle.line}/>
                    <TouchableHighlight onPress={()=>{this.onClick(MORE_MENU.Sort_Language)}}>
                        <View style={styles.selitem}>
                            <View style={{flexDirection: "row"}}>
                                <Image source={require("../../imgs/ic_star.png")}
                                       style={{width: 20, height: 20}}/>
                                <Text>{MORE_MENU.Sort_Language}</Text>
                            </View>

                            <Image source={require("../../imgs/ic_star.png")}
                                   style={{width: 20, height: 20}}/>
                        </View>
                    </TouchableHighlight>
                    <View style={GlobalStyle.line}/>
                    <TouchableHighlight onPress={()=>{this.onClick(MORE_MENU.Remove_Language)}}>
                        <View style={styles.selitem}>
                            <View style={{flexDirection: "row"}}>
                                <Image source={require("../../imgs/ic_star.png")}
                                       style={{width: 20, height: 20}}/>
                                <Text>{MORE_MENU.Remove_Language}</Text>
                            </View>

                            <Image source={require("../../imgs/ic_star.png")}
                                   style={{width: 20, height: 20}}/>
                        </View>
                    </TouchableHighlight>
                    <View style={GlobalStyle.line}/>
                    <Text style={{height:25,width:width,lineHeight:25,backgroundColor:"gray",opacity:0.5,}}>Custom Popular Key</Text>
                    <View style={GlobalStyle.line}/>
                    <TouchableHighlight onPress={()=>{this.onClick(MORE_MENU.Custom_key)}}>
                        <View style={styles.selitem}>
                            <View style={{flexDirection: "row"}}>
                                <Image source={require("../../imgs/ic_star.png")}
                                       style={{width: 20, height: 20}}/>
                                <Text>{MORE_MENU.Custom_key}</Text>
                            </View>

                            <Image source={require("../../imgs/ic_star.png")}
                                   style={{width: 20, height: 20}}/>
                        </View>
                    </TouchableHighlight>
                    <View style={GlobalStyle.line}/>
                    <View style={GlobalStyle.line}/>
                    <TouchableHighlight onPress={()=>{this.onClick(MORE_MENU.Sort_Key)}}>
                        <View style={styles.selitem}>
                            <View style={{flexDirection: "row"}}>
                                <Image source={require("../../imgs/ic_star.png")}
                                       style={{width: 20, height: 20}}/>
                                <Text>{MORE_MENU.Sort_Key}</Text>
                            </View>

                            <Image source={require("../../imgs/ic_star.png")}
                                   style={{width: 20, height: 20}}/>
                        </View>
                    </TouchableHighlight>
                    <View style={GlobalStyle.line}/>
                    <View style={GlobalStyle.line}/>

                    <TouchableHighlight onPress={()=>{this.onClick(MORE_MENU.Remove_Key)}}>
                        <View style={styles.selitem}>
                            <View style={{flexDirection: "row"}}>
                                <Image source={require("../../imgs/ic_star.png")}
                                       style={{width: 20, height: 20}}/>
                                <Text>{MORE_MENU.Remove_Key}</Text>
                            </View>

                            <Image source={require("../../imgs/ic_star.png")}
                                   style={{width: 20, height: 20}}/>
                        </View>
                    </TouchableHighlight>
                    <View style={GlobalStyle.line}/>
                    <Text style={{height:25,width:width,lineHeight:25,backgroundColor:"gray",opacity:0.5,}}>Setting</Text>
                    <View style={GlobalStyle.line}/>
                    <TouchableHighlight onPress={()=>{this.onClick(MORE_MENU.Custom_Theme)}}>
                        <View style={styles.selitem}>
                            <View style={{flexDirection: "row"}}>
                                <Image source={require("../../imgs/ic_star.png")}
                                       style={{width: 20, height: 20}}/>
                                <Text>{MORE_MENU.Custom_Theme}</Text>
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
        if(flag === MORE_MENU.Custom_Language){
            this.props.navigation.navigate('CustomKeyPage', {
                isRemove: false,
                languageFlag: FLAG.all_language
            })
        }

        if(flag === MORE_MENU.Sort_Language){
            this.props.navigation.navigate('SortKeyPage', {languageFlag: FLAG.all_language})
        }

        if(flag === MORE_MENU.Remove_Language){
            this.props.navigation.navigate('CustomKeyPage', {
                isRemove: true,
                languageFlag: FLAG.all_language
            })
        }

        if(flag === MORE_MENU.Custom_key){
            this.props.navigation.navigate('CustomKeyPage', {
                isRemove: false,
                languageFlag: FLAG.hot_language
            })
        }


        if(flag === MORE_MENU.Sort_Key){
            this.props.navigation.navigate('SortKeyPage', {languageFlag: FLAG.hot_language})
        }


        if(flag === MORE_MENU.Remove_Key){
            this.props.navigation.navigate('CustomKeyPage', {
                isRemove: true,
                languageFlag: FLAG.hot_language
            })
        }



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
    },


    selitem: {
        height: 40,
        width: width,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});
