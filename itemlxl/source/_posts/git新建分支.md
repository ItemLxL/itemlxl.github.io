---
title: 将本地的hexo博客静态文件添加到GitHub的分支
date: 2017-11-28 
tags:
---

早上的时候突然想起一个很严肃的问题，我现在的blog更新的静态文件是保存在本地的，这就意味着如果我换了电脑光从GitHub上将项目拷贝下来还不够，还要将我本地的这些静态页面的文件通过网盘或者U盘的形式拷贝到新电脑上。这对于本懒人来说是不能忍的！![](http://imgsrc.baidu.com/forum/w%3D580/sign=a930467da1014c08193b28ad3a7a025b/10f622adcbef76090b22524b26dda3cc7cd99e3f.jpg)经过一上午外加半个下午的时间，终于解决了这个问题，下面跟着步骤走：
**注**（先搭好环境的情况下才适合，关于环境的搭建请参考[hexo从零开始到搭建完整](http://visugar.com/2017/05/04/20170504SetUpHexoBlog/)）

## 1. **首先要新建一个GitHub分支**

在新建分支之前，我们可以先查看一下当前所在的分支，在文件中打开终端并输入
```
git branch
```
正常搭建完环境之后会输出`*master`这一默认分支，然后
```
//新建分支
git branch hexo(分支名)

//切换到新建的分支
git checkout hexo(分支名)

再执行git branch查看当前所在分支
```
这下可以看到输出的是`*hexo`,这就表示处于当前分支了

## 2. **上传本地文件到分支中**
在这之前最好先自行备份一份或多份，用来尝试😀
在文件夹中，`.deploy_git`是执行`hexo d`后生成的动态文件，而我们需要上传到分支中的是除了这个文件夹以外的其他文件，在上传前可以先将不需要的删除，如`.deploy_git、node_modules、public`这几个文件夹都是可以删了的
再上传之前，确保当前处于新建的分支下，不确定的可以重复之前的查看步骤，下面开始关键时刻💨
```
git add --all
```
```
git commit -m "更新说明"
```
```
git push --set-upstream origin hexo(分支名)
```
**说明** `git commit`操作必须要在`git add`步骤之后，`git push --set-upstream origin`是为了将文件推送到自己的GitHub上并做关联。完成这一步之后就能再GitHub上看到新建分支中多了上传的文件

## 3. **拉取和修改**
有人会想，就这么简单的事你也能花这么长时间都没弄好(自带黑人问号)--别急，且听我慢慢道来
当文件上传好之后，就代表着我们可以在别的电脑上也能愉快的写blog啦，具体的操作步骤如下：

```
git clone -b hexo https://github.com/XXX/XXX.github.io.git
```
可以看到这和平常的从GitHub上clone项目不同，多了一个`-b和hexo`,这是用来clone分支的操作，`-b`后面跟的是分支的名字，拷贝完后，在文件夹可以看到一些文件，这是要在终端执行
```
npm install 添加依赖

npm install hexo-deployer-git
```
添加完依赖之后就简单了，执行hexo部署三大件`hexo clean 、hexo g 、hexo d`,第一次执行`hexo clean`的时候会报错，因为这下还没有生成缓存文件，执行`hexo g`后就会生成了，`hexo d`部署之后，下面来享受成果吧，打来博客看一看更新的内容
![](http://image-up-lee.test.upcdn.net/wx1.jpg)
一秒。。。
两秒。。。
三秒。。。
是不是发现页面一片空白，连之前的东西都没看到了😥当我查了一下hexo的缓存文件后整个人都懵了，我发现之前上传有些文件并没有上传成功，`public`里面的缓存文件和我备份的文件比起来可以说是缺胳膊少腿了，这到底是怎么回事？当我在GitHub上的分支里查看的时候，我发现了一个地方文件夹是空的，在我的主题文件夹`themes`里面，我下载了好几个主题，然而在分支中只上传成功了2个文件夹，其余的都是空的，于是我从备份的文件里将哪个主题文件夹里的所有东西全复制到clone下来的文件里，再通过`git add  、 git commit  、git push`更新分支中的文件，果然事情没那么容易，再我更新后再去查看的时候那个文件夹里还是空的，鸟都不鸟我。
经过我多方面无死角的大搜查之后，终于让我发现了解决的办法，
```
git rm -rf --cached themes/
git add themes/
```
是不是觉得很莫名奇妙？没错，我现在的感觉也是莫名奇妙的，但通过这个方法确实能够将文件更新上去了，之后再重新拉取一次项目，添加一篇文章，执行[拉取和修改](#拉取和修改)这里的步骤，这次终于将文章更新上去了，可是还有些问题没有弄明白，之后再更新咯


## 补充
因为上面说的思路不清晰，这里来整理一下当hexo配置到GitHub之后再新电脑上怎么拉取下来然后再操作
* 在本地拉取项目`git clone -b hexo https://github.com/XXX/XXX.github.io.git`
* `添加依赖npm install` 
* `npm install hexo-deployer-git`
* 如果本地没有配置hexo，还要`npm install -g hexo-cli`
* 配置GitHub邮箱`git config --global user.email "email"`
* 配置GitHub用户名 `git config --global user.name "username"`
当完成以上几步之后就可以添加文章或者直接修改项目文件夹下`source`里的文章了，修改完成之后先要上传
```
	git add --all
	git commit -m "更新说明"
	git push
```
上传了之后就可以在本地更新hexo博客了，执行
```
	hexo clean
	hexo g
	hexo d
```
这样文章就更新上去了，同时在远程仓库中也是最新的，下次在原有项目的电脑上如果要上传的话，首先要
`git pull`
这一点很重要，是为了保持文件始终是最新的，到这里差不多流程就结束了