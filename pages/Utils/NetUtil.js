import DataUtil from "./DataUtil";

export default class NetUtil {
    static get(url) {
        //先从本地获取数据，本地无数据或者超时再从网络获取数据
        return new Promise((resolve, reject) => {
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