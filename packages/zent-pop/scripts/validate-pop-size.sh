#/bin/sh

RED='\033[0;31m'
basepath=$(dirname $0)

fail () {
    printf "${RED}$@\n\n"
    exit -1
}

arrow_size=$(grep -oE '^\s*\$arrow-size\s*:\s*[-+]?[0-9]*\.?[0-9]+' $basepath/../assets/_zent-pop.scss | cut -d ':' -f2)
arrow_offset=$(grep -oE '^\s*\$arrow-offset\s*:\s*[-+]?[0-9]*\.?[0-9]+' $basepath/../assets/_zent-pop.scss | cut -d ':' -f2)
js_arrow_offset=$(grep -oE '^\s*\const\s+ARROW_OFFSET\s*=\s*[-+]?[0-9]*\.?[0-9]+' $basepath/../src/position.js | cut -d '=' -f2)
is_same=$(echo "scale=2; $arrow_size/2+$arrow_offset==$js_arrow_offset" | bc)

if [ $is_same == 1 ]; then
    exit 0
fi

fail 'Arrow offsets in SCSS(assets/_zent_pop.scss) and JavaScript(src/postion.js) are different.'
