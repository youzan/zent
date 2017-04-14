#!/bin/bash

RED='\033[0;31m'
basepath=$(dirname $0)

fail () {
    printf "${RED}$@\n\n"
    exit -1
}

fp_regexp='[-+]?[0-9]*\.?[0-9]+'
arrow_size=$(grep -oE "^\s*\\\$arrow-size\s*:\s*$fp_regexp" $basepath/../assets/_zent-pop.scss | cut -d ':' -f2)
arrow_offset=$(grep -oE "^\s*\\\$arrow-offset\s*:\s*$fp_regexp" $basepath/../assets/_zent-pop.scss | cut -d ':' -f2)
js_arrow_offset=$(grep -oE "^\s*\const\s+ARROW_OFFSET\s*=\s*$fp_regexp" $basepath/../src/position.js | cut -d '=' -f2)
is_same=$(echo "$arrow_size/2+$arrow_offset==$js_arrow_offset" | node -p)

if [ $is_same == "true" ]; then
    exit 0
fi

fail 'Arrow offsets in SCSS(assets/_zent_pop.scss) and JavaScript(src/postion.js) are different.'
