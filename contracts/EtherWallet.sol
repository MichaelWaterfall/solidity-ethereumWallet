//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract EtherWallet {
    address payable public owner;

    struct Transaction {
        address to;
        uint amount;
    }

    Transaction[] public transactions;

    constructor(address payable _owner) {
        owner = _owner;
    }

    function balanceOf() view public returns (uint) {
        return address(this).balance;
    }

    function deposit() public payable {

    }

    function send(address payable to, uint amount) public {
        require(msg.sender == owner, 'Not owner');
        to.transfer(amount);
        transactions.push(Transaction(to, amount));
        return;
    }
 
    function getTransactions() view public returns (Transaction[] memory) {
        return transactions;
    }

    function createTransaction(uint amount) public {
        transactions.push(Transaction(owner, amount));
    }
}