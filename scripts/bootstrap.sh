#!/bin/bash

set -e

yarn
yarn workspace "$1" build
