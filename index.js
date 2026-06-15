import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Try to load .env from parent directory or local
dotenv.config();
const localEnvPath = path.join(process.cwd(), '.env');
const parentEnvPath = path.join(process.cwd(), '..', '.env');
if (fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath });
} else if (fs.existsSync(parentEnvPath)) {
  dotenv.config({ path: parentEnvPath });
}

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { tools, handleToolCall } from './tools.js';

// Initialize the MCP Server
const server = new Server(
  {
    name: 'base-web3-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register the tool definitions handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Register the tool execution handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  return await handleToolCall(name, args || {});
});

// Run the server using local standard input/output transport
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Base Web3 Action MCP Server running on stdio');
}

run().catch((error) => {
  console.error('Fatal error running Base MCP server:', error);
  process.exit(1);
});
