import { Tree } from "./balancedBst.js";


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
 
function generateRandomArray(size, max) {
    return Array.from({length: size }, () => Math.floor(Math.random() * max));
}

// Helper function to print all traversals
function printTraversals(tree) {
    console.log("\nLevel Order:");
    tree.levelOrder((node) => process.stdout.write(node.data + " "));

    console.log("\n\nPre Order:");
    tree.preOrder((node) => process.stdout.write(node.data + " "));

    console.log("\n\nPost Order:");
    tree.postOrder((node) => process.stdout.write(node.data + " "));

    console.log("\n\nIn Order:");
    tree.inOrder((node) => process.stdout.write(node.data + " "));
    console.log("\n");
}


console.log("1. Creating a Binary Search Tree from random numbers...");
const randomArray = generateRandomArray(10, 100);
const tree = new Tree(randomArray);

console.log("Initial array:", randomArray);
console.log("\nTree structure:");
prettyPrint(tree.root);

console.log("\n2. Checking if tree is balanced...");
console.log("Is balanced:", tree.isBalanced());

console.log("\n3. Printing all elements:");
printTraversals(tree);

console.log("4. Unbalancing tree by adding numbers > 100...");
tree.insert(100);
tree.insert(500);
tree.insert(600);
tree.insert(700);
tree.insert(800);
console.log("\nTree structure after adding large numbers:");
prettyPrint(tree.root);

console.log("\n5. Checking if tree is now unbalanced...");
console.log("Is balanced:", tree.isBalanced());

console.log("\n6. Rebalancing tree...");
tree.rebalance();
console.log("\nTree structure after rebalancing:");
prettyPrint(tree.root);

console.log("\n7. Confirming tree is balanced again...");
console.log("Is balanced:", tree.isBalanced());

console.log("\n8. Printing all elements of the balanced tree:");
printTraversals(tree);