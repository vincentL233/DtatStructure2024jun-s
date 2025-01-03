function mergeSort(arr) {
    // 基本情況：如果陣列長度小於等於1，直接返回
    if (arr.length <= 1) {
        return arr;
    }

    // 分割階段
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    // 合併階段
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // 比較並合併兩個子陣列
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // 將剩餘的元素加入結果陣列
    return result
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
}

// 使用範例
const arr = [38, 27, 43, 3, 9, 82, 10];
const sortedArr = mergeSort(arr);
console.log('排序前:', arr);
console.log('排序後:', sortedArr);