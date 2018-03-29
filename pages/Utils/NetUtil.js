import DataUtil from "./DataUtil";
import Trending from "GitHubTrending";

export const NET_FLAG = {Popular: "popular", Trending: "trending"};

export default class NetUtil {

    constructor(flag) {
        this.flag = flag;
        this.trending = null;
    }


    static get(url, netFlag) {
        return new Promise((resolve, reject) => {
            if (netFlag === NET_FLAG.Popular) {
                fetch(url)
                    .then((response) => response.json())
                    .catch((error) => {
                        reject(error);
                    }).then((responseData) => {
                    if (!responseData) {
                        reject(new Error("Response is null"))
                    }
                    resolve(responseData);
                    DataUtil.saveNetData(url, responseData.items);
                })
            } else {
                if (this.trending === null) {
                    this.trending = new Trending();
                }
                this.trending.fetchTrending(url)
                    .then(items => {
                        if (!items) {
                            reject(new Error("获取网络Trending数据失败"))
                            return;
                        }
                        resolve(items);
                        DataUtil.saveNetData(url, items)
                    })
                    .catch((error) => {
                        reject(error);
                    })

            }

        })


    }


    static post(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                });
        })
    }

}