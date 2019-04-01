#!/bin/bash

RED='\033[0;31m'
basepath=$(dirname $0)

fail () {
    printf "${RED}$@\n\n"
    exit -1
}

fp_regexp='[-+]?[0-9]*\.?[0-9]+'
arrow_size=$(grep -oE "^\s*\\\$arrow-size\s*:\s*$fp_regexp" $basepath/../assets/pop.scss | cut -d ':' -f2)
arrow_offset_h=$(grep -oE "^\s*\\\$arrow-offset-h\s*:\s*$fp_regexp" $basepath/../assets/pop.scss | cut -d ':' -f2)
arrow_offset_v=$(grep -oE "^\s*\\\$arrow-offset-v\s*:\s*$fp_regexp" $basepath/../assets/pop.scss | cut -d ':' -f2)
js_arrow_offset_h=$(grep -oE "^\s*\const\s+ARROW_OFFSET_H\s*=\s*$fp_regexp" $basepath/../src/pop/position.ts | cut -d '=' -f2)
js_arrow_offset_v=$(grep -oE "^\s*\const\s+ARROW_OFFSET_V\s*=\s*$fp_regexp" $basepath/../src/pop/position.ts | cut -d '=' -f2)
is_same=$(echo "$arrow_size/2 + $arrow_offset_h === $js_arrow_offset_h && $arrow_size/2 + $arrow_offset_v === $js_arrow_offset_v" | node -p)

if [ $is_same == "true" ]; then
    exit 0
fi

fail 'Arrow offsets in SCSS(assets/pop.scss) and JavaScript(src/pop/postion.js) are different.'
