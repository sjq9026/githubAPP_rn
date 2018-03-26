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
    Image,
    Dimensions,
    TouchableHighlight
} from 'react-native';

const width = Dimensions.get("window").width;
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class PopularItemView extends Component<Props> {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={()=>{this.props.onSelect()}}>
                    <Text style={styles.title}>{this.props.data.full_name}</Text>
                    <Text style={styles.content}>{this.props.data.description}</Text>
                    <View style={{height: 30, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View style={styles.line}>
                            <Text>Author:</Text>
                            <Image style={{width: 20, height: 20}} source={{uri:"https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1521793086&di=7de9d4f6004e614ad61ac44987c05654&src=http://img.juweixin.com/uploads/weixin/2016/1210/1612100902468509.jpg"}}/>
                        </View>

                        <View style={styles.line}>
                            <Text style={{fontSize: 16, color: "black"}}>start:</Text>
                            <Text style={{alignItems: 'center'}}>{this.props.data.stargazers_count}</Text>
                        </View>
                        <Image style={{width: 20, height: 20}} source={require('../imgs/ic_star.png')}/>
                    </View>

                    <Text style={{width: width-20, height: 2,backgroundColor:'gray',alignSelf:"center"}}>

                    </Text>
                </TouchableHighlight>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,

    },
    title: {
        fontSize: 16,
        color: "black"
    },
    content: {
        fontSize: 14,
        color: "gray"
    },
    line: {
        flexDirection: "row",
        alignItems: 'center'
    }


});
