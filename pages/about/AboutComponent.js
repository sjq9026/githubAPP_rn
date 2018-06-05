import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    ListView,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    Platform,
    ToastAndroid,
    TouchableHighlight
} from 'react-native';
import GlobalStyle from "../../res/styles/GlobalStyle"

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtil from "../Utils/ViewUtil";
import {MORE_MENU} from "../other/MoreMenu"

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export  const ABOUT_FLAG = {about_app:"about_app",about_author:"about_author"};


export default class AboutAppPage {
    constructor(props, updateState, flag) {
        this.props = props;
        this.updateState = updateState;
        this.flag = flag;
    }

    renderParallaxScrollView(params) {
        let config = {};
        config.renderBackground = () => (
            <View key="background">
                <Image source={{
                    uri: params.bg_url,
                    width: window.width,
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    width: window.width,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    height: PARALLAX_HEADER_HEIGHT
                }}/>
            </View>
        );

        config.renderForeground = () => (
            <View key="parallax-header" style={styles.parallaxHeader}>
                <Image style={styles.avatar} source={{
                    uri: params.author_img,
                    width: AVATAR_SIZE,
                    height: AVATAR_SIZE
                }}/>
                <Text style={styles.sectionSpeakerText}>
                    {params.title}
                </Text>
                <Text style={styles.sectionTitleText}>
                    {params.info}
                </Text>
            </View>
        );

        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.title}</Text>
            </View>
        );

        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                <TouchableHighlight style={{height: 25, width: 25}} onPress={this.onBackPress}>
                    <Image source={require("../../imgs/ic_arrow_back_white_36pt.png")}
                           style={{height: 25, width: 25}}>
                    </Image>
                </TouchableHighlight>
                <TouchableHighlight style={{height: 25, width: 25}} onPress={this.onBackPress}>
                    <Image source={require("../../imgs/ic_arrow_back_white_36pt.png")}
                           style={{height: 25, width: 25}}>
                    </Image>
                </TouchableHighlight>
            </View>
        );
        return config;
    }




    renderView(contentView, params) {
        this.RenderConfig = this.renderParallaxScrollView(params);
        return (
            <ParallaxScrollView
                headerBackgroundColor="#333"
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                backgroundSpeed={10}
                {...this.RenderConfig}>
                {contentView}
            </ParallaxScrollView>
        );
    }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 50;
const ROW_HEIGHT = 50;
const PARALLAX_HEADER_HEIGHT = 250;
const STICKY_HEADER_HEIGHT = 50;
const SCREEN_WIDTH = window.width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        flexDirection: 'row',
        alignItems: "center",
        height: STICKY_HEADER_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor: "#377DFE",
        justifyContent: 'space-around'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        width: SCREEN_WIDTH,
        position: 'absolute',
        height: 50,
        borderWidth: 1,
        borderColor: "red",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"

    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    },
    left: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    }
});