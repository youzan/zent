#!/bin/bash

basepath=$(dirname $0)
server_prefix=/zent/zenticon

# convert relative path to absolute path
function abspath() {
  pushd . > /dev/null; if [ -d "$1" ]; then cd "$1"; dirs -l +0; else cd "`dirname \"$1\"`"; cur_dir=`dirs -l +0`; if [ "$cur_dir" == "/" ]; then echo "$cur_dir`basename \"$1\"`"; else echo "$cur_dir/`basename \"$1\"`"; fi; fi; popd > /dev/null;
}

command_exists () {
    type "$1" >/dev/null 2>&1
}

fontname() {
  if command_exists superman ; then
    echo "//b.yzcdn.cn$server_prefix/$(basename $basepath/../build/font/zenticon-*.$1)"
  else
    echo "$(abspath $basepath/../build/font/zenticon-*.$1)"
  fi
}

# generate font files from sketch file
$basepath/extract-svg.sh
$basepath/generate-font.sh

# copy assets
cp -a $basepath/../build/css/zenticon-codes.css $basepath/../assets/_zenticon-codes.scss
cp -a $basepath/../build/LICENSE.txt $basepath/../assets

if command_exists superman ; then
  # upload to cdn
  superman cdn $server_prefix $basepath/../build/font/zenticon-*
fi

# generate fontface style
eot=$(fontname eot)
cat > $basepath/../assets/_fontface.scss <<EOF
/* DO NOT EDIT!! Auto genetated. */

@font-face {
  font-family: 'zenticon';
  src: url('$eot');
  src: url('$eot?#iefix') format('embedded-opentype'),
      url('$(fontname woff2)') format('woff2'),
      url('$(fontname woff)') format('woff'),
      url('$(fontname ttf)') format('truetype')
}
EOF

# generate icon grid
$basepath/grid.sh
