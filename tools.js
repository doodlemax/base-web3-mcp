import { createPublicClient, http, fallback, parseEther, encodeFunctionData, encodeDeployData, parseUnits, namehash } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { artifacts } from './contract_artifacts.js';
const DEFAULT_BUILDER_CODE = (typeof process !== 'undefined' && process.env?.BASE_BUILDER_CODE) || 'bc_3nsmabm6';

// Pure JS implementation of ERC-8021 builder code suffix generation
// Avoids fs/path imports for Cloudflare Workers compatibility
export function getSuffix(code = DEFAULT_BUILDER_CODE) {
  const targetCode = code || DEFAULT_BUILDER_CODE;
  let codeHex = '';
  for (let i = 0; i < targetCode.length; i++) {
    codeHex += targetCode.charCodeAt(i).toString(16).padStart(2, '0');
  }
  const lenHex = targetCode.length.toString(16).padStart(2, '0');
  const formatHex = '00';
  const markerHex = '80218021802180218021802180218021';
  return '0x' + codeHex + lenHex + formatHex + markerHex;
}

export function appendAttribution(calldata, code) {
  let cleanCalldata = calldata || '0x';
  if (!cleanCalldata.startsWith('0x')) {
    cleanCalldata = '0x' + cleanCalldata;
  }
  const suffix = getSuffix(code);
  return cleanCalldata + suffix.slice(2);
}

// Public RPC Clients with failover
const getClient = (network) => {
  const isSepolia = network === 'sepolia';
  const chain = isSepolia ? baseSepolia : base;
  
  // Public fallbacks to prevent 429 rate limits
  const rpcs = isSepolia 
    ? ['https://sepolia.base.org']
    : [
        'https://mainnet.base.org',
        'https://base.llamarpc.com',
        'https://base-rpc.publicnode.com'
      ];
      
  return createPublicClient({
    chain,
    transport: fallback(rpcs.map(url => http(url)))
  });
};

// ERC-20 Minimal ABI for balance queries and transfers
const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }]
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'decimals', type: 'uint8' }]
  },
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' }
    ],
    outputs: [{ name: 'success', type: 'boolean' }]
  }
];

// Uniswap V3 SwapRouter02 ABI for swaps
const SWAP_ROUTER_ABI = [
  {
    name: 'exactInputSingle',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        components: [
          { name: 'tokenIn', type: 'address' },
          { name: 'tokenOut', type: 'address' },
          { name: 'fee', type: 'uint24' },
          { name: 'recipient', type: 'address' },
          { name: 'amountIn', type: 'uint256' },
          { name: 'amountOutMinimum', type: 'uint256' },
          { name: 'sqrtPriceLimitX96', type: 'uint160' }
        ]
      }
    ],
    outputs: [{ name: 'amountOut', type: 'uint256' }]
  }
];

// ENS Registry ABI for L2 Basename resolution
const REGISTRY_ABI = [
  {
    name: 'resolver',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'node', type: 'bytes32' }],
    outputs: [{ name: 'resolverAddress', type: 'address' }]
  }
];

// ENS Resolver ABI for L2 Basename resolution
const RESOLVER_ABI = [
  {
    name: 'addr',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'node', type: 'bytes32' }],
    outputs: [{ name: 'resolvedAddress', type: 'address' }]
  }
];

