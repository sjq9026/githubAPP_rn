import keys from '../../res/data/keys.json'
import  {AsyncStorage} from "react-native"
import React from 'react';

import ReactNative from 'react-native';

export const FLAG = {all_language: "all_language", hot_language: "hot_language"}
export default class DataUtil {


    constructor(flag) {
        this.flag = flag;
    }


    getAllLanguage() {
        console.log(this.flag)
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(error){
                    reject(error);
                    return;
                }
                if (!result){
                    var data=this.flag === FLAG.all_language ? keys : null;
                    this.saveAllLanguage(data);
                    resolve(data);
                }else {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                }
            });
        });


    }





    saveAllLanguage(data){
        console.log(JSON.stringify(data))
        AsyncStorage.setItem(FLAG.all_language,JSON.stringify(data),(error)=>{
            alert("数据保存失败");
        })
    }
}