---
title: 使用HBuilder开发混合APP应用（一）
date: 2018-5-07
tags: 混合app
---
>最近需要做一个混合app，是基于HBuilder打包的，使用h5+plus来操作手机原生功能。

# 一、创建项目
打开HBuilder，右键>新建>移动APP，![1](https://li-7857.oss-cn-beijing.aliyuncs.com/imgs/HBuilder_app/h_1.png?x-oss-process=style/imgs)
可以看到这里有很多个可以创建的模板，如果不熟悉的话可以先创建一个`Hello H5+`的模板，里面怎么使用h5+plus来调用各种底层能力的操作，这里我就拿空模板来说了。

# 二、目录结构
当创建空模板之后，可以看到目录中有好几个文件和文件夹，分别是`css`,`img`,`js`,`unpackage`,`index.html`,`manifest.json`。
前三个文件夹不用说大家都知道，是用来存放样式、图片和js代码的地方；`unpackage`是可以存放不需要打包的文件，这个在打包的时候会有选项的，直接添加到unpackage清单就行了；`index.html`是入口文件,可以自己来定义的，可以要可以不要；`manifest.json`是是项目的配置文件，也是整个项目核心的一个文件。

# 打包成app
右键项目，选择发行 > 打包成原生app，然后弹出配置窗口，在弹出的配置窗口可以选择是打包成ios还是Android，选择一个，然后将需要的信息填写完整（注：在测试的时候可以不用填写完整的信息，直接打包即可），打包。等待打包完毕之后右键项目，选择发行 > 云打包-打开App下载目录，当打包完成后会在这个文件夹下生成安装文件，这时打包就完成了。