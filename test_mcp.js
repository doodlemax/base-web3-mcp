import { handleToolCall } from './tools.js';

async function runTests() {
  console.log('=== STARTING WEB3 ACTION MCP SERVER TESTS ===\n');

  // Test 1: get_balance (ETH)
  try {
    console.log('Test 1: get_balance (ETH)');
    const result = await handleToolCall('get_balance', {
      address: '0x179A862703a4adfb29896552DF9e307980D19285', // Coinbase demo address
      network: 'mainnet'
    });
    console.log('Result:', result.content[0].text);
    console.log('Test 1 passed!\n');
  } catch (err) {
    console.error('Test 1 failed:', err);
  }

  // Test 2: resolve_basename
  try {
    console.log('Test 2: resolve_basename ("jesse.base")');
    const result = await handleToolCall('resolve_basename', {
      name: 'jesse.base'
    });
    console.log('Result:', result.content[0].text);
    console.log('Test 2 passed!\n');
  } catch (err) {
    console.error('Test 2 failed:', err);
  }

  // Test 3: build_transfer (ETH)
  try {
    console.log('Test 3: build_transfer (ETH) with Builder Code');
    const result = await handleToolCall('build_transfer', {
      to: '0x179A862703a4adfb29896552DF9e307980D19285',
      amount: '0.005',
      network: 'mainnet',
      builderCode: 'bc_3nsmabm6'
    });
    const tx = JSON.parse(result.content[0].text);
    console.log('Result Data:', tx.data);
    
    // Verify that the data ends with the correct hex code for "bc_3nsmabm6" and marker "8021"
    // "bc_3nsmabm6" in hex:
    // b = 62, c = 63, _ = 5f, 3 = 33, n = 6e, s = 73, m = 6d, a = 61, b = 62, m = 6d, 6 = 36
    // Suffix: 62635f336e736d61626d360b0080218021802180218021802180218021
    const expectedSuffixEnd = '80218021802180218021802180218021';
    if (tx.data.endsWith(expectedSuffixEnd)) {
      console.log('Success: Suffix successfully appended to transaction payload!');
      console.log('Test 3 passed!\n');
    } else {
      console.error('Error: Transaction calldata is missing the ERC-8021 builder code suffix!');
    }
  } catch (err) {
    console.error('Test 3 failed:', err);
  }

  // Test 4: build_transfer (ERC-20 USDC)
  try {
    console.log('Test 4: build_transfer (ERC-20) with Builder Code');
    const USDC_BASE = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913';
    const result = await handleToolCall('build_transfer', {
      to: '0x179A862703a4adfb29896552DF9e307980D19285',
      amount: '10.0', // 10 USDC
      tokenAddress: USDC_BASE,
      network: 'mainnet',
      builderCode: 'bc_3nsmabm6'
    });
    const tx = JSON.parse(result.content[0].text);
    console.log('Target Contract:', tx.to);
    console.log('Transaction Value:', tx.value);
    console.log('Calldata:', tx.data);

    // Verify it is a contract call with the suffix appended
    const expectedSuffixEnd = '80218021802180218021802180218021';
    if (tx.to.toLowerCase() === USDC_BASE.toLowerCase() && tx.data.endsWith(expectedSuffixEnd)) {
      console.log('Success: ERC-20 transfer payload successfully compiled!');
      console.log('Test 4 passed!\n');
    } else {
      console.error('Error: ERC-20 transfer data verification failed!');
    }
  } catch (err) {
    console.error('Test 4 failed:', err);
  }

  // Test 5: build_swap (Uniswap V3 swap)
  try {
    console.log('Test 5: build_swap (Uniswap V3 swap ETH -> USDC)');
    const WETH_BASE = '0x4200000000000000000000000000000000000006';
    const USDC_BASE = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913';
    const result = await handleToolCall('build_swap', {
      tokenIn: WETH_BASE,
      tokenOut: USDC_BASE,
      amountIn: '0.001',
      recipient: '0x179A862703a4adfb29896552DF9e307980D19285',
      builderCode: 'bc_3nsmabm6'
    });
    const tx = JSON.parse(result.content[0].text);
    console.log('Target Router:', tx.to);
    console.log('Transaction Value:', tx.value);
    console.log('Calldata:', tx.data);

    const expectedSuffixEnd = '80218021802180218021802180218021';
    if (tx.data.endsWith(expectedSuffixEnd)) {
      console.log('Success: Swap transaction payload generated with correct suffix!');
      console.log('Test 5 passed!\n');
    } else {
      console.error('Error: Swap transaction verification failed!');
    }
  } catch (err) {
    console.error('Test 5 failed:', err);
  }

  // Test 6: build_deploy_contract
  try {
    console.log('Test 6: build_deploy_contract (Custom Bytecode)');
    const mockBytecode = '0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea2646970667358221220a22a36b32521ec20';
    const result = await handleToolCall('build_deploy_contract', {
      bytecode: mockBytecode,
      builderCode: 'bc_3nsmabm6'
    });
    const tx = JSON.parse(result.content[0].text);
    console.log('Deploy Target (expecting null):', tx.to);
    console.log('Data payload length:', tx.data.length);

    const expectedSuffixEnd = '80218021802180218021802180218021';
    if (tx.to === null && tx.data.endsWith(expectedSuffixEnd)) {
      console.log('Success: Custom contract deployment payload verified!');
      console.log('Test 6 passed!\n');
    } else {
      console.error('Error: Custom contract deployment validation failed!');
    }
  } catch (err) {
    console.error('Test 6 failed:', err);
  }

  // Test 7: build_deploy_token (ERC-20 Template)
  try {
    console.log('Test 7: build_deploy_token (ERC-20)');
    const result = await handleToolCall('build_deploy_token', {
      name: 'Base Gold',
      symbol: 'GLD',
      initialSupply: '1000000',
      recipient: '0x179A862703a4adfb29896552DF9e307980D19285',
      builderCode: 'bc_3nsmabm6'
    });
    const tx = JSON.parse(result.content[0].text);
    console.log('Deploy Target (expecting null):', tx.to);
    console.log('Data payload length:', tx.data.length);

    const expectedSuffixEnd = '80218021802180218021802180218021';
    if (tx.to === null && tx.data.endsWith(expectedSuffixEnd)) {
      console.log('Success: ERC-20 deployment payload generated and verified!');
      console.log('Test 7 passed!\n');
    } else {
      console.error('Error: ERC-20 deployment validation failed!');
    }
  } catch (err) {
    console.error('Test 7 failed:', err);
  }

  // Test 8: build_deploy_nft (ERC-721 Template)
  try {
    console.log('Test 8: build_deploy_nft (ERC-721)');
    const result = await handleToolCall('build_deploy_nft', {
      name: 'Base Kitties',
      symbol: 'KITTY',
      baseURI: 'ipfs://QmXabc123/',
      owner: '0x179A862703a4adfb29896552DF9e307980D19285',
      builderCode: 'bc_3nsmabm6'
    });
    const tx = JSON.parse(result.content[0].text);
    console.log('Deploy Target (expecting null):', tx.to);
    console.log('Data payload length:', tx.data.length);

    const expectedSuffixEnd = '80218021802180218021802180218021';
    if (tx.to === null && tx.data.endsWith(expectedSuffixEnd)) {
      console.log('Success: ERC-721 deployment payload generated and verified!');
      console.log('Test 8 passed!\n');
    } else {
      console.error('Error: ERC-721 deployment validation failed!');
    }
  } catch (err) {
    console.error('Test 8 failed:', err);
  }

  console.log('=== TESTS COMPLETED ===');
}

runTests();
