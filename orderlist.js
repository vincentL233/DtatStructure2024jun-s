class OrderedList {
    constructor() {
        this.items = [];
    }

    // 插入元素並保持排序
    insert(value) {
        if (this.items.length === 0) {
            this.items.push(value);
            return;
        }

        const index = this.findInsertPosition(value);
        this.items.splice(index, 0, value);
    }

    // 使用二元搜尋找到正確的插入位置
    findInsertPosition(value) {
        let left = 0;
        let right = this.items.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (this.items[mid] === value) {
                return mid;
            }
            
            if (this.items[mid] < value) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return left;
    }

    // 使用二元搜尋查找元素
    search(value) {
        let left = 0;
        let right = this.items.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (this.items[mid] === value) {
                return mid;  // 找到元素，返回索引
            }
            
            if (this.items[mid] < value) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1 ;  // 沒找到元素
    }

    // 刪除元素
    remove(value) {
        const index = this.search(value);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    // 取得所有元素
    getItems() {
        return this.items;
    }
}
const list = new OrderedList();

// 插入一些數字
list.insert(5);
list.insert(2);
list.insert(8);
list.insert(1);
list.insert(9);
list.insert(5);
list.insert(4.5);
list.insert(-1);
list.insert(5);
console.log(list.getItems());  

// 搜尋元素
console.log(list.search(5));   // 2 (索引位置)
console.log(list.search(3));   // -1 (未找到)

// 移除元素
list.remove(2);
console.log(list.getItems());  // [1, 5, 8, 9]