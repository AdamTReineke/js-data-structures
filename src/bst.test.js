import { TreeNode } from "./node";
import { find, isBst, insert, remove, max } from "./bst";

describe("find", () => {
    it("returns false when the node is null", () => {
        expect(find(undefined, 0)).toBe(false);
    });

    it("returns true when the node has the expected value", () => {
        var root = new TreeNode(5);
        expect(find(root, 5)).toBe(true);
    });

    it("returns false when there is no child and the next node would be smaller", () => {
        var root = new TreeNode(5);
        expect(find(root, 0)).toBe(false);
    });

    it("returns false when there is no child and the next node would be larger", () => {
        var root = new TreeNode(5);
        expect(find(root, 10)).toBe(false);
    });

    it("returns true when there is a child and the next node would be smaller", () => {
        var root = new TreeNode(5);
        var leaf = new TreeNode(0);
        root.left = leaf;

        expect(find(root, 0)).toBe(true);
    });

    it("returns true when there is a child and the next node would be larger", () => {
        var root = new TreeNode(5);
        var leaf = new TreeNode(10);
        root.right = leaf;

        expect(find(root, 10)).toBe(true);
    });

});

describe("isBst", () => {

    it("returns false when the tree is wrong", () => {
        var tn05 = new TreeNode(5);
        var tn10 = new TreeNode(10);
        var tn20 = new TreeNode(20);
        var tn30 = new TreeNode(30);
        var tn40 = new TreeNode(40);

        tn20.left = tn10;
        tn20.right = tn30;

        tn30.left = tn05;
        tn30.right = tn40;

        expect(isBst(tn20)).toBe(false);
    });

    it("returns true for an empty list", () => {
        expect(isBst(undefined)).toBe(true);
    })

    it("returns true for a tree with only a root node", () => {
        var root = new TreeNode(5);
        expect(isBst(root)).toBe(true);
    });

    it("returns true for a tree with only smaller left node", () => {
        var root = new TreeNode(10);
        var leaf = new TreeNode(5);
        root.left = leaf;
        expect(isBst(root)).toBe(true);
    });

    it("returns false for a tree with a larger left node", () => {
        var root = new TreeNode(5);
        var leaf = new TreeNode(10);
        root.left = leaf;
        expect(isBst(root)).toBe(false);
    });

    it("returns true for a tree with only larger right node", () => {
        var root = new TreeNode(5);
        var leaf = new TreeNode(10);
        root.right = leaf;
        expect(isBst(leaf)).toBe(true);
    });

    it("returns false for a tree with a smaller right node", () => {
        var root = new TreeNode(10);
        var leaf = new TreeNode(5);
        root.right = leaf;
        expect(isBst(root)).toBe(false);
    });


    it("zero is a very valid key", () => {
        var root = JSON.parse(`{"key":564,"left":{"key":181,"left":{"key":153,"left":{"key":0}},"right":{"key":395,"left":{"key":192,"right":{"key":282}},"right":{"key":503,"left":{"key":432,"right":{"key":484}},"right":{"key":554,"left":{"key":542,"left":{"key":531}}}}}},"right":{"key":770,"left":{"key":768,"left":{"key":703}},"right":{"key":839,"left":{"key":807},"right":{"key":912,"left":{"key":910}}}}}`);
        expect(isBst(root)).toBe(true);
    });
});

describe("insert", () => {
    it("creates a new node to the left when adding a smaller value to a node with no children", () => {
        var root = new TreeNode(10);
        insert(root, 0);

        expect(root.left).toBeDefined();
        expect(root.left.key).toEqual(0);
    });

    it("creates a new node to the right when adding a larger value to a node with no children", () => {
        var root = new TreeNode(10);
        insert(root, 20);

        expect(root.right).toBeDefined();
        expect(root.right.key).toEqual(20);
    });

    it("does nothing if the value to be added is at the root", () => {
        var root = new TreeNode(10);
        insert(root, 10);

        expect(root.left).toBeUndefined();
        expect(root.right).toBeUndefined();
        expect(root.key).toEqual(10);
    });

    it("does nothing if the value to be added exists and is left", () => {
        var root = new TreeNode(10);
        var leaf = new TreeNode(5);
        root.left = leaf;
        insert(root, 5);

        expect(root.right).toBeUndefined();
        expect(root.left).toBeDefined();
        expect(root.left.key).toEqual(5);
        expect(root.left.left).toBeUndefined();
        expect(root.left.right).toBeUndefined();
    });

    it("does nothing if the value to be added exists and is right", () => {
        var root = new TreeNode(10);
        var leaf = new TreeNode(15);
        root.right = leaf;
        insert(root, 15);

        expect(root.left).toBeUndefined();
        expect(root.right).toBeDefined();
        expect(root.right.key).toEqual(15);
        expect(root.right.left).toBeUndefined();
        expect(root.right.right).toBeUndefined();
    });

    it("(100x) maintains a valid BST when adding random values", () => {
        var root;
        for(var runs = 0; runs < 100; runs++) {
            root = new TreeNode(Math.floor(Math.random() * 1000));

            for (var i = 0; i < 1000; i++) {
                var toInsert = Math.floor(Math.random() * 1000);
                insert(root, toInsert);
                // var wasBst = isBst(root);
                // if(!wasBst) {
                //     console.log(toInsert, JSON.stringify(root));
                // }
                // expect(wasBst).toBe(true);
            }
            expect(isBst(root)).toBe(true);
            root = undefined;
        }
    });
});

