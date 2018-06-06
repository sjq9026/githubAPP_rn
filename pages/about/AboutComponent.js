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
import {FAVORITE_FLAG} from "../Utils/DataUtil";
import {NET_FLAG} from "../Utils/NetUtil";
import config from "../../res/data/config.json";
import RepositoryCell from "./RepositoryCell"

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {MORE_MENU} from "../other/MoreMenu"
import DataUtil from "../Utils/DataUtil";
import ArrayUtil from "../Utils/ArrayUtil";
import RepositoryUtil from "../Utils/RepositoryUtil"

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export const ABOUT_FLAG = {about_app: "about_app", about_author: "about_author"};


export default class AboutComponent {
    constructor(props, updateState, flag, config) {
        this.props = props;
        this.updateState = updateState;
        this.flag = flag;

        this.config = config;
        this.dataUtil = new DataUtil(FAVORITE_FLAG.About_Author, NET_FLAG.About_Author);
        this.repositories = [];
        this.repositoryUtils = new RepositoryUtil(this);
        this.favoriteKeys = null;
    }

    componentDidMount() {
        if (this.flag === ABOUT_FLAG.about_app) {
            this.repositoryUtils.fetchRepository(this.config.info.currentRepoUrl);
        } else {
            var urls = [];
            var items = this.config.items;
            for (let i = 0, l = items.length; i < l; i++) {
                urls.push(this.config.info.url + items[i]);
            }
            this.repositoryUtils.fetchRepositories(urls);
        }
    }

    onNotifyDataChanged(arr) {

        this.updateFavorite(arr);
    }


    /**
     * 更新项目的用户收藏状态
     * @param repositories
     */
    async updateFavorite(repositories) {
        if (repositories) this.repositories = repositories;
        if (!this.repositories) return;
        if (!this.favoriteKeys) {
            this.favoriteKeys = await this.dataUtil.getAllFavoriteItems(FAVORITE_FLAG.About_Author);
        }
        let projectModels = [];
        for (let i = 0, l = this.repositories.length; i < l; i++) {
            var data = this.repositories[i];
            var item = data.item ? data.item : data;
            projectModels.push({
                isFavorite: ArrayUtil.isCon(this.favoriteKeys ? this.favoriteKeys : [], item),
                item: item,
            })
        }
        this.updateState({
            projectModels: projectModels,
        })
    }


    /**
     * 创建项目视图
     * @param projectModels
     * @return {*}
     */
    renderRepository(projectModels) {
        if (!projectModels || projectModels.length === 0) return null;
        let views = [];
        for (let i = 0, l = projectModels.length; i < l; i++) {

            let projectModel = projectModels[i];
            let item = projectModel.item.items ? projectModel.item.items:projectModel.item;
            views.push(
                <RepositoryCell
                    key={item.id}
                    theme={this.props.theme}
                    projectModel={projectModel}
                    onFavorite={()=>this.onFavorite(item)}
                    onSelect={() => this.onItemClick(projectModel)}
                />
            );
        }
        return views;
    }

    onFavorite(item) {
        this.dataUtil.upDateFavorite(FAVORITE_FLAG.About_Author, item);
    }

    onItemClick(projectModel){
        let item = projectModel.item.items ? projectModel.item.items:projectModel.item;
        this.props.navigation.navigate("PopularDetailPage", {data: item,flag:"About"})
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