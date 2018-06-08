## 开发

确保按照Zent的要求跑完npm run bootstrap，然后在这个目录下执行

```bash
yarn

npm run dev
```

浏览器打开[http://127.0.0.1:4396](http://127.0.0.1:4396)

## 部署

`yarn run deploy`

默认情况下生成的静态文件会部署到当前仓库的 `gh-pages` 分支上， 可以设置 `ZENT_DEPLOY_DOC_GIT_REPO` 环境变量来修改仓库。

## Notes

Github doesn't support SPAs, the `404.html` is a workaround. Do NOT remove it.