describe("delete", () => {
    it("does nothing for a missing left node", () => {
        var root = new TreeNode(10);

        root = remove(root, 5);

        expect(root.key).toEqual(10);
        expect(root.left).toBeUndefined();
        expect(root.right).toBeUndefined();
    });

    it("does nothing for a missing left node", () => {
        var root = new TreeNode(10);

        root = remove(root, 15);

        expect(root.key).toEqual(10);
        expect(root.left).toBeUndefined();
        expect(root.right).toBeUndefined();
    });

    it("removes an empty left child", () => {
        var root = new TreeNode(10);
        var leftLeaf = new TreeNode(5);
        root.left = leftLeaf;

        root = remove(root, 5);

        expect(root.key).toBe(10);
        expect(root.left).toBeUndefined();
        expect(root.right).toBeUndefined();
    });

    it("removes an empty right child", () => {
        var root = new TreeNode(10);
        var rightLeaf = new TreeNode(15);
        root.right = rightLeaf;

        root = remove(root, 15);

        expect(root.key).toBe(10);
        expect(root.left).toBeUndefined();
        expect(root.right).toBeUndefined();
    });

    it("removes a left child with one leaf", () => {
        var root = new TreeNode(10);
        var left = new TreeNode(5);
        var leaf = new TreeNode(8);
        root.left = left;
        left.right = leaf;

        root = remove(root, 5);

        expect(root.key).toBe(10);
        expect(root.left).toBeDefined();
        expect(root.left.key).toBe(8);
        expect(root.right).toBeUndefined();
    });

    it("removes a right child with one leaf", () => {
        var root = new TreeNode(10);
        var right = new TreeNode(15);
        var leaf = new TreeNode(12);
        root.right = right;
        right.left = leaf;

        root = remove(root, 15);

        expect(root.key).toBe(10);
        expect(root.right).toBeDefined();
        expect(root.right.key).toBe(12);
        expect(root.left).toBeUndefined();

    });

    it("removes a full left child", () => {
        // Arrange
        var root = new TreeNode(10);
        var left = new TreeNode(5);
        var leftLeftLeaf = new TreeNode(2);
        var leftRightLeaf = new TreeNode(8);
        root.left = left;
        left.left = leftLeftLeaf;
        left.right = leftRightLeaf;

        // Sanity check our tree
        expect(isBst(root)).toBe(true);
        expect(find(root, 5)).toBe(true);

        // Act
        root = remove(root, 5);

        // Assert
        expect(isBst(root)).toBe(true);
        expect(find(root, 5)).toBe(false);
        expect(find(root, 2)).toBe(true);
        expect(find(root, 8)).toBe(true);
    });

    it("removes a full right child", () => {
        // Arrange
        var root = new TreeNode(10);
        var right = new TreeNode(20);
        var rightLeftLeaf = new TreeNode(15);
        var rightRightLeaf = new TreeNode(25);
        root.right = right;
        right.left = rightLeftLeaf;
        right.right = rightRightLeaf;

        // Sanity check our tree
        expect(isBst(root)).toBe(true);
        expect(find(root, 20)).toBe(true);

        // Act
        root = remove(root, 20);

        // Assert
        expect(isBst(root)).toBe(true);
        expect(find(root, 20)).toBe(false);
        expect(find(root, 15)).toBe(true);
        expect(find(root, 25)).toBe(true);
    });
});

describe("max", () => {
    it("returns undefined for an empty root", () => {
        expect(max(undefined)).toBeUndefined();
    });

    it("returns the root for no children", () => {
        var root = new TreeNode(10);
        expect(max(root).key).toBe(10);
    });

    it("follows the right to a leaf", () => {
        // Arrange
        var root = new TreeNode(10);
        var right = new TreeNode(20);
        var rightLeftLeaf = new TreeNode(15);
        var rightRightLeaf = new TreeNode(25);
        root.right = right;
        right.left = rightLeftLeaf;
        right.right = rightRightLeaf;

        expect(max(root).key).toBe(25);
    });

    it("follows the right until there is no right", () => {
        // Arrange
        var root = new TreeNode(10);
        var right = new TreeNode(20);
        var rightLeftLeaf = new TreeNode(15);
        root.right = right;
        right.left = rightLeftLeaf;

        expect(max(root).key).toBe(20);
    });

    it("(100x) returns the max after adding 1000 random nodes", () => {
        for(var runs = 0; runs < 100; runs++) {
            var maxVal = Math.floor(Math.random() * 1000);
            var root = new TreeNode(maxVal);
    
            for (var i = 0; i < 1000; i++) {
                var val = Math.floor(Math.random() * 1000);
                insert(root, val);
    
                maxVal = Math.max(val, maxVal);
            }
    
            expect(max(root).key).toBe(maxVal);
        }
    });
});
