#!/bin/bash

zent_packages=$(grep -E "zent-.+" package.json | tr -d '",' | cut -d ':' -f 1)

copy_from_node_modules() {
  echo "copy $1"

  local_name=$(echo $1 | cut -d '-' -f 2)

  rm -rf $local_name
  cp -rfp node_modules/$1 $local_name
  rm -rf $local_name/node_modules
}

# make a copy to root
export -f copy_from_node_modules
echo "$zent_packages" | xargs -n 1 -I {} bash -c 'copy_from_node_modules "$@"' _ {}
