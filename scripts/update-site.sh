#!/bin/bash

yarn run bootstrap
cd site && yarn run build:docs && cd ..

cp -Rf site/dist _site/dist
cp -f site/index.html _site/index.html
