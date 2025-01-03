// 定義二元樹節點
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// 建立二元樹
function createBinaryTree() {
    // 建立如圖所示的二元樹
    const root = new TreeNode('A');
    root.left = new TreeNode('B');
    root.right = new TreeNode('C');
    root.left.left = new TreeNode('D');
    root.left.right = new TreeNode('E');
    root.right.left = new TreeNode('F');
    root.right.right = new TreeNode('G');
    return root;
}

class TreeTraversal {
    constructor() {
        this.result = [];
    }

    // 前序遍歷 (根 -> 左 -> 右)
    preorderTraversal(root) {
        this.result = [];
        this._preorder(root);
        return this.result;
    }

    _preorder(node) {
        if (node === null) return;
        this.result.push(node.value);  // 訪問根節點
        this._preorder(node.left);     // 遍歷左子樹
        this._preorder(node.right);    // 遍歷右子樹
    }

    // 中序遍歷 (左 -> 根 -> 右)
    inorderTraversal(root) {
        this.result = [];
        this._inorder(root);
        return this.result;
    }

    _inorder(node) {
        if (node === null) return;
        this._inorder(node.left);      // 遍歷左子樹
        this.result.push(node.value);  // 訪問根節點
        this._inorder(node.right);     // 遍歷右子樹
    }

    // 後序遍歷 (左 -> 右 -> 根)
    postorderTraversal(root) {
        this.result = [];
        this._postorder(root);
        return this.result;
    }

    _postorder(node) {
        if (node === null) return;
        this._postorder(node.left);    // 遍歷左子樹
        this._postorder(node.right);   // 遍歷右子樹
        this.result.push(node.value);  // 訪問根節點
    }
}

// 測試程式
function testTreeTraversal() {
    const tree = createBinaryTree();
    const traversal = new TreeTraversal();

    // 執行三種遍歷
    const preorder = traversal.preorderTraversal(tree);
    const inorder = traversal.inorderTraversal(tree);
    const postorder = traversal.postorderTraversal(tree);

    // 輸出結果
    console.log('二元樹遍歷結果：');
    console.log('前序遍歷 (根->左->右):', preorder.join(' -> '));
    console.log('中序遍歷 (左->根->右):', inorder.join(' -> '));
    console.log('後序遍歷 (左->右->根):', postorder.join(' -> '));
}

// 執行測試
testTreeTraversal();