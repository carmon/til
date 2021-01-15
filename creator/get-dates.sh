#!/bin/bash

DIR="../blog/posts"
JSON=$(echo '{}' | jq .)

for f in $DIR/*.md; do
    k=${f#"$DIR/"}
    d=$(git log --format=%aD $f | tail -1)
    JSON=$(echo $JSON | jq ". + { \"$k\": \"$d\" }")
done
echo $JSON | jq . > dates.json