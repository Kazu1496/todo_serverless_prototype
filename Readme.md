# Todo Serverless Prototype
## Backend
Serverless Framework

<img alt="アプリケーション構成" src="https://user-images.githubusercontent.com/39259275/68763842-cb8d1480-065c-11ea-94ad-747b823ebd85.png">
## Frontend
Vue.js

## Getting Started
各ディレクトリにて、npmパッケージをインストールします。
```
npm install
```
パッケージインストール後、sls-apiディレクトリに移動しデプロイコマンドを実行します。
```
cd sls-api
serverless deploy -v
```
デプロイ後、フロントエンド側で必要な環境変数をセットし、ローカルサーバーを起動します。
```
cd frontend
npm run serve
```
