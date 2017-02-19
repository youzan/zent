#!/bin/sh

npm run lint && ./scripts/copy-modules.sh && zent-kit prepublish
