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

# upload font files to CDN
for fontfile in $basepath/../build/font/zenticon-*; do
  superman cdn $fontfile $server_prefix
done

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
