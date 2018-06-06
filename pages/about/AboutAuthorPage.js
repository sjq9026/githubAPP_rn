import React, {Component} from 'react';


import {
    Dimensions,
    Image,
    ListView,
    Platform,
    PixelRatio,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    Linking,
    TouchableOpacity,
    Clipboard
} from 'react-native';
import ViewUtil from "../Utils/ViewUtil";
import {MORE_MENU} from "../other/MoreMenu"
import AboutComponent from "./AboutComponent";
import {ABOUT_FLAG} from "./AboutComponent";
import config from "../../res/data/config.json";
import GlobalStyle from "../../res/styles/GlobalStyle"


const FLAG = {
    REPOSITORY: '开源项目',
    BLOG: {
        name: '技术博客',
        items: {
            CSDN: {
                title: 'CSDN',
                url: 'http://blog.csdn.net/fengyuzhengfan',
            },
            GITHUB: {
                title: 'GitHub',
                url: 'https://github.com/crazycodeboy',
            },
        }
    },
    CONTACT: {
        name: '联系方式',
        items: {
            QQ: {
                title: 'QQ',
                account: '1586866509',
            },
            Email: {
                title: 'Email',
                account: 'crazycodeboy@gmail.com',
            },
        }
    },
};

export default class AboutAuthorPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.aboutCommon = new AboutComponent(props, (dic) => this.updateState(dic), ABOUT_FLAG.about_author,config);
        this.state = {
            projectModels: [],
            isShowRepository: false,
            isShowBolg: false,
            isShowContact: false
        }
        this.onBackPress = this.onBackPress.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.renderItems = this.renderItems.bind(this);
    }




    updateState(dic) {
        console.log("updateState-------->"+dic)
        this.setState(dic);
    }


    onBackPress() {
        this.props.navigation.goBack();
    }
    componentDidMount() {
        this.aboutCommon.componentDidMount();
    }
    renderItems(dic, isShowAccount) {

        let views = [];
        for (let i in  dic) {
            let title = dic[i].title + (isShowAccount ? dic[i].account : "");
            views.push(
                <View key={i}>
                    {ViewUtil.getItemView(() => this.onItemClick(MORE_MENU.CSDN), require("../../imgs/ic_star.png"), title, "#2196F3")}
                </View>
            )
        }
        return views;
    }

    render() {
        let contentView = <View>
            {ViewUtil.getItemView(() => this.onItemClick(FLAG.REPOSITORY), require("../../imgs/ic_code.png"), FLAG.REPOSITORY, "#2196F3",this.state.isShowRepository)}
            {this.state.isShowRepository ? this.aboutCommon.renderRepository(this.state.projectModels) : null}
            <View style={GlobalStyle.line}/>

            {ViewUtil.getItemView(() => this.onItemClick(FLAG.BLOG.name), require("../../imgs/ic_computer.png"), FLAG.BLOG.name, "#2196F3",this.state.isShowBolg)}
            {this.state.isShowBolg ? this.renderItems(FLAG.BLOG.items, false) : null}
            <View style={GlobalStyle.line}/>
            {ViewUtil.getItemView(() => this.onItemClick(FLAG.CONTACT.name), require("../../imgs/ic_contacts.png"), FLAG.CONTACT.name, "#2196F3",this.state.isShowContact)}
            {this.state.isShowContact ? this.renderItems(FLAG.CONTACT.items,false):null}
        </View>;
        return this.aboutCommon.renderView(contentView, {
            "title": "咻咻咻",
            "info": "分享技术 分享快乐",
            "bg_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527575081565&di=427ceb602b52565392ba0943b997f290&imgtype=0&src=http%3A%2F%2Fi3.sinaimg.cn%2Ftravel%2Ful%2F2009%2F0318%2FU3059P704DT20090318152814.jpg",
            "author_img": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=31220976,2327152167&fm=27&gp=0.jpg"
        })
    }


    onItemClick(flag) {
        switch (flag) {
            case FLAG.REPOSITORY:
                this.updateState({
                    isShowRepository:!this.state.isShowRepository,
                });
                ToastAndroid.show(FLAG.REPOSITORY + "", 1000);
                break;
            case FLAG.BLOG.name:
                ToastAndroid.show(FLAG.BLOG.name + "", 1000);
                this.updateState({
                    isShowBolg:!this.state.isShowBolg,
                });
                break;
            case FLAG.CONTACT.name:
                this.setState({
                    isShowContact:!this.state.isShowContact
                })
                ToastAndroid.show(FLAG.CONTACT.name + "", 1000);
                break;
        }

    }

}

