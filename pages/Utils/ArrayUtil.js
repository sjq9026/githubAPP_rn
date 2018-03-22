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
        } else {
            return newArr;
        }
    }


    static removeArray(arr1, item) {
        if (arr1) {
            for (let i = 0, j = arr1.length; i < j; i++) {
                if (arr1[i] === item) {
                    arr1.splice(i, 1);
                }
            }
            return arr1;
        }
    }


}