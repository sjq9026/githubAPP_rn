import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
    ToastAndroid
} from 'react-native';
const  width = Dimensions.get("window").width;
export default class ViewUtil{
    /**
     * 获取itemView
     * @param callBack  item点击事件
     * @param icon      左侧的图标
     * @param content   显示的文字内容
     * @param hintColor 图片的颜色
     * @param isExpand  展开OR折叠
     */
    static getItemView(callBack,icon,content,hintColor,isExpand){

        return ( <TouchableHighlight onPress={callBack}>
            <View style={styles.selitem}>
                <View style={{flexDirection: "row"}}>
                    <Image source={icon}
                           style={{width: 20, height: 20 ,marginLeft:10,tintColor:hintColor}}/>
                    <Text style={{marginLeft:20}}>{content}</Text>
                </View>

                <Image source={isExpand?require("../../imgs/ic_star.png"):require("../../imgs/ic_star.png")}
                       style={{width: 20, height: 20,marginRight:10,tintColor:hintColor}}/>
            </View>
        </TouchableHighlight>)

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },


    github: {
        height: 60,
        width: width,
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