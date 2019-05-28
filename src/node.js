export class TreeNode {
    /**
     * @param {number} key 
     */
    constructor(key) {
        /** @type {number} */
        this.key = key;
        /** @type {TreeNode} */
        this.left = undefined;
        /** @type {TreeNode} */
        this.right = undefined;
    }
}