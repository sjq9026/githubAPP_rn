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
    Dimensions,
    ToastAndroid,
    RefreshControl,
    ActivityIndicator,
    ListView,
    TextInput,
    Image,
    TouchableHighlight,
    FlatList,
    Button,
    DeviceEventEmitter
} from 'react-native';
import GlobalStyle from "../../res/styles/GlobalStyle";
import NetUtil from "../Utils/NetUtil";
import PopularItemView from "../../itemViews/PopularItemView";
import DataUtil, {FLAG, FAVORITE_FLAG} from "../Utils/DataUtil"
import {NET_FLAG} from "../Utils/NetUtil";
import ItemModel from "../other/ItemModel";
import ArrayUtil from "../Utils/ArrayUtil";
import {HOME_ACTION} from "./PopularTab"

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';


var ScreenWidth = Dimensions.get('window').width;
export default class SearchTab extends Component<Props> {


    constructor(props) {
        super(props);
        this.dd = new DataUtil(FLAG.hot_language, NET_FLAG.Popular);
        this.keyHasChange = false;
        this.state = {
            rightStr: "搜索",
            loading: false,
            items: [],
            isConKey: true
        };
        this.rightClick = this.rightClick.bind(this);
    }


    render() {

        let loadingImg = this.state.loading ? <ActivityIndicator
            style={stys.indicator}
            size="large"
            animating={this.state.loading}
        /> : null;

        let listView = this.state.loading ? null : <FlatList
            data={this.state.items}
            refreshing={this.state.loading}
            renderItem={(data) => this._renderItem(data)}
        > </FlatList>;


        let bottomBtn = (!this.state.loading && !this.state.isConKey) ? <View style={stys.bottomBtn}>
            <Button title="添加到已选"
                    onPress={() => this.add2Already()}
                    color="#841584"
            />


        </View> : null;


        let contentView = <View style={{flex: 1}}>
            {loadingImg}
            {listView}
            {bottomBtn}

        </View>
        return (
            <View style={stys.container}>
                <View style={stys.title}>
                    <TouchableHighlight onPress={()=>this.onBack()}>
                        <Image source={require("../../imgs/ic_arrow_back_white_36pt.png")}
                               style={{width: 25, height: 25, tintColor: "#2196F3", marginLeft: 10, marginRight: 10}}
                        >
                        </Image>
                    </TouchableHighlight>
                    <TextInput style={stys.input}
                               placeholder="请输入关键字"
                               underlineColorAndroid='transparent'
                               onChangeText={(text) => this.key = text}
                    >

                    </TextInput>
                    <Text style={{color: "#2196F3", paddingRight: 10, paddingLeft: 10}}
                          onPress={this.rightClick}>{this.state.rightStr}</Text>
                </View>
                <View style={GlobalStyle.line}>

                </View>

                {contentView}


            </View>
        );
    }

    onBack(){
        this.props.navigation.goBack();
        DeviceEventEmitter.emit("ACTION",HOME_ACTION.POPULAR_CHANGE);

    }


    _renderItem({item}) {
        // return <PopularItemView data={rowdata}
        //                         onSelect={() => this.props.navigation.navigate("PopularDetailPage", {data: rowdata})}/>
        console.log("rowdata------>" + JSON.stringify(item));
        return <PopularItemView itemModel={item}
                                onSelect={() => this.props.navigation.navigate("PopularDetailPage", {
                                    data: item,
                                    flag: "Popular"
                                })}
                                onFavoriteClick={() => this.onFavoriteClick(item)}

        />
    }

    onFavoriteClick(rowdata) {
        rowdata.isFavorite = !rowdata.isFavorite;
        ToastAndroid.show(rowdata.item.stargazers_count + "", 1000);
        this.dd.upDateFavorite(FAVORITE_FLAG.popular_flag, rowdata.item);
    }


    add2Already() {
        let keyEntity = {
            "path": this.key,
            "name": this.key,
            "checked": true
        }

        let keys = [];

        this.dd.getkeys()
            .then(result => {
                if (result !== null && result.length > 0) {
                    keys.push(keyEntity);
                    for (let i = 0; i < result.length - 1; i++) {
                        keys.push(result[i])
                    }
                    this.dd.saveLanguage(FLAG.hot_language,keys);
                   this.keyHasChange = true;
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    rightClick() {
        if (this.state.rightStr === "搜索") {

            this.isCon = false;
            this.dd.getkeys()
                .then(result => {
                    if (result !== null && result.length > 0) {

                        for (let i = 0; i < result.length - 1; i++) {

                            let keyEntity = result[i];
                            if (keyEntity.name.toUpperCase() === this.key.toUpperCase()) {
                                this.isCon = true;
                                break;
                            }
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                })

            this.setState({
                rightStr: "取消",
                loading: true,
            })


            let url = this.getUrl(this.key);
            console.log("搜索url------>" + url);
            fetch(this.getUrl(this.key))
                .then(response => response.json())
                .then(responseData => {
                    if (!this || !responseData || !responseData.items || responseData.items.length === 0) {
                        return;
                    } else {
                        this.datas = responseData.items;
                        this.flushDadaSource();

                    }
                })
        } else {
            this.setState({
                rightStr: "搜索",

            });


        }
    }


    flushDadaSource() {
        let itemModels = [];
        let len = this.datas.length;
        //获取所有已收藏的条目的id
        this.dd.getAllFavoriteIds(FAVORITE_FLAG.popular_flag)
            .then((result) => {
                if (result === null || result.length === 0) {
                    for (let i = 0; i < len; i++) {
                        itemModels.push(new ItemModel(this.datas[i], false));
                    }
                } else {
                    for (let i = 0; i < len; i++) {
                        let isFavorite = ArrayUtil.isCon(result, JSON.stringify(this.datas[i].id));
                        console.log("id=" + this.datas[i].id + "      isFavorite=" + isFavorite + "")
                        itemModels.push(new ItemModel(this.datas[i], isFavorite));
                    }
                }
                this.setState({
                    items: itemModels,
                    loading: false,
                    isConKey: this.isCon
                })

            })


    }


    getUrl(key) {
        return URL + key + QUERY_STR;
    }


}


const stys = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 35
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        padding: 0,
        lineHeight: 35,
        paddingLeft: 5
    },
    indicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomBtn: {
        width: ScreenWidth,
        height: 35,

    }

});
