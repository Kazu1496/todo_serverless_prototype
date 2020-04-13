#!/bin/sh

# build
npm run build

# upload to s3
aws s3 rm s3://todo-sls-frontend/ --recursive
aws s3 cp dist s3://todo-sls-frontend/ --recursive