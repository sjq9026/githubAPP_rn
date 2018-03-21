export default class ArrayUtil {
    static cloneArray(arr) {
        let newArr = [];
        if (arr !== null && arr.length > 0) {
            let newArr = [];
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                newArr.push(arr[i]);
            }
            return newArr;
        } else{
            return newArr;
        }
}


}