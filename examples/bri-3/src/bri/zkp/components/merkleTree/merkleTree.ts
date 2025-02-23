import { PreciseProofs } from 'ew-precise-proofs-js';
export class MerkleTree {
  private _leaves: PreciseProofs.Leaf[] = [];
  private _root: string;

  constructor(document: any) {
    this.initTree(document);
  }

  private initTree(document: any) {
    try {
      if (!document) {
        return;
      }
      this._leaves = PreciseProofs.createLeafs(document);
      const merkleTree = PreciseProofs.createMerkleTree(
        this._leaves.map((leaf: PreciseProofs.Leaf) => leaf.hash),
      );
      this._root = PreciseProofs.getRootHash(merkleTree);
    } catch (e) {
      //TODO Refactor to integrate nestjs
      console.log(`Init merkle tree error: ${e}`);
    }
  }

  get leaves() {
    return this._leaves;
  }

  get root() {
    return this._root;
  }
}
