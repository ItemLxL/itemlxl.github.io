---
title: hexo主题配置
date: 2018-4-30 
tags: hexo
---

>自从博客搭建好之后象征性的放了几篇文章就给扔到一边了，最近趁着五一放假，在家也闲着没事，想着还是要写点什么，下面进入正题。

既然要认真对待，那么在搭建完博客之后当然是要配置一个好看的主题不是吗，当然我个人喜欢的是简洁风格的主题，所以这次介绍的也是配置这个方面的，不过配置的方式都差不多，到时候各位可以自行选择

## 下载主题
首先要说一下hexo的主题文件是在哪个位置，在 Hexo的站点目录下有一个`themes`文件夹，和名字上的意思一样，这个就是用来存放主题的，那么我们的主题从哪里来呢，推荐一个收录主题的网址[https://hexo.io/themes/](https://hexo.io/themes/)，进到这个网址可以看到很多的主题，点击去可以到这个主题的GitHub上，一般上面都会有详细的配置教程，就拿热门的**NEXT**主题来说，在控制台输入
 
    $ cd your-hexo-site  
    $ git clone https://github.com/iissnan/hexo-theme-next themes/next

先将主题clone到我们自己的hexo站点目录下，然后打开`_config.yml`，在里面找到
![1](https://li-7857.oss-cn-beijing.aliyuncs.com/imgs/1.png)
把theme后面对应的主题名字换成你下载的那个主题的名字。

## 配置
我们在本地操作完成之后一定要记得更新站点

    hexo clean  &  hexo g  &  hexo d
如果你的博客存储在了GitHub仓库中，还要将修改后的站点目录更新到GitHub中，这样，打开博客网站就能看到主题的效果了。