// Definition of tool schemas
export const tools = [
  {
    name: 'get_balance',
    description: 'Retrieve native ETH or ERC-20 token balance on Base (mainnet or sepolia).',
    inputSchema: {
      type: 'object',
      properties: {
        address: { type: 'string', description: 'The EVM wallet address to query.' },
        tokenAddress: { type: 'string', description: 'Optional: ERC-20 token address. If omitted, queries native ETH.' },
        network: { type: 'string', enum: ['mainnet', 'sepolia'], default: 'mainnet', description: 'Base network.' }
      },
      required: ['address']
    }
  },
  {
    name: 'resolve_basename',
    description: 'Resolve a .base domain name (e.g. "guy.base") to its EVM address.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'The Basename to resolve.' }
      },
      required: ['name']
    }
  },
  {
    name: 'build_transfer',
    description: 'Generate an unsigned transaction payload for transferring ETH or ERC-20 tokens on Base, including automatic builder rewards attribution.',
    inputSchema: {
      type: 'object',
      properties: {
        to: { type: 'string', description: 'Recipient EVM address.' },
        amount: { type: 'string', description: 'Amount to transfer (in ETH or token unit, e.g. "0.01" or "5.5").' },
        tokenAddress: { type: 'string', description: 'Optional: ERC-20 token address. If omitted, performs an ETH transfer.' },
        network: { type: 'string', enum: ['mainnet', 'sepolia'], default: 'mainnet', description: 'Base network.' },
        builderCode: { type: 'string', description: 'Optional override for the Builder Code rewards attribution (e.g. "bc_3nsmabm6").' }
      },
      required: ['to', 'amount']
    }
  },
  {
    name: 'build_swap',
    description: 'Generate an unsigned Uniswap V3 swap transaction on Base mainnet (e.g., swapping ETH to USDC) with builder rewards attribution.',
    inputSchema: {
      type: 'object',
      properties: {
        tokenIn: { type: 'string', description: 'EVM address of token entering the swap (use "0x4200000000000000000000000000000000000006" for WETH).' },
        tokenOut: { type: 'string', description: 'EVM address of token exiting the swap.' },
        amountIn: { type: 'string', description: 'Amount entering the swap (in token units, e.g. "0.01").' },
        amountOutMinimum: { type: 'string', default: '0', description: 'Minimum amount expected to receive (slippage protection).' },
        recipient: { type: 'string', description: 'The address that will receive the output tokens.' },
        fee: { type: 'number', default: 3000, description: 'Uniswap V3 pool fee tier in hundredths of a bps (e.g., 3000 = 0.3%).' },
        builderCode: { type: 'string', description: 'Optional override for the Builder Code rewards attribution.' }
      },
      required: ['tokenIn', 'tokenOut', 'amountIn', 'recipient']
    }
  },
  {
    name: 'build_deploy_contract',
    description: 'Generate an unsigned transaction payload to deploy a custom smart contract on Base, including builder rewards attribution.',
    inputSchema: {
      type: 'object',
      properties: {
        bytecode: { type: 'string', description: 'The compiled contract bytecode hex string (starts with or without 0x).' },
        abi: { type: 'array', description: 'Optional: The ABI array of the contract to encode constructor arguments.' },
        args: { type: 'array', description: 'Optional: Constructor arguments array.' },
        network: { type: 'string', enum: ['mainnet', 'sepolia'], default: 'mainnet', description: 'Base network.' },
        builderCode: { type: 'string', description: 'Optional override for the Builder Code rewards attribution.' }
      },
      required: ['bytecode']
    }
  },
  {
    name: 'build_deploy_token',
    description: 'Generate an unsigned transaction payload to deploy a standard ERC-20 token contract on Base, including builder rewards attribution.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Token name (e.g. "Base Gold").' },
        symbol: { type: 'string', description: 'Token symbol (e.g. "GOLD").' },
        initialSupply: { type: 'string', description: 'Initial token supply (in standard units, e.g. "1000000").' },
        recipient: { type: 'string', description: 'Wallet address receiving the initial supply.' },
        network: { type: 'string', enum: ['mainnet', 'sepolia'], default: 'mainnet', description: 'Base network.' },
        builderCode: { type: 'string', description: 'Optional override for the Builder Code rewards attribution.' }
      },
      required: ['name', 'symbol', 'initialSupply', 'recipient']
    }
  },
  {
    name: 'build_deploy_nft',
    description: 'Generate an unsigned transaction payload to deploy a standard ERC-721 NFT contract on Base, including builder rewards attribution.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Collection name (e.g. "Base Kitties").' },
        symbol: { type: 'string', description: 'Collection symbol (e.g. "KITTY").' },
        baseURI: { type: 'string', description: 'Base URI for token metadata (e.g. "ipfs://QmX.../").' },
        owner: { type: 'string', description: 'The wallet address configured as the contract owner.' },
        network: { type: 'string', enum: ['mainnet', 'sepolia'], default: 'mainnet', description: 'Base network.' },
        builderCode: { type: 'string', description: 'Optional override for the Builder Code rewards attribution.' }
      },
      required: ['name', 'symbol', 'baseURI', 'owner']
    }
  }
];

