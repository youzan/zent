#!/bin/bash

set -e

basepath=$(dirname $0)

$basepath/./build-theme.sh
$basepath/./build-ts.sh
