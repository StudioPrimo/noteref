#!/bin/sh

# 依存関係のインストール
yarn install

# アプリケーションのビルド
yarn build


if [ "$ENVIRONMENT" = "dev" ]; then
    
    yarn dev
    else
    yarn start
fi
