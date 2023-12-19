const mergeSort = require("./mergeSort");

const testArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 10];

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
    // this.array = arr;
    this.root = this.buildTree(arr);
    // this.count = 0;
  }
  buildTree(Inputarr = [], isLeft = false) {
    const arr = removeDuplicate(mergeSort(Inputarr));
    // console.log(arr);
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
  // prettyPrint() {
  // const print = (node) => {
  // if (node == null) {
  // return;
  // }
  // print(node.left);
  // print(node.right);

  // process.stdout.write(`${node.data}, `);
  // };
  // print(this.root);
  // process.stdout.write("\n");
  // }
  prettyPrint() {
    const prettyPrint = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
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
      // console.log(value < node.data);
      if (value < node.data) {
        console.log(node.data);
        if (node.left == null) {
          node.left = new Node(value);
        }
        node = node.left;
      } else if (value > node.data) {
        console.log(node.data);
        if (node.right == null) {
          node.right = new Node(value);
        }
        node = node.right;
      } else {
        return;
      }
    }
  }
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

function creatArray(n = 10, m = 5) {
  const newArray = [];
  for (let i = 0; i < n; i++) {
    newArray.push(Math.floor(Math.random() * m));
  }
  return newArray;
}

const newTestArray = creatArray(20, 20);
// const n1 = new Node(1);
const t1 = new Tree(testArray);
t1.prettyPrint();
t1.insert(11);
t1.insert(10);
t1.prettyPrint();
// console.log(t1.root);
// const res = t1.buildTree(newTestArray);
// console.log(newTestArray);
// console.log(res);
