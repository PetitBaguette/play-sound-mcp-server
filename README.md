# play-sound-mcp-server

@modelcontextprotocol/sdk を利用した「ローカルのサウンドファイルを再生する」MCPサーバーのサンプルです。

> ⚠️ 本サーバーは `afplay` コマンドを利用するため、**macOS環境でのみ利用可能** です。

## セットアップ

```sh
npm install
npm run build
```

## サーバーの起動と使い方

### サウンドファイルの指定

サーバー起動時の第1引数で再生したいファイル名（soundsディレクトリ内）を指定できます。
指定しない場合は `sound.mp3` が再生されます。

例: `sounds/alert.mp3` を再生したい場合

```sh
node build/index.js alert.mp3
```

デフォルト（sound.mp3）を再生する場合:

```sh
node build/index.js
```

> ※ サウンドファイルは `sounds/` ディレクトリに配置してください。

## 提供ツール情報

- **tool名:** `play-local-sound`
- **説明:** 指定したローカルのサウンドファイル（デフォルト: sound.mp3）をafplayで再生します。
- **引数:** なし（サーバー起動時の引数でファイル名を指定）
- **戻り値:** 再生結果のテキストメッセージ

## MCPサーバーの設定例

MCPクライアントで以下のように設定してください:

```json
{
  ...
  "mcpServers": {
    ...
    "play-sound-mcp-server": {
      "command": "node",
      // カスタム音源を利用する場合はsoundsディレクトリに配置した上で2番目の要素にファイル名を入力(省略した場合はデフォルト音源が利用される)
      "args": ["/絶対パス/build/index.js", "custom.mp3"]
    }
  },
  // VSCodeの場合の設定
  "github.copilot.chat.codeGeneration.instructions": [
    {
        // サウンドを鳴らすタイミングの例
        "text": "レスポンスを返した後で必ずplay-sound-mcp-serverのplay-local-soundを実行"
    }
  ]
}
```

## 参考
- MCP公式: https://modelcontextprotocol.io/quickstart/server
- SDK: https://github.com/modelcontextprotocol/create-python-server

## 備考

デフォルトの `sound.mp3` は [TAM Music Factory](https://www.tam-music.com/interface) の素材を利用しています。
