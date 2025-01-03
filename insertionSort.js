function insertionSort(arr) {
    // 從第二個元素開始
    for(let i = 1; i < arr.length; i++) {
        // 當前要插入的數字
        let current = arr[i];
        let j = i - 1;
        
        // 當前面的數字比較大時,就往後移
        while(j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // 插入到正確位置
        arr[j + 1] = current;
        console.log(arr);
    }
    return arr;
    
}

// 測試
let arr = [5, 2, 8, 1, 9];
console.log(insertionSort(arr));  // [1, 2, 5, 8, 9]