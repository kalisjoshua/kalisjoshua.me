#! /bin/bash

source .env

# clean out
rm -rf $PUB_DIR && mkdir $PUB_DIR

# build pages
deno run --allow-env --allow-read=./ --allow-write=$PUB_DIR ./sanguine/index.ts

# copy public content
cp -r ./public/* $PUB_DIR

# create cname file
echo kalisjoshua.me > $PUB_DIR/CNAME

echo "Build complete."
