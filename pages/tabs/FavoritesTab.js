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
    ListView
} from 'react-native';
import PopularItemView from "../../itemViews/PopularItemView";
import TrendingItemView from "../../itemViews/TrendingItemView";
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from "react-native-scrollable-tab-view";
import DataUtil, {FAVORITE_FLAG,FLAG} from "../Utils/DataUtil";
import {NET_FLAG} from "../Utils/NetUtil";
import ItemModel from "../other/ItemModel";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class FavoritesTab extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar/>}
                    initialPage={0}
                    locked={false}
                    scrollWithoutAnimation={true}
                    tabBarBackgroundColor={"#377DFE"}
                    tabBarActiveTextColor={"#E61A5F"}
                    tabBarInactiveTextColor={"white"}
                    tabBarTextStyle={{textAlign: 'center'}}>


                    <FavoriteLabel tabLabel="Popular" flag={FAVORITE_FLAG.popular_flag} {...this.props}
                                   style={{textAlign: 'center'}}>

                    </FavoriteLabel>
                    <FavoriteLabel tabLabel="Trending" flag={FAVORITE_FLAG.trending_flag} {...this.props}
                                   style={{textAlign: 'center'}}>

                    </FavoriteLabel>

                </ScrollableTabView>
            </View>
        );
    }
}

class FavoriteLabel extends Component {
    constructor(props) {
        super(props);
        this.dataUtil = null;
        if(this.props.flag === FAVORITE_FLAG.popular_flag){
            this.dataUtil  = new DataUtil(FLAG.hot_language, NET_FLAG.Popular);
        }else{
            this.dataUtil = new DataUtil(FLAG.all_language, NET_FLAG.Trending);
        }
        this.flag = props.flag;
        console.log(this.flag)
        this.state = {
            refreshing: false,
            loadingMore: false,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        }

        this.renderFooterView = this.renderFooterView.bind(this);
        this.reloadWordData = this.reloadWordData.bind(this);
        this.renderItemView = this.renderItemView.bind(this);
        this.flushDadaSource = this.flushDadaSource.bind(this);


        this.reloadWordData();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.reloadWordData}
                        />}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.renderItemView(rowData)}
                    renderFooter={this.renderFooterView}
                    onEndReached={this._toEnd.bind(this)}
                    enableEmptySections={true}
                    onEndReachedThreshold={5}
                />
            </View>

        )
    }

    componentDidMount() {
        this.loadPopularData();
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiverProps");
        this.loadPopularData();
    }

    loadPopularData() {
        this.dataUtil.getAllFavoriteItems(this.flag)
            .then((result) => {
                this.datas = result;
                console.log(this.datas)
                this.flushDadaSource();
            })
            .then(result => {
                if (result) {
                    this.datas = JSON.parse(result);
                    this.flushDadaSource();
                }
            })


    }

    flushDadaSource() {
        let itemModels = [];
        let len = this.datas.length;
        for (let i = 0; i < len; i++) {
            itemModels.push(new ItemModel(this.datas[i], true));
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(itemModels),
        })
    }

    reloadWordData() {
        /*  this.setState({
              refreshing:false
          })*/
    }

    renderFooterView() {
        if (this.state.loadingMore) {
            return (<ActivityIndicator style={{marginVertical: 20}}/>);
        } else {
            return (<View style={{marginVertical: 10}}>
                <Text>加载更多</Text>
            </View>);
        }
    }


    _toEnd() {
        this.setState({
            loadingMore: true
        });
        var t = this;

        ToastAndroid.show("加载更多", 1000);
        setInterval(function () {
            /* t.setState({
                 loadingMore:false
             })*/
        }, 2000);
    }

    renderItemView(rowdata) {
        // return <PopularItemView data={rowdata}
        //                         onSelect={() => this.props.navigation.navigate("PopularDetailPage", {data: rowdata})}/>



        return this.props.flag === FAVORITE_FLAG.popular_flag
            ? <PopularItemView itemModel={rowdata}
                                onSelect={() => this.props.navigation.navigate("PopularDetailPage", {
                                    data: rowdata,
                                    flag: "Popular"
                                })}
                                onFavoriteClick={() => this.onFavoriteClick(rowdata)} />
            :<TrendingItemView data={rowdata}
                onSelect={() => this.props.navigation.navigate("PopularDetailPage", {data: rowdata,flag:"Trending"})}
                onFavoriteClick={() => this.onFavoriteClick(rowdata)}
                />
    }

    onFavoriteClick(rowdata) {
        rowdata.isFavorite = !rowdata.isFavorite;

        this.dataUtil.upDateFavorite(this.props.flag, rowdata.item);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

});
