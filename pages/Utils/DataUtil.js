import keys from '../../res/data/keys.json'
import {AsyncStorage} from "react-native"
import React from 'react';

import ReactNative from 'react-native';
import NetUtil from "./NetUtil";

export const FLAG = {all_language: "all_language", hot_language: "hot_language"}
export default class DataUtil {


    constructor(flag) {
        this.flag = flag;
    }


    getAllLanguage() {
        console.log(this.flag)
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                console.log("1111")
                console.log(this.flag)
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    var data = this.flag === FLAG.all_language ? keys : null;
                    console.log(JSON.stringify(data))
                    this.saveAllLanguage(data);
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


    saveAllLanguage(data) {
        AsyncStorage.setItem(FLAG.all_language, JSON.stringify(data), (error) => {
            alert("保存成功")
        })
    }

    static getData(url) {
        //先从本地获取数据
        return new Promise((resolve, reject) => {
                this.getLocalData(url)
                    .then(result => {
                        if (result) {
                            resolve(result)
                        } else {
                            NetUtil.get(url)
                                .then(result => {
                                    resolve(result)
                                })
                                .catch(error => {
                                    resolve(error)
                                })
                        }
                    })
                    .catch(error => {
                        NetUtil.get(url)
                            .then(result => {
                                resolve(result)
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
    static getLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                    resolve(result);
            })
        })
    }

    static saveNetData(url, items) {
        return new Promise((resolve, reject) => {
            let data = {items:items,updateTime:new Date().getTime()};
            AsyncStorage.setItem(url, JSON.stringify(data), (error) => {
                alert("保存网络数据失败")
            })
        })
    }

    /**
     * 检查现在的时间和传入的时间相差是否大于4个小时，大于的话 返回false  小于4小时 返回true
     * @param long
     * @returns {boolean}
     */
    static checkDate(long) {
        let cDate = new Date();
        let tDate = new Date();
        tDate.setDate(long);
        if (cDate.getMonth() !== tDate.getMonth()) return false;
        if (cDate.getDate() !== tDate.getMonth()) return false;
        if (cDate.getHours() - tDate.getHours() > 4) return false;
        return true;


    }
}