class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = array;
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const sortedArray = [...new Set(array)].sort((a,b) => a - b)

        const buildTreeRecursive = (arr, start, end) => {
            if (start > end) return null;

            const mid = Math.floor((start + end) / 2);

            const node = new Node(arr[mid]);

            node.left = buildTreeRecursive(arr, start, mid-1);

            node.right = buildTreeRecursive(arr, mid+1, end);

            return node;
        };
        return buildTreeRecursive(sortedArray, 0, sortedArray.length - 1);
    }

    insert(value) {
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }

        const insertRec = (node, value) => {
            if (value < node.data) {
                if (node.left === null) {
                    node.left = new Node(value);
                } else {
                    insertRec(node.left, value);
                }
            }
            else if (value > node.data) {
                if (node.right == null) {
                    node.right = new Node(value);
                } else {
                    insertRec(node.right, value);
                }
            }
            insertRec(this.root, value);
        }
    }

    delete(value) {
        const findMin = (node) => {
            let current = node;
            while (current.left !== null) {
                current = current.left;
            }
            return current
        };

        const deleteRec = (node, value) => {
            if (node === null) return null;

            if (value < node.data) {
                node.left = deleteRec(node.left, value);
            }
            else if (value > node.data) { 
                node.right = deleteRec(node.right, value);
            }
            else {
                if (node.left === null && node.right === null) {
                    return null;
                }
                else if (node.left === null ) {
                    return node.right;
                }
                else if (node.right === null) {
                    return node.left;
                }
                else {
                    const temp = findMin(node.right);
                    node.data = temp.data;

                    node.right = deleteRec(node.right, temp.data);
                }
            }
            return node
        };
        this.root = deleteRec(this.root, value);
    }

    find(value) {
        const findRec = (node, value) => {
            if (node === null) {
                return null;
            }

            if (node.data === value) {
                return node;
            }

            if (value < node.data) {
                return findRec(node.left, value);
            }
            return findRec(node.right, value);
        };
        return findRec(this.root, value)
    }

    levelOrder(callback) {
        if (!callback) {
            throw new Error("Callback function is required");
        }

        if (this.root === null) return;

        const queue = [this.root];

        while (queue.length > 0) {
            const currentNode = queue.shift();
            callback(currentNode);

            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }

            if (currentNode.right !== null) {
                queue.push(currentNode.right)
            }
        }
    }

    inOrder(callback) {
        if (!callback) {
            throw new Error("Callback function is required");
        }

        const inOrderRec = (node) => {
            if (node === null) return;

            inOrderRec(node.left);
            callback(node);
            inOrderRec(node.right);
        };

        inOrderRec(this.root);
    }

    preOrder(callback) {
        if (!callback) {
            throw new Error("Callback function is require");
        }

        const preOrderRec = (node) => {
            if (node === null) return;

            callback(node);

            preOrderRec(node.left);

            preOrderRec(node.right);
        };
        preOrderRec(this.root);
    }

    postOrder(callback) {
        if (!callback) {
            throw new Error("Callback function is required")
        }

        const postOrderRec = (node) => {
            if (node === null) return;

            postOrderRec(node.left);

            postOrderRec(node.right);

            callback(node);
        };
        postOrderRec(this.root);
    }

    height(node) {
        if (node === null) {
            return -1;
        }

        const leftHeight = this.height(node.left);
        const rightHeigt = this.height(node.right);

        return Math.max(leftHeight, rightHeigt) + 1
    }

    depth(node) {
        if (node === null) return -1;

        const findDepth = (currentNode, targetNode, level = 0) => {
            if (currentNode === null) return -1;
            if (currentNode === targetNode) return level;

            if (targetNode.data < currentNode.data) {
                return findDepth(currentNode.left, targetNode, level + 1 );
            }

            if (targetNode.data > currentNode.data) {
                return findDepth(currentNode.right, targetNode, level + 1);
            }
        };
        return findDepth(this.root, node);
    }

    isBalanced() {
        const checkBalance = (node) => {
            if (node === null) return true;

            const leftHeight = this.height(node.left);
            const rightHeight = this.height(node.right);

            return Math.abs(leftHeight - rightHeight) <= 1
                    && checkBalance(node.left)
                    && checkBalance(node.right)
        };
        return checkBalance(this.root);
    }

    rebalance() {
        const values = [];
        this.inOrder((node) => values.push(node.data));

        this.root = this.buildTree(values);
    }
}




export {Node, Tree};