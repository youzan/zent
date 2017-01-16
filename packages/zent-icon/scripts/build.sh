#!/bin/bash

basepath=$(dirname $0)
server_prefix=/zent/zenticon

fontname() {
  echo "//b.yzcdn.cn$server_prefix/$(basename $basepath/../build/font/zenticon-*.$1)"
}

# generate font files from sketch file
$basepath/extract-svg.sh
$basepath/generate-font.sh

# copy assets
cp -a $basepath/../build/css/zenticon-codes.css $basepath/../assets/_zenticon-codes.scss
cp -a $basepath/../build/LICENSE.txt $basepath/../assets

# upload to cdn
superman cdn $server_prefix $basepath/../build/font/zenticon-*

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