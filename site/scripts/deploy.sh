#!/bin/bash

if [[ -z "${ZENT_DEPLOY_DOC_GIT_REPO}" ]]; then
  gh-pages -d dist
else
  gh-pages -d dist -r "${ZENT_DEPLOY_DOC_GIT_REPO}"
fi
