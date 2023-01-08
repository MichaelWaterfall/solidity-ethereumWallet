
let contractAbi = [
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_owner",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "transactions",
    "outputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "send",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTransactions",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "internalType": "struct EtherWallet.Transaction[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "createTransaction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
let contractAddress = '0x58ce59853F0Bb8bF96f3Bc4A21609AC04692e341';
//const Web3 = require('web3');
let web3 = new Web3('http://127.0.0.1:9545/');


let etherWalletContract = new web3.eth.Contract(contractAbi, contractAddress);

//let transactionAddresses = [];
//let transactionAmount = [];

const initializeWeb3 = () => {
    return new Promise((resolve, reject) => {
        if(typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum)
            window.ethereum.enable()
                .then(() => {
                    resolve(
                        new Web3(window.ethereum)
                    );
                })
                .catch(error => {
                    reject(error);
                });
                return;
        }
        if(typeof window.web3 !== 'undefined') {
            return resolve(
                new Web3(window.web3.currentProvider)
            );
        }
    })
}

const initializeContract = () => {
    return new web3.eth.Contract(contractAbi, contractAddress);
};

const initializeApp = async () => {
    const $options = document.getElementById('options');
    const $balance = document.getElementById('balance');
    //const $deposit = document.getElementById('deposit');
    //const $depositButton = document.getElementById('deposit-button');
    
    const $depositResult = document.getElementById('deposit-result');
    const $depositAmount = document.getElementById('deposit-amount');

    const $from = document.getElementById('from');
    const $send = document.getElementById('send');
    const $sendButton = document.getElementById('send-button');
    const $sendAmount = document.getElementById('send-amount');
    const $sendAddress = document.getElementById('send-address');

    const $box = document.getElementById('box-div');
    

    let accounts = [];

    //let balance = await web3.eth.getBalance();

    web3.eth.getAccounts()
        .then(_accounts => {
            accounts = _accounts;
            
            $from.innerHTML = accounts;
            $send.innerHTML = contractAddress;
            
        });

   

   const refreshBalance = () => {
      etherWalletContract.methods
        .balanceOf()
        .call()
        .then(result => {
          $balance.innerHTML = `ETH: ${(result / 1000000000000000000).toFixed(1)}`;
          
          //console.log(`${result} ETH added to balance`);
          
        })
        .catch(error => {
          console.log(error);
        })
      etherWalletContract.methods
        .getTransactions()
        .call()
        .then(result => {
          console.log(result);
          let newResult = result.map(function(el){
            return el.to;
          });
          //console.log(newResult.reverse());
          newResult = newResult.reverse();
          console.log(result);
          let ethResult = result.map(function(el){
            return el.amount;
          })
          ethResult = ethResult.reverse();
          console.log(ethResult);
          //I wanted to reverse the array so that the newest transaction is show at the top because the 
          //newest transaction is added to the end of the array
          //result is an object array which can not be reversed so I had to convert the result array
          //into a string array I did this by mapping and returning two new arrays one for the address
          //and another for the amount. Now the transaction list and show the latest transaction at the top

          for (let i = 0; i < 10; i++) {
            
            //box
            const newDiv = document.createElement("div");
            newDiv.classList.add('transactions');
            $box.appendChild(newDiv);
            //a
            const newA = document.createElement("a");
            newA.classList.add('item');
            newDiv.appendChild(newA);
            //div for address
            const divAddress = document.createElement("div");
            divAddress.id = "transaction";
            divAddress.classList.add("detail");
            newA.appendChild(divAddress);
            //strong
            const newStrong = document.createElement("strong");
            divAddress.appendChild(newStrong);
            newStrong.innerHTML = newResult[i];
            //paragraph
            const newP = document.createElement("p");
            newStrong.appendChild(newP);
            newP.innerHTML = 'Address';
            //right div
            const newRight = document.createElement("div");
            newRight.classList.add("right");
            newA.appendChild(newRight);
            //price
            const newPrice = document.createElement("div");
            newPrice.id = "transaction-amount";
            newPrice.classList.add("new-price");
            //newPrice.classList.add("price text-danger");
            if(newResult[i] === accounts[0]) {
              newPrice.innerHTML = `ETH: +${(ethResult[i] / 1000000000000000000).toFixed(1)}`;
              newPrice.style.color = "green";
              newRight.appendChild(newPrice);
              newP.innerHTML = 'Deposited From';
            } else {
              newPrice.innerHTML = `ETH: -${(ethResult[i] / 1000000000000000000).toFixed(1)}`;
              newPrice.style.color = "red";
              newRight.appendChild(newPrice);
              newP.innerHTML = 'Sent To';
            }
            
          }
          
        })
        .catch(error => {
          console.log(error);
        })
   }     
   refreshBalance();
    
   $depositResult.addEventListener('click', (e) => {
    console.log("test deposit");
    e.preventDefault();
    const amount = ($depositAmount.value) * 1000000000000000000;
    etherWalletContract.methods
      .deposit()
      .send({from: accounts[0], value: amount})
      .then(result => {
        console.log(result);
        refreshBalance();
        
      })
      .catch(_e => {
        console.log(e);
      });
    etherWalletContract.methods 
      .createTransaction(web3.utils.toBN(amount))
      .send({from: accounts[0]})
      .then(result => {
        location.reload();  
        console.log("test create");
      })
      .catch(error => {
        console.log(error);
      })
  });

    $sendButton.addEventListener('click', (e) => {
      console.log("test send");
      e.preventDefault();
      const to = $sendAddress.value;
      const amount = ($sendAmount.value) * 1000000000000000000;
      etherWalletContract.methods
        .send(to, web3.utils.toBN(amount))
        .send({from: accounts[0]})
        .then(result => {
          refreshBalance();
          location.reload();
        })
        .catch(error => {
          console.log(error);
        })
    })

  
}

/*const transaction = (address, amount) => {
  console.log("transaction");
  console.log(address, amount);
  const $box = document.getElementById('box-div');
  const $transaction = document.getElementById('transaction');
  const $transactionAmount = document.getElementById('transaction-amount');
  let box = document.createElement("div");
  let strong = document.createElement("strong");
  let div = document.createElement("div");
  strong.innerText = address;
  div.innerHTML = amount / 1000000000000000000;
  $box.appendChild(box);
  $transaction.appendChild(strong);
  $transactionAmount.appendChild(div);
}
*/

document.addEventListener('DOMContentLoaded', () => {
    initializeWeb3()
        .then(_web3 => {
            web3 = _web3;
            return initializeContract();
        })
        .then(_etherWalletContract => {
            etherWalletContract = _etherWalletContract;
            initializeApp();
        })
        .catch(error => console.log(error.message));
})

