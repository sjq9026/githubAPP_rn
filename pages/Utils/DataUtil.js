import keys from '../../res/data/keys.json'
import language from '../../res/data/langs.json';
import {AsyncStorage} from "react-native"
import React from 'react';
import {NET_FLAG} from "./NetUtil";

import {ReactNative, ToastAndroid} from 'react-native';
import NetUtil from "./NetUtil";
import ArrayUtil from "./ArrayUtil";

export const FLAG = {all_language: "all_language", hot_language: "hot_language"}
export const FAVORITE_FLAG = {
    popular_flag: "popular_flag",
    trending_flag: "trending_flag",
    About_Author: "about_author"
}
export default class DataUtil {


    constructor(flag, netFlag) {
        this.flag = flag;
        this.netFlag = netFlag;
    }


    getkeys() {
        console.log(this.flag)
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                console.log(this.flag)
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    var data = this.flag === FLAG.hot_language ? keys : language;
                    console.log(JSON.stringify(data))
                    this.saveLanguage(this.flag, data);
                    resolve(data);
                } else {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                }
            });
        });


    }


    saveLanguage(flag, data) {
        AsyncStorage.setItem(flag, JSON.stringify(data), (error) => {
            alert("保存成功")
        })
    }

    getData(url) {
        //先从本地获取数据
        return new Promise((resolve, reject) => {
                this.getLocalData(url)
                    .then(result => {
                        if (result) {
                            console.log("从本地获取数据")
                            resolve(JSON.parse(result))
                        } else {
                            NetUtil.get(url, this.netFlag)
                                .then(result => {
                                    console.log("从网络获取数据")
                                    resolve(result)
                                })
                                .catch(error => {
                                    resolve(error)
                                })
                        }
                    })
                    .catch(error => {
                        NetUtil.get(url, this.netFlag)
                            .then(result => {
                                resolve(result)
                                console.log("数据来源于网络")
                            })
                            .catch(error => {
                                resolve(error)
                            })
                    })


            }
        )
    }

    /**
     * 获取本地存贮的数据
     * @param url
     * @returns {Promise}
     */
    getLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                resolve(result);
            })
        })
    }

    static saveNetData(url, items) {
        return new Promise((resolve, reject) => {
            let data = {items: items, updateTime: new Date().getTime()};
            AsyncStorage.setItem(url, JSON.stringify(data), (error) => {
                alert("保存网络数据成功")
            })
        })
    }

    /**
     * 检查现在的时间和传入的时间相差是否大于4个小时，大于的话 返回false  小于4小时 返回true
     * @param longTime
     * @returns {boolean}
     */
    checkDate(longTime) {
        /* let cDate = new Date();
         let tDate = new Date();
         tDate.setDate(long);
         if (cDate.getMonth() !== tDate.getMonth()) return false;
         if (cDate.getDate() !== tDate.getMonth()) return false;
         if (cDate.getHours() - tDate.getHours() > 4) return false;*/
        let currentDate = new Date();
        let targetDate = new Date();
        targetDate.setTime(longTime);
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() - targetDate.getHours() > 4) return false;
        return true;
    }


    getAllFavoriteIds(flag) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(flag, (error, result) => {
                let keys = [];
                keys = JSON.parse(result);
                console.log("所有已收藏的key----->" + keys);
                resolve(keys);
            })
        })
    }

    /**
     * 更新收藏状态，如果已收藏列表里面有这个 那么就删除  如果没有 那么就收藏
     * @param flag  key
     * @param item     当前收藏条目的id
     */
    upDateFavorite(flag, item) {
        let id = null;
        if (flag !== FAVORITE_FLAG.About_Author) {
            id = item.id ? item.id+"" : item.fullName;
        } else {
            id = item.id+"";
        }

        this.getAllFavoriteIds(flag)
            .then((result) => {
                let favoriteKeys = [];
                if (result) {
                    favoriteKeys = result;
                    console.log(result)
                    //如果已经有这个收藏的ID  那么移除，没有的话 添加
                    if (ArrayUtil.isCon(favoriteKeys, id)) {
                        favoriteKeys = ArrayUtil.removeArray(favoriteKeys, id)
                        AsyncStorage.removeItem(id + "", (error) => {

                        })
                    } else {
                        favoriteKeys.push(id);
                        AsyncStorage.setItem(id + "", JSON.stringify(item), (error) => {

                        })
                    }
                } else {
                    favoriteKeys.push(id);
                    AsyncStorage.setItem(id + "", JSON.stringify(item), (error) => {

                    })
                }

                AsyncStorage.setItem(flag, JSON.stringify(favoriteKeys), (error) => {
                    ToastAndroid.show("更新成功", 2000)
                })


            })
    }

    /**
     * 获取所有收藏的项目
     * @param favoriteKey  popular_flag Trending_flag
     */
    getAllFavoriteItems(favoriteKey) {
        return new Promise((resolve, reject) => {
            this.getAllFavoriteIds(favoriteKey)
                .then((keys) => {
                    let favoriteKeys = [];
                    let items = [];

                    if (keys) {
                        for (let i = 0; i < keys.length; i++) {
                            if (favoriteKey === FAVORITE_FLAG.popular_flag) {
                                favoriteKeys.push(keys[i])
                            } else {
                                favoriteKeys.push(keys[i])
                            }
                        }
                        AsyncStorage.multiGet(favoriteKeys, (error, result) => {
                            if (result) {
                                result.map((result, i, array) => {
                                    items.push(JSON.parse(array[i][1]));
                                })
                                resolve(items);
                            } else {
                                resolve(items);
                            }
                        })
                    } else {
                        resolve(items);
                    }
                })
        })
    }
}