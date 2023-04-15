#! /bin/bash

source .env

# clean out
rm -rf $PUB_DIR && mkdir $PUB_DIR && mkdir $PUB_DIR/css

# build pages
deno run --allow-env --allow-read=./ --allow-write=$PUB_DIR ./sanguine/index.ts

# copy public content
cp -r ./public/* $PUB_DIR

# compile css file if running locally and not in a CI environment
if [ -z $CI ];then
  sass --style=compressed ./styles/kalisjoshua.scss $PUB_DIR/css/kalisjoshua.css
fi

# create cname file
echo kalisjoshua.me > $PUB_DIR/CNAME


echo "Build complete."
