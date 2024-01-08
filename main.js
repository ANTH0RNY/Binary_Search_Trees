const mergeSort = require("./mergeSort");

const testArray = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
]; // 10];

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
  createChild(node) {
    if (node.data < this.data) {
      this.left = node;
    } else {
      this.right = node;
    }
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }
  buildTree(Inputarr = [], isLeft = false) {
    const arr = removeDuplicate(mergeSort(Inputarr));
    if (arr.length == 1) {
      return new Node(arr[0]);
    }
    if (arr.length == 2) {
      const n1 = new Node(arr[1]);
      const n2 = new Node(arr[0]);
      if (isLeft) {
        n1.createChild(n2);
        return n1;
      }
      n2.createChild(n1);
      return n2;
    }

    const mid = Math.round(arr.length / 2);
    const midElement = arr[mid - 1];
    const leftArray = arr.slice(0, mid - 1);
    const rightArray = arr.slice(mid, arr.length);

    const node = new Node(arr[mid - 1]);

    node.left = this.buildTree(leftArray, true);
    node.right = this.buildTree(rightArray);
    return node;
  }

  prettyPrint() {
    const prettyPrint = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        // console.log(node);
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };
    prettyPrint(this.root);
  }

  insert(value) {
    let node = this.root;
    while (node != null) {
      if (value < node.data) {
        if (node.left == null) {
          node.left = new Node(value);
          return;
        }
        node = node.left;
      } else if (value > node.data) {
        if (node.right == null) {
          node.right = new Node(value);
          return;
        }
        node = node.right;
      } else {
        return;
      }
    }
  }

  delete(value) {
    let prev = null;
    let now = this.root;
    console.log("\n");
    console.log(`Given value is ${value}`);
    const removeNode = (value, now, prev) => {
      if (now === null) {
        return;
      }
      if (value == now.data) {
        if (now.left === null && now.right === null) {
          if (value < prev.data) {
            prev.left = null;
            this.prettyPrint();
            return now;
          }
          if (value > prev.data) {
            prev.right = null;
            this.prettyPrint();
            return now;
          }
        }
        //if has one child
        else if (now.left === null || now.left === null) {
          if (now.left !== null) {
            if (value < prev.data) {
              prev.left = now.left;
              return now;
            }

            prev.right = now.left;
            return now;
          }

          if (value < prev.data) {
            prev.left = now.right;
            return now;
          }

          prev.right = now.right;
          return now;
        }
        // if now has both children
        else if (now.right !== null && now.left !== null) {
          let current = now.right;
          let past = now;
          while (current.left !== null) {
            past = current;
            current = current.left;
          }

          if (current.left === null && current.right === null) {
            if (past.data === now.data) {
              current.left = now.left;
              if (current.data < prev.data) {
                prev.left = current;
                return now;
              }
              prev.right = current;
              return now;
            }
            replace(prev, now, current);
            past.left = null;
            return now;
          }

          if (now.data === past.data) {
            current.left = now.left;
            if (current.data < prev.data) {
              prev.left = current;
              return now;
            }
            prev.right = current;

            return now;
          }
          past.left = current.right;
          replace(prev, now, current);
          return now;
        }
        return;
      } else if (value < now.data) {
        removeNode(value, now.left, now);
      } else if (value > now.data) {
        removeNode(value, now.right, now);
      }
    };
    removeNode(value, now, now);
  }
  find(value) {
    function findNode(value, node) {
      if (node === null) {
        return null;
      }
      if (value === node.data) {
        return node;
      }

      return value < node.data
        ? findNode(value, node.left)
        : findNode(value, node.right);
    }

    return findNode(value, this.root);
  }

  levelOrder(callBack) {
    const queue = [this.root];
    const array = [];
    function traversal() {
      if (queue.length !== 0) {
        const node = queue.shift();
        // callBack(node);
        array.push(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        traversal();
      }
    }
    traversal();
    if (callBack === undefined) return array;
    array.forEach(callBack);
  }
  preOrder(callBack) {
    const nodes = [];
    const root = this.root;

    function preoder(root) {
      if (root === null) return;

      nodes.push(root);
      preoder(root.left);
      preoder(root.right);
    }
    preoder(root);

    if (callBack === undefined) return nodes;
    nodes.forEach(callBack);
  }

  inOrder(callBack) {
    const nodes = [];

    function inorder(root) {
      if (root === null) return;
      inorder(root.left);
      nodes.push(root);
      inorder(root.right);
    }
    inorder(this.root);

    if (callBack === undefined) return nodes;
    nodes.forEach(callBack);
  }

  postOrder(callBack) {
    const nodes = [];

    function postorder(root) {
      if (root === null) return;
      postorder(root.left);
      postorder(root.right);
      nodes.push(root);
    }
    postorder(this.root);

    if (callBack === undefined) return nodes;
    nodes.forEach(callBack);
  }
  height(node) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  }
  depth(node) {
    function nodeDepth(root) {
      // console.log(root.data);
      if (root === null || node === null) return null;
      if (node.data === root.data) {
        return 0;
      }
      const height =
        node.data > root.data ? nodeDepth(root.right) : nodeDepth(root.left);

      return height === null ? null : height + 1;
    }
    const height = nodeDepth(this.root);
    return height == null ? 0 : height;
  }
  isBalanced() {
    const checkBalanced = (root) => {
      if (root === null) {
        return true;
      }
      const leftHeight = this.height(root.left);
      const rightHeight = this.height(root.right);
      if (Math.abs(leftHeight - rightHeight) > 1) return false;

      return checkBalanced(root.left) && checkBalanced(root.right);
    };
    return checkBalanced(this.root);
  }
  reBalance() {
    const newArray = this.inOrder().map((val) => val.data);
    // console.log(newArray);
    this.root = this.buildTree(newArray);
  }
}

function replace(parent, node, newNode) {
  newNode.left = node.left;
  newNode.right = node.right;

  if (newNode.data < parent.data) {
    parent.left = newNode;
    return node;
  }
  parent.right = newNode;
  return node;
}

function removeDuplicate(arr = []) {
  const newArray = [];
  for (let i in arr) {
    if (newArray[newArray.length - 1] !== arr[i]) {
      newArray.push(arr[i]);
    }
  }
  return newArray;
}

module.exports = Tree;
