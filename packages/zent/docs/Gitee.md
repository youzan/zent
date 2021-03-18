# Gitee Pages 同步说明

由于众所周知的原因，在 🇨🇳 访问 Github Pages 时往往速度很慢，甚至完全不可用，因此我们在部署文档时会同步一份到 gitee.com。

现在的同步策略是只同步 `gh-pages` 分支，其余分支均不同步，同时我们在 gitee.com 不接受 Issue 和 PR，仅用作文档的镜像。

gitee 上所有镜像都在 [zent-contrib](https://gitee.com/zent-contrib) 这个组织下面。

## Secrets 说明

- `GITEE_USERNAME` 和 `GITEE_PASSWORD` 用于自动触发 Gitee Pages 的部署。原因是 Gitee Pages 的自动部署功能是收费功能，免费版仓库必须手动部署。我们使用 `yanglbme/gitee-pages-action` 来自动化部署，但是因为上述原因，无法通过正常的 Gitee API 部署，因此需要用户名和密码。只要这个账号有镜像仓库的部署权限就可以，不限具体的账号。
- `GITEE_SSH_PRIVATE_KEY` 同步 `gh-pages` 分支时需要往 gitee 推代码，因此这个 key 需要有镜像仓库的写权限。Github 上我们通过一个机器人账号([machine user](https://docs.github.com/en/developers/overview/managing-deploy-keys#machine-users)) `youzan-fe-bot` 赋予了 zent 文档相关仓库的只读权限，这个 key 对应的公钥只需要在 `youzan-fe-bot` 的个人 SSH key 中添加即可。Gitee 上则需要将这个 key 对应的公钥添加到有镜像仓库的某个组织成员的个人 SSH key 下，并需要给到仓库的写权限。

## 为什么不用 Github 的 Deploy keys

因为同一个 deploy key 只能添加到一个 github 仓库，无法添加到第二个仓库中。针对同时给予多个仓库只读权限的场景，github 推荐使用 machine user。
