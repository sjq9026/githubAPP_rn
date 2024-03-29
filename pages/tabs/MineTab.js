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
import GlobalStyle from "../../res/styles/GlobalStyle"
import {MORE_MENU} from "../other/MoreMenu"
import {FLAG} from "../Utils/DataUtil";
import ViewUtil from "../Utils/ViewUtil";

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

                <View style={{
                    flexDirection: "row",
                    height: 45,
                    width: width,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#377DFE"
                }}>
                    <Text style={{color: "white"}}>My</Text>
                </View>

                <ScrollView>

                    <TouchableHighlight onPress={() => {
                        this.onClick(MORE_MENU.About)
                    }}>
                        <View style={styles.github}>
                            <View style={{flexDirection: "row",alignItems:"center"}}>
                                <Image source={require("../../imgs/ic_trending.png")}
                                       style={{width: 40, height: 40,tintColor:"#2196F3"}}/>
                                <Text style={{marginLeft:5}}>GitHub Popular</Text>
                            </View>

                            <Image source={require("../../imgs/ic_tiaozhuan.png")}
                                   style={{width: 20, height: 20,marginRight:20,tintColor:"#2196F3"}}/>
                        </View>
                    </TouchableHighlight>

                    <View style={GlobalStyle.line}/>

                    <Text style={{height: 25, width: width, lineHeight: 25, backgroundColor: "gray", opacity: 0.5,}}>自定义语言</Text>
                    <View style={GlobalStyle.line}/>

                    {this.getItem(MORE_MENU.Custom_Language,require("../../imgs/ic_custom_language.png"),MORE_MENU.Custom_Language,"#2196F3")}

                    <View style={GlobalStyle.line}/>

                    <View style={GlobalStyle.line}/>

                    {this.getItem(MORE_MENU.Sort_Language,require("../../imgs/ic_swap_vert.png"),MORE_MENU.Sort_Language,"#2196F3")}

                    <View style={GlobalStyle.line}/>

                    {this.getItem(MORE_MENU.Remove_Language,require("../../imgs/ic_remove.png"),MORE_MENU.Remove_Language,"#2196F3")}

                    <View style={GlobalStyle.line}/>
                    <Text style={{height: 25, width: width, lineHeight: 25, backgroundColor: "gray", opacity: 0.5,}}>自定义标签</Text>
                    <View style={GlobalStyle.line}/>


                    {this.getItem(MORE_MENU.Custom_key,require("../../imgs/ic_custom_language.png"),MORE_MENU.Custom_key,"#2196F3")}

                    <View style={GlobalStyle.line}/>
                    <View style={GlobalStyle.line}/>

                    {this.getItem(MORE_MENU.Sort_Key,require("../../imgs/ic_swap_vert.png"),MORE_MENU.Sort_Key,"#2196F3")}

                    <View style={GlobalStyle.line}/>


                    {this.getItem(MORE_MENU.Remove_Key,require("../../imgs/ic_remove.png"),MORE_MENU.Remove_Key,"#2196F3")}

                    <View style={GlobalStyle.line}/>
                    <Text style={{height: 25, width: width, lineHeight: 25, backgroundColor: "gray", opacity: 0.5,}}>设置</Text>
                    <View style={GlobalStyle.line}/>

                    {this.getItem(MORE_MENU.Custom_Theme,require("../../imgs/ic_view_quilt.png"),MORE_MENU.Custom_Theme,"#2196F3")}



                    <View style={GlobalStyle.line}/>

                    {this.getItem(MORE_MENU.About_Author,require("../../imgs/ic_insert_emoticon.png"),MORE_MENU.About_Author,"#2196F3")}
                </ScrollView>


            </View>
        );
    }


    getItem(flag, icon, content, hintColor) {
        return ViewUtil.getItemView(()=>this.onClick(flag), icon, content,hintColor,false)
    }

    onClick(flag) {
        if (flag === MORE_MENU.Custom_Language) {
            this.props.navigation.navigate('CustomKeyPage', {
                isRemove: false,
                languageFlag: FLAG.all_language
            })
        }

        if (flag === MORE_MENU.About) {
            this.props.navigation.navigate('AboutAppPage')
        }

        if (flag === MORE_MENU.Sort_Language) {
            this.props.navigation.navigate('SortKeyPage', {languageFlag: FLAG.all_language})
        }

        if (flag === MORE_MENU.Remove_Language) {
            this.props.navigation.navigate('CustomKeyPage', {
                isRemove: true,
                languageFlag: FLAG.all_language
            })
        }

        if (flag === MORE_MENU.Custom_key) {
            this.props.navigation.navigate('CustomKeyPage', {
                isRemove: false,
                languageFlag: FLAG.hot_language
            })
        }


        if (flag === MORE_MENU.Sort_Key) {
            this.props.navigation.navigate('SortKeyPage', {languageFlag: FLAG.hot_language})
        }


        if (flag === MORE_MENU.Remove_Key) {
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
        height: 80,
        width: width,
        marginLeft:10,
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
