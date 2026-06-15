# Base Web3 Action MCP Server 🛠️🚀

A lightweight, zero-config Model Context Protocol (MCP) server for the **Base L2 Network**. This server equips AI agents (such as Cursor, Windsurf, Zed, or Claude Desktop) with standard EVM tools to query balances, resolve Basenames, and build transaction payloads that automatically capture sequencer fee rewards.

---

## Features

- **Zero API Keys Required:** Runs out-of-the-box using rotated public RPC endpoints with built-in failover to prevent rate-limiting (`429`) errors.
- **On-chain Basenames Resolver:** Resolves `.base` domains (e.g., `jesse.base` -> `jesse.base.eth`) directly on-chain using Base L2 contracts, bypassing slow L1 gateways.
- **ERC-8021 Suffix Appender:** Automatically encodes and appends your Builder Code suffix to all generated transaction payloads, enabling passive sequencer reward attribution.
- **Token & NFT Deployers:** Scaffolds and generates deployment payloads for optimized standard ERC-20 tokens and ERC-721 NFT collections in a single click.
- **Self-Custodial:** Never handles, requests, or stores private keys. It only builds unsigned transaction payloads for the client to review, sign, and broadcast.

---

## Active Tools

1.  `get_balance`: Retrieve native ETH or ERC-20 token balances on Base (Mainnet or Sepolia).
2.  `resolve_basename`: Resolve any `.base` domain to its EVM hex address.
3.  `build_transfer`: Build an unsigned transfer transaction payload for ETH or ERC-20.
4.  `build_swap`: Build Uniswap V3 swap payloads (e.g., swapping ETH to USDC) on Base.
5.  `build_deploy_contract`: Build contract deployment payloads for custom bytecodes.
6.  `build_deploy_token`: Deploy a standard ERC-20 token contract.
7.  `build_deploy_nft`: Deploy a standard ERC-721 NFT collection contract.

---

## Installation & Setup

### Local Client Setup (stdio)

#### 1. Claude Desktop
Add the following to your `claude_desktop_config.json` (located at `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "base-web3": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/index.js"],
      "env": {
        "BASE_BUILDER_CODE": "bc_3nsmabm6"
      }
    }
  }
}
```

#### 2. Cursor Settings
1. Go to **Settings > Models > MCP**.
2. Click **+ Add New MCP Server**.
3. Configure:
   - **Name:** `Base Web3 Action`
   - **Type:** `stdio`
   - **Command:** `node /absolute/path/to/mcp-server/index.js`

#### 3. Smithery (Recommended)
Install the server directly into Claude Desktop using the Smithery CLI:
```bash
npx -y @smithery/cli@latest install base-web3-mcp --client claude
```
For Cursor, configure it as a standard stdio server as shown above.


---

## Remote API Setup (Stateless HTTP)

Exposed as a stateless, authenticated endpoint for websites, bots, and Farcaster frames:

- **Endpoint:** `https://your-worker-subdomain.workers.dev/mcp`
- **Headers:** `Authorization: Bearer <EXECUTION_SECRET>`
- **Request Body (JSON-RPC 2.0):**
  ```json
  {
    "method": "tools/call",
    "params": {
      "name": "get_balance",
      "arguments": {
        "address": "0x179A862703a4adfb29896552DF9e307980D19285"
      }
    }
  }
  ```

---

## License

MIT - Open Source. Created for the Base builder ecosystem.
