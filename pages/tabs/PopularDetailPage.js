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
    WebView,
    ToastAndroid,
    Dimensions,
    TouchableHighlight,
    Image
} from 'react-native';
import CustomNavBar from "../other/CustomNavBar";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const width = Dimensions.get("window").width;
export default class PopularDetailPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.navigation.state.params.data.item.html_url,
            title: "",
            canGoBack: false,
            isFavorite: this.props.navigation.state.params.data.isFavorite
        }
        this.leftBtnClick = this.leftBtnClick.bind(this);
        console.log(this.props.navigation.state.params.data)
        console.log(this.props.navigation.state.params.data.isFavorite)
        console.log(this.props.navigation.state.params.flag)
    }


    render() {

        let titleStr = this.props.navigation.state.params.flag === "Popular"
            ? this.props.navigation.state.params.data.item.full_name + ""
            : this.props.navigation.state.params.data.item.fullName;

        let img = this.state.isFavorite ? require("../../imgs/ic_star.png") : require("../../imgs/ic_unstar_transparent.png");

        console.log(titleStr)
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <TouchableHighlight onPress={this.leftBtnClick}>
                        <Image source={require("../../imgs/ic_arrow_back_white_36pt.png")}
                               style={{height: 25, width: 25, marginLeft: 20}}>
                        </Image>
                    </TouchableHighlight>

                    <Text>{titleStr}</Text>

                    <View style={styles.right}>
                        <TouchableHighlight onPress={this.shareClick}>
                            <Image source={require("../../imgs/ic_arrow_back_white_36pt.png")}
                                   style={{height: 20, width: 20}}>
                            </Image>
                        </TouchableHighlight>
                        <TouchableHighlight style={{width: 20, height: 20, marginRight: 15, marginLeft: 15}}
                                            onPress={this.favoriteClick}>
                            <Image source={img}
                                   style={{height: 20, width: 20}}>
                            </Image>
                        </TouchableHighlight>
                    </View>


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

    rightBtnClick() {
        ToastAndroid.show("分享", 1000);
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
        width: width,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#377DFE',
    },
    right: {
        height: 40,
        flexDirection: "row",
        alignItems: 'center',

    }
});
