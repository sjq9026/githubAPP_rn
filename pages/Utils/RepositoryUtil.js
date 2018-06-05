import DataUtil from "./DataUtil";
import {FAVORITE_FLAG} from "./DataUtil"
import {NET_FLAG} from "./NetUtil";

export default class RepositoryUtil {
    constructor(comment) {
        this.aboutCommon = comment;
        this.dataUtil = new DataUtil(FAVORITE_FLAG.About_Author, NET_FLAG.About_Author);
        this.itemMap = new Map();
    }


    /**
     * 更新数据
     * @param k
     * @param v
     */
    updateData(k, v) {
        this.itemMap.set(k, v);
        var arr = [];
        for (var value of this.itemMap.values()) {
            arr.push(value);
        }
        this.aboutCommon.onNotifyDataChanged(arr);
    }

    fetchRepository(url) {
        this.dataUtil.getData(url)
            .then(result => {

                if (result) {
                    this.updateData(url, result)
                    if (!Utils.checkDate(result.update_date)) {
                        return this.dataUtil.getData(url);
                    }
                } else {
                    return this.dataUtil.getData(url);
                }
            })
            .then((item) => {
                if (item) {
                    this.updateData(url, item);
                }
            })
    }


    /**
     * 批量获取url对应的数据
     * @param urls
     */
    fetchRepositories(urls) {
        for (let i = 0, l = urls.length; i < l; i++) {
            var url = urls[i];
            this.fetchRepository(url);
        }
    }


}