// 基本的循序搜尋函數
function sequentialSearch(arr, target) {
    // 檢查輸入的陣列是否為空
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    // 從頭到尾遍歷陣列
    for (let i = 0; i < arr.length; i++) {
        // 如果找到目標元素，返回索引
        if (arr[i] === target) {
            return i;
        }
    }
    
    // 如果沒找到，返回 -1
    return -1;
}

// 進階版本：可以同時搜尋物件陣列中的多個屬性
function sequentialSearchByMultipleProperties(arr, searchCriteria) {
    // 檢查輸入的陣列是否為空
    if (!arr || arr.length === 0) {
        return -1;
    }
    
    // 從頭到尾遍歷陣列
    for (let i = 0; i < arr.length; i++) {
        let isMatch = true;
        
        // 檢查所有搜尋條件
        for (const [property, value] of Object.entries(searchCriteria)) {
            if (!arr[i] || arr[i][property] !== value) {
                isMatch = false;
                break;
            }
        }
        
        // 如果所有條件都符合，返回該索引
        if (isMatch) {
            return i;
        }
    }
    
    // 如果沒找到，返回 -1
    return -1;
}

// 使用範例：
const numbers = [5, 2, 9, 1, 7, 6, 3];
console.log(sequentialSearch(numbers, 7));  // 輸出：4

const users = [
    { id: 1, name: "小明", age: 10 },
    { id: 2, name: "小華", age: 14 },
    { id: 3, name: "小菁", age: 20 },
    { id: 4, name: "大明", age: 13 },
    { id: 5, name: "大華", age: 13 },
];

// 搜尋單一屬性
console.log(sequentialSearchByMultipleProperties(users, { name: "小華" }));  // 輸出：1

// 搜尋多個屬性
console.log(sequentialSearchByMultipleProperties(users, { 
    name: "小華", 
    age: 14 
}));  // 輸出：1

// 搜尋所有屬性
console.log(sequentialSearchByMultipleProperties(users, { 
    id: 2,
    name: "小華", 
    age: 14 
}));  // 輸出：1
console.log(sequentialSearchByMultipleProperties(users, { 
    id: 1,
    age: 10 
}));  // 輸出：0
console.log(sequentialSearchByMultipleProperties(users, {  
    age: 13, 
}));  