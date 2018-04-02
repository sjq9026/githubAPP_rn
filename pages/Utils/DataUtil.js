import keys from '../../res/data/keys.json'
import language from '../../res/data/langs.json';
import {AsyncStorage} from "react-native"
import React from 'react';
import {NET_FLAG} from "./NetUtil";

import ReactNative from 'react-native';
import NetUtil from "./NetUtil";

export const FLAG = {all_language: "all_language", hot_language: "hot_language"}
export default class DataUtil {


    constructor(flag, netFlag) {
        this.flag = flag;
        this.netFlag = netFlag;
    }


    getAllLanguage() {
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
                            resolve(JSON.parse(result))
                            console.log("数据来源于本地")
                        } else {
                            NetUtil.get(url, this.netFlag)
                                .then(result => {
                                    resolve(result)
                                    console.log("数据来源于网络")
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
        if (currentDate.getMonth() !== targetDate.getMonth())return false;
        if (currentDate.getDate() !== targetDate.getDate())return false;
        if (currentDate.getHours() - targetDate.getHours() > 4)return false;
        return true;


    }
}