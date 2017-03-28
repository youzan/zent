#!/bin/bash

# ----------------------------------------------------------------------------
# 慢速版
# 会请求log最终确认结果
# ----------------------------------------------------------------------------

for json in packages/*/package.json
do
    name=$(cat $json | grep name | head -1 | awk -F: '{ print $2 }' | awk -F, '{print $1}' | sed 's/\"//g' | cut -d ' ' -f 2)
    logId=$(curl -s -X PUT "https://npm.taobao.org/sync/${name}" \
        | sed -e 's/[{}]/''/g' \
        | awk -F, '{print $2}' \
        | awk -F: '{print $2}' \
    )
    sleep 5
    result=$(curl -s -X GET "https://npm.taobao.org/sync/zent/log/${logId}?offset=0" \
        | cut -d ']' -f 24-25 \
        | awk -F, '{print $2}' \
        | cut -d ' ' -f 2 \
    )
    if [ $result == '1' ]
    then
        echo "${name} sync complete"
    else
        echo "${name} sync failed"
    fi
done

# ----------------------------------------------------------------------------
# 快速版
# 需要认为淘宝sync接口不会失败..
# ----------------------------------------------------------------------------
#
# for json in packages/*/package.json
# do
#     name=$(cat $json | grep name | head -1 | awk -F: '{ print $2 }' | awk -F, '{print $1}' | sed 's/\"//g' | cut -d ' ' -f 2)
#     ok=$(curl -s -X PUT "https://npm.taobao.org/sync/${name}" \
#         | sed -e 's/[{}]/''/g' \
#         | awk -F, '{print $1}' \
#         | awk -F: '{print $2}' \
#     )
#     if $ok
#     then
#         echo "${name} sync complete"
#     else
#         echo "${name} sync failed"
#     fi
# done
