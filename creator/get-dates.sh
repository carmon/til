#!/bin/bash
DIR="../blog/posts"
JSON="{"
for f in $DIR/*.md; do
    k=${f#"$DIR/"}
    d=$(git log --format=%aD $f | tail -1)
    if [ "$JSON" != "{" ]; then
        JSON+=","
    fi;
    JSON+="\"$k\":\"$d\""
done
JSON+="}"
echo $JSON > dates.json