// Tool call handler
export async function handleToolCall(name, args) {
  const network = args.network || 'mainnet';
  const client = getClient(network);

  switch (name) {
    case 'get_balance': {
      const { address, tokenAddress } = args;
      
      try {
        if (!tokenAddress) {
          const balance = await client.getBalance({ address });
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                address,
                balance: (Number(balance) / 1e18).toString(),
                symbol: 'ETH',
                network
              }, null, 2)
            }]
          };
        } else {
          // Query decimals first
          const decimals = await client.readContract({
            address: tokenAddress,
            abi: ERC20_ABI,
            functionName: 'decimals'
          });
          const balance = await client.readContract({
            address: tokenAddress,
            abi: ERC20_ABI,
            functionName: 'balanceOf',
            args: [address]
          });
          
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                address,
                tokenAddress,
                balance: (Number(balance) / Math.pow(10, decimals)).toString(),
                network
              }, null, 2)
            }]
          };
        }
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Failed to fetch balance: ${err.message}` }]
        };
      }
    }

    case 'resolve_basename': {
      const { name: basename } = args;
      try {
        const isSepolia = network === 'sepolia';
        const registryAddress = isSepolia 
          ? '0x1493b2567056c2181630115660963E13A8E32735'
          : '0xb94704422c2a1e396835a571837aa5ae53285a95';

        // Format Basename correctly (e.g. jesse -> jesse.base.eth, jesse.base -> jesse.base.eth)
        let formattedName = basename.trim().toLowerCase();
        if (!formattedName.includes('.')) {
          formattedName = `${formattedName}.base.eth`;
        } else if (formattedName.endsWith('.base')) {
          formattedName = `${formattedName}.eth`;
        }

        const node = namehash(formattedName);

        // 1. Read resolver address from registry
        const resolverAddress = await client.readContract({
          address: registryAddress,
          abi: REGISTRY_ABI,
          functionName: 'resolver',
          args: [node]
        });

        if (!resolverAddress || resolverAddress === '0x0000000000000000000000000000000000000000') {
          return {
            isError: true,
            content: [{ type: 'text', text: `Basename "${formattedName}" (resolved from "${basename}") has no resolver configured in the registry.` }]
          };
        }

        // 2. Read resolved address from resolver
        const address = await client.readContract({
          address: resolverAddress,
          abi: RESOLVER_ABI,
          functionName: 'addr',
          args: [node]
        });

        if (!address || address === '0x0000000000000000000000000000000000000000') {
          return {
            isError: true,
            content: [{ type: 'text', text: `Basename "${formattedName}" could not be resolved to an address.` }]
          };
        }

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ name: formattedName, inputName: basename, address }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Error resolving Basename "${basename}": ${err.message}` }]
        };
      }
    }

    case 'build_transfer': {
      const { to, amount, tokenAddress, builderCode } = args;
      const targetCode = builderCode || DEFAULT_BUILDER_CODE;

      try {
        if (!tokenAddress) {
          // Native ETH transfer
          const valueHex = '0x' + parseEther(amount).toString(16);
          // ETH transfer has empty calldata, but we append the Builder Code suffix directly to the tx data
          const txData = appendAttribution('0x', targetCode);
          
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                to,
                value: valueHex,
                data: txData,
                description: `Unsigned transaction payload for transferring ${amount} ETH to ${to} with Builder Code attribution.`,
                builderCode: targetCode
              }, null, 2)
            }]
          };
        } else {
          // ERC-20 token transfer
          const decimals = await client.readContract({
            address: tokenAddress,
            abi: ERC20_ABI,
            functionName: 'decimals'
          });
          
          const rawAmount = parseUnits(amount, decimals);
          
          // Encode transfer(address,uint256)
          const rawCalldata = encodeFunctionData({
            abi: ERC20_ABI,
            functionName: 'transfer',
            args: [to, rawAmount]
          });
          
          // Append builder suffix
          const finalCalldata = appendAttribution(rawCalldata, targetCode);

          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                to: tokenAddress,
                value: '0x0',
                data: finalCalldata,
                description: `Unsigned transaction payload for transferring ${amount} ERC-20 tokens (${tokenAddress}) to ${to} with Builder Code attribution.`,
                builderCode: targetCode
              }, null, 2)
            }]
          };
        }
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Failed to build transfer: ${err.message}` }]
        };
      }
    }

    case 'build_swap': {
      const { tokenIn, tokenOut, amountIn, amountOutMinimum, recipient, fee, builderCode } = args;
      const targetCode = builderCode || DEFAULT_BUILDER_CODE;
      
      // Uniswap V3 SwapRouter02 on Base mainnet
      const UNISWAP_V3_ROUTER = '0x2626664c260281879685800a20fc272133b4497b';

      try {
        // Find decimals of input token
        const decimalsIn = await client.readContract({
          address: tokenIn,
          abi: ERC20_ABI,
          functionName: 'decimals'
        });
        
        // Find decimals of output token
        const decimalsOut = await client.readContract({
          address: tokenOut,
          abi: ERC20_ABI,
          functionName: 'decimals'
        });

        const parsedAmountIn = parseUnits(amountIn, decimalsIn);
        const parsedAmountOutMin = parseUnits(amountOutMinimum || '0', decimalsOut);

        const params = {
          tokenIn,
          tokenOut,
          fee: fee || 3000,
          recipient,
          amountIn: parsedAmountIn,
          amountOutMinimum: parsedAmountOutMin,
          sqrtPriceLimitX96: 0n
        };

        // Encode Uniswap V3 Swap call
        const rawCalldata = encodeFunctionData({
          abi: SWAP_ROUTER_ABI,
          functionName: 'exactInputSingle',
          args: [params]
        });

        // Append Builder Code attribution suffix
        const finalCalldata = appendAttribution(rawCalldata, targetCode);

        // If swapping native ETH (WETH), value is amountIn, otherwise value is 0x0
        const isEthIn = tokenIn.toLowerCase() === '0x4200000000000000000000000000000000000006'; // WETH
        const txValue = isEthIn ? '0x' + parsedAmountIn.toString(16) : '0x0';

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              to: UNISWAP_V3_ROUTER,
              value: txValue,
              data: finalCalldata,
              description: `Uniswap V3 swap of ${amountIn} (${tokenIn}) -> (${tokenOut}) routed through Uniswap V3 SwapRouter02 with Builder Code attribution.`,
              builderCode: targetCode
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Failed to build swap: ${err.message}` }]
        };
      }
    }

    case 'build_deploy_contract': {
      const { bytecode, abi, args: deployArgs, builderCode } = args;
      const targetCode = builderCode || DEFAULT_BUILDER_CODE;

      try {
        let cleanBytecode = bytecode.trim();
        if (!cleanBytecode.startsWith('0x')) {
          cleanBytecode = '0x' + cleanBytecode;
        }

        let rawPayload = cleanBytecode;
        if (abi && deployArgs) {
          rawPayload = encodeDeployData({
            abi,
            bytecode: cleanBytecode,
            args: deployArgs
          });
        }

        const finalData = appendAttribution(rawPayload, targetCode);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              to: null,
              value: '0x0',
              data: finalData,
              description: 'Unsigned transaction payload for custom smart contract deployment with Builder Code attribution.',
              builderCode: targetCode
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Failed to build contract deployment: ${err.message}` }]
        };
      }
    }

    case 'build_deploy_token': {
      const { name, symbol, initialSupply, recipient, builderCode } = args;
      const targetCode = builderCode || DEFAULT_BUILDER_CODE;

      try {
        const supplyVal = BigInt(initialSupply);
        
        // Encode ERC-20 template deploy data
        const rawPayload = encodeDeployData({
          abi: artifacts.ERC20.abi,
          bytecode: `0x${artifacts.ERC20.bytecode}`,
          args: [name, symbol, supplyVal, recipient]
        });

        const finalData = appendAttribution(rawPayload, targetCode);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              to: null,
              value: '0x0',
              data: finalData,
              description: `Unsigned transaction payload for deploying standard ERC-20 Token "${name}" (${symbol}) with Builder Code attribution.`,
              builderCode: targetCode
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Failed to build ERC-20 token deployment: ${err.message}` }]
        };
      }
    }

    case 'build_deploy_nft': {
      const { name, symbol, baseURI, owner: nftOwner, builderCode } = args;
      const targetCode = builderCode || DEFAULT_BUILDER_CODE;

      try {
        // Encode ERC-721 template deploy data
        const rawPayload = encodeDeployData({
          abi: artifacts.ERC721.abi,
          bytecode: `0x${artifacts.ERC721.bytecode}`,
          args: [name, symbol, baseURI, nftOwner]
        });

        const finalData = appendAttribution(rawPayload, targetCode);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              to: null,
              value: '0x0',
              data: finalData,
              description: `Unsigned transaction payload for deploying standard ERC-721 NFT "${name}" (${symbol}) with Builder Code attribution.`,
              builderCode: targetCode
            }, null, 2)
          }]
        };
      } catch (err) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Failed to build ERC-721 NFT deployment: ${err.message}` }]
        };
      }
    }

    default:
      return {
        isError: true,
        content: [{ type: 'text', text: `Unknown tool: ${name}` }]
      };
  }
}
