import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

// サウンドファイルの絶対パスを取得
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// コマンドライン引数からファイル名を取得（デフォルト: sound.mp3）
const soundFileName = process.argv[2] || "sound.mp3";
const soundFile = path.join(__dirname, "..", "sounds", soundFileName);

const server = new McpServer({
  name: "play-sound-mcp-server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// サウンド再生ツールを登録
server.tool(
  "play-local-sound",
  `ローカルのサウンドファイル（${soundFileName}）をafplayで再生します。`,
  {},
  async () => {
    return new Promise((resolve) => {
      exec(`afplay "${soundFile}"`, (error) => {
        if (error) {
          resolve({
            content: [
              { type: "text", text: `サウンド再生に失敗しました: ${error}` },
            ],
          });
        } else {
          resolve({
            content: [
              { type: "text", text: `サウンド（${soundFileName}）を再生しました。` },
            ],
          });
        }
      });
    });
  }
);

console.log("[exp-mcp-server] 提供中のtool: play-local-sound (ローカルのサウンドファイルを再生)");

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("exp-mcp-server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
