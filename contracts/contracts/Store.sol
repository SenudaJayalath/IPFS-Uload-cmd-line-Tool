//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Store {
    //counter to keep track of number of files saved
    uint256 public newItemId = 0;

    struct Item {
        uint256 id;
        string cid;
    }
    mapping(uint256 => Item) public Items;
    event itemSaved(uint256 id);

    function storeCID(string memory cid) public {
        //Increment Counter
        newItemId++;
        //Save cid and its relevant id
        Items[newItemId] = Item(newItemId, cid);
        //emit event
        emit itemSaved(newItemId);
    }
}
