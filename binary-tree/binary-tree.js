'use strict';

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(data) {
		var root = this.root;
		if (!root) {	//first node
			this.root = new Node(data);
			return;
		}

		var curNode = root,
			newNode = new Node(data);
		while(true) {
			if (data < curNode.data) {
				if (!curNode.left){
					curNode.left = newNode;
					break;
				}
				curNode = curNode.left; //continue go down the tree (on the left side)
			} else {
				if (!curNode.right) {
					curNode.right = newNode;
					break;
				}
				curNode = curNode.right;//continue go down the tree (on the right side)
			}
		}
	}

	contains(data) {
		var curNode = this.root;

		if (!curNode) {	//tree is empty
			return false;
		}

		while (curNode != null) {
			if (data < curNode.data) {
				curNode = curNode.left;
				continue;
			} else if ( data > curNode.data) {
				curNode = curNode.right;
				continue;
			}
			return true;
		}

		return false;
	}

	remove(data) {
		var currentNode = this.root;
		if (!this.contains(data)) {	//node not found or tree is empty
			return;
		}

		var parent,
			childrenCount,
			replaceNode;
		while (true) {	//find parent of removing element
			if (data < currentNode.data) {
				parent = currentNode;
				currentNode = currentNode.left;
			} else if (data > currentNode.data) {
				parent = currentNode;
				currentNode = currentNode.right;
			} else break;	//except case when root is removing element
		}
		childrenCount = (!currentNode.left ? 0 : 1) + (!currentNode.right ? 0 : 1);
		if (!parent) {	//root is removing element
			if (childrenCount === 0) {
				this.root = null;
			} else if (childrenCount === 1) {
				if (!currentNode.left) {
					this.root =  currentNode.right;
				} else this.root = currentNode.left;
			} else {
				currentNode = this.root.left;
				replaceNode = currentNode.right;
				while (true) {
					if (replaceNode.right) {
						currentNode = replaceNode;
						replaceNode = replaceNode.right;
					} else break;
				}
				replaceNode.right = this.root.right;
				this.root = currentNode;
			}
			return;
		}
		switch(childrenCount) {
			case 0:
				if (currentNode.data < parent.data)
					parent.left = null;
				else
					parent.right = null;
				break;
			case 1:
				if (currentNode.data < parent.data) {
					if (!currentNode.right)
						currentNode = currentNode.left;
					else
						currentNode = currentNode.right;
					parent.left = currentNode;
				} else {
					if (!currentNode.right)
						currentNode = currentNode.left;
					else
						currentNode = currentNode.right;
					parent.right = currentNode;
				}
				break;
			default:
				replaceNode = currentNode.right;
				while (replaceNode.right) {
					replaceNode = replaceNode.right;
				}
				replaceNode.left = currentNode.left;
				currentNode = replaceNode;
				this.root.right = replaceNode;
		}
	}


	size() {
		console.log('end');
		return this.findCount(this.root);
	}

	findCount(curRoot) {
		var count = 0;

		if (curRoot) {
			console.log('Root '+ curRoot.data);
			if (curRoot.left) console.log('Left '+ curRoot.left.data);
			if (curRoot.right) console.log('Right '+ curRoot.right.data);

			count = 1 + this.findCount(curRoot.left) + this.findCount(curRoot.right);
		}

		return count;
	}

	isEmpty() {
		return this.root === null;
	}
}
