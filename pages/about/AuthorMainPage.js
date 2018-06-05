/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {FLAG, FAVORITE_FLAG} from "../Utils/DataUtil";
import {NET_FLAG} from "../Utils/NetUtil";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    WebView,
    ToastAndroid,
    Dimensions,
    TouchableHighlight,
    Image
} from 'react-native';
import CustomNavBar from "../other/CustomNavBar";
import DataUtil from "../Utils/DataUtil";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const width = Dimensions.get("window").width;
export default class AuthorMainPage extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            url: this.props.navigation.state.params.url,
            title: "lantiankongmo的技术博客",
            canGoBack: false,
        };
        this.leftBtnClick = this.leftBtnClick.bind(this);
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <TouchableHighlight onPress={this.leftBtnClick}>
                        <Image source={require("../../imgs/ic_arrow_back_white_36pt.png")}
                               style={{height: 25, width: 25,   borderColor: "red",marginLeft:10,
                                   borderWidth: 1,}}>
                        </Image>
                    </TouchableHighlight>

                    <View style={{justifyContent: 'center',
                        alignItems: 'center',borderColor: "red", borderWidth: 1,}}>
                        <Text style={{color: "white", textAlign: "center"}}>{this.state.title}</Text>
                    </View>
                    <TouchableHighlight  style={{height: 25, width: 25, borderColor: "red",marginRight:10,
                        borderWidth: 1,}}>
                        <Text></Text>
                    </TouchableHighlight>

                </View>


                <WebView source={{uri: this.state.url}}
                         ref="webview"
                         onNavigationStateChange={(e) => {
                             this.onWebViewStateChange(e)
                         }}
                />

            </View>
        );
    }

    leftBtnClick() {
        if (this.state.canGoBack) {
            this.refs.webview.goBack();
        } else {
            this.props.navigation.goBack();
        }
    }


    onWebViewStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack,
        })
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        height: 40,
        width: 100 + "%",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#377DFE',
        borderColor: "red",
        borderWidth: 1,
    },
    right: {
        height: 40,
        flexDirection: "row",
        alignItems: 'center',
    },

});
