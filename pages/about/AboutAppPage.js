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
    TouchableHighlight,
    Linking
} from 'react-native';
import GlobalStyle from "../../res/styles/GlobalStyle"

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtil from "../Utils/ViewUtil";
import {MORE_MENU} from "../other/MoreMenu"
import AboutComponent from "./AboutComponent";
import {ABOUT_FLAG} from "./AboutComponent";
import config from "../../res/data/config.json";


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class AboutAppPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.aboutCommon = new AboutComponent(props, (dic) => this.updateState(dic), ABOUT_FLAG.about_app,config);
        this.state = {
            projectModels: [],
        }

        this.onBackPress = this.onBackPress.bind(this);
    }

    updateState(dic) {
        this.setState(dic);
    }


    onBackPress() {
        this.props.navigation.goBack();
    }
    componentDidMount() {
        this.aboutCommon.componentDidMount();
    }

    render() {
        let contentView = <View>
            {this.aboutCommon.renderRepository(this.state.projectModels)}
            {ViewUtil.getItemView(() => this.onItemClick(MORE_MENU.Main_Page), require("../../imgs/ic_star.png"), MORE_MENU.Main_Page, "#2196F3")}
            <View style={GlobalStyle.line}/>
            {ViewUtil.getItemView(() => this.onItemClick(MORE_MENU.About_Author), require("../../imgs/ic_star.png"), MORE_MENU.About_Author, "#2196F3")}
            <View style={GlobalStyle.line}/>
            {ViewUtil.getItemView(() => this.onItemClick(MORE_MENU.FeedBack), require("../../imgs/ic_star.png"), MORE_MENU.FeedBack, "#2196F3")}
        </View>
        return this.aboutCommon.renderView(contentView, {
            "title": "GitHub Hot",
            "info": "这是一个关于XXXXXXXX的项目",
            "bg_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527575081565&di=427ceb602b52565392ba0943b997f290&imgtype=0&src=http%3A%2F%2Fi3.sinaimg.cn%2Ftravel%2Ful%2F2009%2F0318%2FU3059P704DT20090318152814.jpg",
            "author_img": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=31220976,2327152167&fm=27&gp=0.jpg"
        })
    }


    onItemClick(flag) {
        switch (flag) {
            case MORE_MENU.Main_Page:
                this.props.navigation.navigate("AuthorMainPage",{url:"https://blog.csdn.net/lantiankongmo/"});
                break;
            case MORE_MENU.FeedBack:
                let url = "mailto://lantiankongmo1026@gmail.com";
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                        ToastAndroid.show("无法打开邮箱",1000);
                    } else {
                        return Linking.openURL(url);
                    }
                }).catch(err => console.error('An error occurred', err));
                break;
            case MORE_MENU.About_Author:
                ToastAndroid.show("关于作者",1000);
                this.props.navigation.navigate("AboutAuthorPage");
                break
        }

    }

}

