# sls-api
Todoアプリ用バックエンドサーバ（Node.js v10.x）

## デプロイ
```
sls deploy --stage ENVIRONMENT
```

## lint
```
npm run lint
```

## lint fix
```
npm run fix
```

## リソース削除
```
sls remove --stage ENVIRONMENT
```

## Lambda関数ローカルテスト
```
sls invoke local --function FUNCTION_NAME --stage ENVIRONMENT
```
mockデータを用いたい場合（jsonファイル）
```
sls invoke local --function FUNCTION_NAME -p MOCK_JSON_FILE --stage ENVIRONMENT
```
