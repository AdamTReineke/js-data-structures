import { TreeNode } from "./node";

/**
 * 
 * @param {TreeNode} root 
 * @param {number} needle 
 * @returns {TreeNode} Node with the maximum value smaller than or equal to `needle`.
 */
export function getNodeLessThanOrEqualTo(root, needle) {
    if (root.key === needle) {
        return root;
    }

    return getNodeLTEInternal(root, root.key < needle ? root.right : root.left, needle);
}

/**
 * 
 * @param {TreeNode} last 
 * @param {TreeNode} curr 
 * @param {number} needle 
 */
function getNodeLTEInternal(last, curr, needle) {
    var biggerThanLast = last.key > curr.key;

    // Arrived from upper left, needle will be lower left
    if(biggerThanLast && curr.key > needle) {

    }
}

/**
 * 
 * @param {TreeNode} root 
 * @returns {TreeNode} The max value node
 */
export function max(root) {
    if (root === undefined) {
        return undefined;
    }

    if (root.right === undefined) {
        return root;
    }

    return max(root.right);
}

/**
 * 
 * @param {TreeNode} root 
 * @param {number} value 
 */
export function remove(root, value) {
    if (root === undefined) {
        throw "The node must be defined";
    }

    return removeInternal(root, root, value);
}

/**
 * 
 * @param {TreeNode} realRoot 
 * @param {TreeNode} root 
 * @param {number} value 
 * @returns The node to replace the root.
 */
function removeInternal(realRoot, root, value) {
    // Special case: remove root
    if (realRoot.key === value) {
        throw "NYI - Remove Root";
    }

    // Go right
    if (root.key < value) {
        // No right, so nothing to remove
        if (root.right === undefined) {
            return realRoot;
        }

        // The right child has what we want, remove it.
        if (root.right.key === value) {
            root.right = getBstSubtreeWithoutRoot(root.right);
            return realRoot;
        }
    }

    // Go left
    if (root.key > value) {
        // No left, so nothing to remove
        if (root.left === undefined) {
            return realRoot;
        }

        // The left child has what we want, remove it.
        if (root.left.key === value) {
            root.left = getBstSubtreeWithoutRoot(root.left);
            return realRoot;
        }
    }


    return realRoot;
}

/**
 * 
 * @param {TreeNode} node
 * @returns {TreeNode}
 */
function getBstSubtreeWithoutRoot(node) {
    // No children, straight remove.
    if (node.left === undefined && node.right === undefined) {
        return undefined;
    }

    // Right node is defined
    if (node.left === undefined) {
        return node.right;
    }

    // Left node is defined
    if (node.right === undefined) {
        return node.left;
    }

    // Both defined.

    // Get the largest node in the left tree.
    // Make it's key the key of the root.
    // And remove that key from the left tree since it's now the root.
    var leftMax = max(node.left);
    node.key = leftMax.key;

    if (node.left.key === node.key) {
        node.left = node.left.left;
        return node;
    }
    else {
        return remove(node.left, node.key);
    }
}

/**
 * 
 * @param {TreeNode} node 
 */
function hasChildren(node) {
    return node.left !== undefined || node.right !== undefined;
}

/**
 * 
 * @param {TreeNode} root 
 * @param {number} value 
 */
export function insert(root, value) {
    if (root === undefined) {
        throw "The node must be defined";
    }

    // Key already in the tree
    if (root.key === value) {
        return;
    }

    if (root.key > value) {
        // Recurse left to insert
        if (root.left) {
            return insert(root.left, value);
        }

        // No left, so insert
        root.left = new TreeNode(value);
        return;
    }

    // Recurse right to insert
    if (root.key < value) {
        if (root.right) {
            return insert(root.right, value);
        }

        root.right = new TreeNode(value);
        return;
    }
}

/**
 * 
 * @param {TreeNode} haystack 
 * @param {number} needle
 * @returns {boolean}
 */
export function find(haystack, needle) {
    if (haystack === undefined)
        return false;

    if (haystack.key === needle)
        return true;

    if (haystack.key < needle)
        return find(haystack.right, needle);

    if (haystack.key > needle)
        return find(haystack.left, needle);
}

/**
 * @param {TreeNode} node 
 * @returns True, for an undefined node. True, if the thing is a BST. False if not.
 */
export function isBst(node) {
    return isBstInternal(node, -Number.MAX_VALUE, Number.MAX_VALUE);
}

/**
 * @param node {TreeNode}
 * @param minKey {number}
 * @param maxKey {number}
 * @returns True, for an undefined node. True, if the thing is a BST. False if not.
 */
function isBstInternal(node, minKey, maxKey) {
    if (node === undefined)
        return true;

    return node.key <= maxKey
        && node.key >= minKey
        && isBstInternal(node.left, minKey, node.key - 1)
        && isBstInternal(node.right, node.key + 1, maxKey);
}


