const Tree = require("./main");

function creatArray(n = 10, m = 5) {
  const newArray = [];
  for (let i = 0; i < n; i++) {
    newArray.push(Math.floor(Math.random() * m));
  }
  return newArray;
}
const testArray = creatArray(10000, 100);
const unBalancer = (tree, number = 5, offset = 100) => {
  for (let i = 0; i < number; i++) {
    const value = Math.floor(Math.random() * offset + offset);
    tree.insert(value);
  }
};
// console.log(testArray);
const testFunction = (node) => {
  console.log(node.data);
};
const t1 = new Tree(testArray);
t1.prettyPrint();
console.log(`is it balanced ${t1.isBalanced()}`);
console.log(t1.levelOrder().map((val) => val.data));
console.log(t1.preOrder().map((val) => val.data));
console.log(t1.inOrder().map((val) => val.data));
console.log(t1.postOrder().map((val) => val.data));

unBalancer(t1, 100);
// t1.prettyPrint();
console.log(`\n\nafter unBalancing`);
console.log(`is it balanced ${t1.isBalanced()}`);
t1.reBalance();
// t1.prettyPrint();
console.log("\n\nafter reBalancing");
console.log(`is it balanced ${t1.isBalanced()}`);

console.log(t1.levelOrder().map((val) => val.data));
console.log(t1.preOrder().map((val) => val.data));
console.log(t1.inOrder().map((val) => val.data));
console.log(t1.postOrder().map((val) => val.data));
