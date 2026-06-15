export const artifacts = {
  "ERC20": {
    "abi": [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_symbol",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_initialSupply",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "_recipient",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    "bytecode": "608060405234801561000f575f5ffd5b50604051610a27380380610a2783398101604081905261002e91610154565b5f6100398582610270565b5060016100468482610270565b5061005982670de0b6b3a764000061032e565b60028190556001600160a01b0382165f81815260036020908152604080832085905551938452919290917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a350505050610357565b634e487b7160e01b5f52604160045260245ffd5b5f82601f8301126100da575f5ffd5b81516001600160401b038111156100f3576100f36100b7565b604051601f8201601f19908116603f011681016001600160401b0381118282101715610121576101216100b7565b604052818152838201602001851015610138575f5ffd5b8160208501602083015e5f918101602001919091529392505050565b5f5f5f5f60808587031215610167575f5ffd5b84516001600160401b0381111561017c575f5ffd5b610188878288016100cb565b602087015190955090506001600160401b038111156101a5575f5ffd5b6101b1878288016100cb565b60408701516060880151919550935090506001600160a01b03811681146101d6575f5ffd5b939692955090935050565b600181811c908216806101f557607f821691505b60208210810361021357634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111561026b578282111561026b57805f5260205f20601f840160051c602085101561024457505f5b90810190601f840160051c035f5b81811015610267575f83820155600101610252565b5050505b505050565b81516001600160401b03811115610289576102896100b7565b61029d8161029784546101e1565b84610219565b6020601f8211600181146102cf575f83156102b85750848201515b5f19600385901b1c1916600184901b178455610327565b5f84815260208120601f198516915b828110156102fe57878501518255602094850194600190920191016102de565b508482101561031b57868401515f19600387901b60f8161c191681555b505060018360011b0184555b5050505050565b808202811582820484141761035157634e487b7160e01b5f52601160045260245ffd5b92915050565b6106c3806103645f395ff3fe608060405234801561000f575f5ffd5b5060043610610090575f3560e01c8063313ce56711610063578063313ce567146100ff57806370a082311461011957806395d89b4114610138578063a9059cbb14610140578063dd62ed3e14610153575f5ffd5b806306fdde0314610094578063095ea7b3146100b257806318160ddd146100d557806323b872dd146100ec575b5f5ffd5b61009c61017d565b6040516100a99190610518565b60405180910390f35b6100c56100c0366004610568565b610208565b60405190151581526020016100a9565b6100de60025481565b6040519081526020016100a9565b6100c56100fa366004610590565b610274565b610107601281565b60405160ff90911681526020016100a9565b6100de6101273660046105ca565b60036020525f908152604090205481565b61009c61042a565b6100c561014e366004610568565b610437565b6100de6101613660046105ea565b600460209081525f928352604080842090915290825290205481565b5f80546101899061061b565b80601f01602080910402602001604051908101604052809291908181526020018280546101b59061061b565b80156102005780601f106101d757610100808354040283529160200191610200565b820191905f5260205f20905b8154815290600101906020018083116101e357829003601f168201915b505050505081565b335f8181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906102629086815260200190565b60405180910390a35060015b92915050565b6001600160a01b0383165f908152600360205260408120548211156102d75760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b60448201526064015b60405180910390fd5b6001600160a01b0384165f9081526004602090815260408083203384529091529020548211156103425760405162461bcd60e51b8152602060048201526016602482015275496e73756666696369656e7420616c6c6f77616e636560501b60448201526064016102ce565b6001600160a01b0384165f9081526003602052604081208054849290610369908490610667565b90915550506001600160a01b0384165f908152600460209081526040808320338452909152812080548492906103a0908490610667565b90915550506001600160a01b0383165f90815260036020526040812080548492906103cc90849061067a565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161041891815260200190565b60405180910390a35060019392505050565b600180546101899061061b565b335f9081526003602052604081205482111561048c5760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b60448201526064016102ce565b335f90815260036020526040812080548492906104aa908490610667565b90915550506001600160a01b0383165f90815260036020526040812080548492906104d690849061067a565b90915550506040518281526001600160a01b0384169033907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610262565b602081525f82518060208401528060208501604085015e5f604082850101526040601f19601f83011684010191505092915050565b80356001600160a01b0381168114610563575f5ffd5b919050565b5f5f60408385031215610579575f5ffd5b6105828361054d565b946020939093013593505050565b5f5f5f606084860312156105a2575f5ffd5b6105ab8461054d565b92506105b96020850161054d565b929592945050506040919091013590565b5f602082840312156105da575f5ffd5b6105e38261054d565b9392505050565b5f5f604083850312156105fb575f5ffd5b6106048361054d565b91506106126020840161054d565b90509250929050565b600181811c9082168061062f57607f821691505b60208210810361064d57634e487b7160e01b5f52602260045260245ffd5b50919050565b634e487b7160e01b5f52601160045260245ffd5b8181038181111561026e5761026e610653565b8082018082111561026e5761026e61065356fea2646970667358221220d27ab2139da5b4157173f51ba5b9920fd423406504ad75540abe91daeb67635864736f6c63430008230033"
  },
  "ERC721": {
    "abi": [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_symbol",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_baseURI",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "_owner",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "ApprovalForAll",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "baseURI",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "getApproved",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "isApprovedForAll",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "mint",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "nextTokenId",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "ownerOf",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    "bytecode": "608060405234801561000f575f5ffd5b50604051610d97380380610d9783398101604081905261002e9161011a565b5f6100398582610258565b5060016100468482610258565b5060026100538382610258565b50600380546001600160a01b0319166001600160a01b039290921691909117905550610316915050565b634e487b7160e01b5f52604160045260245ffd5b5f82601f8301126100a0575f5ffd5b81516001600160401b038111156100b9576100b961007d565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100e7576100e761007d565b6040528181528382016020018510156100fe575f5ffd5b8160208501602083015e5f918101602001919091529392505050565b5f5f5f5f6080858703121561012d575f5ffd5b84516001600160401b03811115610142575f5ffd5b61014e87828801610091565b602087015190955090506001600160401b0381111561016b575f5ffd5b61017787828801610091565b604087015190945090506001600160401b03811115610194575f5ffd5b6101a087828801610091565b606087015190935090506001600160a01b03811681146101be575f5ffd5b939692955090935050565b600181811c908216806101dd57607f821691505b6020821081036101fb57634e487b7160e01b5f52602260045260245ffd5b50919050565b601f821115610253578282111561025357805f5260205f20601f840160051c602085101561022c57505f5b90810190601f840160051c035f5b8181101561024f575f8382015560010161023a565b5050505b505050565b81516001600160401b038111156102715761027161007d565b6102858161027f84546101c9565b84610201565b6020601f8211600181146102b7575f83156102a05750848201515b5f19600385901b1c1916600184901b17845561030f565b5f84815260208120601f198516915b828110156102e657878501518255602094850194600190920191016102c6565b508482101561030357868401515f19600387901b60f8161c191681555b505060018360011b0184555b5050505050565b610a74806103235f395ff3fe608060405234801561000f575f5ffd5b50600436106100f0575f3560e01c80636c0360eb1161009357806395d89b411161006357806395d89b4114610219578063a22cb46514610221578063b88d4fde14610234578063e985e9c514610247575f5ffd5b80636c0360eb146101d657806370a08231146101de57806375794a3c146101fd5780638da5cb5b14610206575f5ffd5b806323b872dd116100ce57806323b872dd1461016757806342842e0e1461017a5780636352211e1461018d5780636a627842146101b5575f5ffd5b806306fdde03146100f4578063081812fc14610112578063095ea7b314610152575b5f5ffd5b6100fc610284565b6040516101099190610781565b60405180910390f35b61013a6101203660046107b6565b60076020525f90815260409020546001600160a01b031681565b6040516001600160a01b039091168152602001610109565b6101656101603660046107e8565b61030f565b005b610165610175366004610810565b6103f3565b610165610188366004610810565b6105f1565b61013a61019b3660046107b6565b60056020525f90815260409020546001600160a01b031681565b6101c86101c336600461084a565b610601565b604051908152602001610109565b6100fc6106eb565b6101c86101ec36600461084a565b60066020525f908152604090205481565b6101c860045481565b60035461013a906001600160a01b031681565b6100fc6106f8565b61016561022f36600461086a565b610705565b6101656102423660046108b7565b610770565b610274610255366004610994565b600860209081525f928352604080842090915290825290205460ff1681565b6040519015158152602001610109565b5f8054610290906109c5565b80601f01602080910402602001604051908101604052809291908181526020018280546102bc906109c5565b80156103075780601f106102de57610100808354040283529160200191610307565b820191905f5260205f20905b8154815290600101906020018083116102ea57829003601f168201915b505050505081565b5f818152600560205260409020546001600160a01b03163381148061035657506001600160a01b0381165f90815260086020908152604080832033845290915290205460ff165b6103985760405162461bcd60e51b815260206004820152600e60248201526d139bdd08185d5d1a1bdc9a5e995960921b60448201526064015b60405180910390fd5b5f8281526007602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b5f818152600560205260409020546001600160a01b038481169116146104475760405162461bcd60e51b81526020600482015260096024820152682737ba1037bbb732b960b91b604482015260640161038f565b6001600160a01b0382166104915760405162461bcd60e51b8152602060048201526011602482015270125b9d985b1a59081c9958da5c1a595b9d607a1b604482015260640161038f565b5f336001600160a01b03851614806104be57505f828152600760205260409020546001600160a01b031633145b806104eb57506001600160a01b0384165f90815260086020908152604080832033845290915290205460ff165b90508061052b5760405162461bcd60e51b815260206004820152600e60248201526d139bdd08185d5d1a1bdc9a5e995960921b604482015260640161038f565b5f82815260076020908152604080832080546001600160a01b03191690556001600160a01b03871683526006909152812080549161056883610a11565b90915550506001600160a01b0383165f90815260066020526040812080549161059083610a26565b90915550505f8281526005602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918816917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a450505050565b6105fc8383836103f3565b505050565b6003545f906001600160a01b031633146106535760405162461bcd60e51b815260206004820152601360248201527213db9b1e481bdddb995c8818d85b881b5a5b9d606a1b604482015260640161038f565b600480549081905f61066483610a26565b90915550506001600160a01b0383165f90815260066020526040812080549161068c83610a26565b90915550505f8181526005602052604080822080546001600160a01b0319166001600160a01b03871690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a492915050565b60028054610290906109c5565b60018054610290906109c5565b335f8181526008602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b61077b8484846103f3565b50505050565b602081525f82518060208401528060208501604085015e5f604082850101526040601f19601f83011684010191505092915050565b5f602082840312156107c6575f5ffd5b5035919050565b80356001600160a01b03811681146107e3575f5ffd5b919050565b5f5f604083850312156107f9575f5ffd5b610802836107cd565b946020939093013593505050565b5f5f5f60608486031215610822575f5ffd5b61082b846107cd565b9250610839602085016107cd565b929592945050506040919091013590565b5f6020828403121561085a575f5ffd5b610863826107cd565b9392505050565b5f5f6040838503121561087b575f5ffd5b610884836107cd565b915060208301358015158114610898575f5ffd5b809150509250929050565b634e487b7160e01b5f52604160045260245ffd5b5f5f5f5f608085870312156108ca575f5ffd5b6108d3856107cd565b93506108e1602086016107cd565b925060408501359150606085013567ffffffffffffffff811115610903575f5ffd5b8501601f81018713610913575f5ffd5b803567ffffffffffffffff81111561092d5761092d6108a3565b604051601f8201601f19908116603f0116810167ffffffffffffffff8111828210171561095c5761095c6108a3565b604052818152828201602001891015610973575f5ffd5b816020840160208301375f6020838301015280935050505092959194509250565b5f5f604083850312156109a5575f5ffd5b6109ae836107cd565b91506109bc602084016107cd565b90509250929050565b600181811c908216806109d957607f821691505b6020821081036109f757634e487b7160e01b5f52602260045260245ffd5b50919050565b634e487b7160e01b5f52601160045260245ffd5b5f81610a1f57610a1f6109fd565b505f190190565b5f60018201610a3757610a376109fd565b506001019056fea26469706673582212208cf149390c0922380d9cc519f6ee7c45dc15d400677bad542b9f74e7c29fb7bc64736f6c63430008230033"
  }
};
