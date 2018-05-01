---
title: 轮播插件slick的使用
date: 2018-1-5 
tags: JavaScript
---
今天在做轮播图的时候搜到了一个插件叫slick，就下下来尝试了一下，关于插件的下载可以点这个链接[slick](http://kenwheeler.github.io/slick/)，链接中的网页还包含了插件使用的演示。
首先当我们下载好插件后先要引入必要的文件，其中包括：

![11](https://li-7857.oss-cn-beijing.aliyuncs.com/imgs/11.png?Expires=1525207842&OSSAccessKeyId=TMP.AQG-2hGGT7UlhcxUWij5ViadteIZLyY4oZ744RVmBBSTAgOW83BDmw1c8vZEAAAwLAIUcI4AqzQ3keTqKsfUViZ7UXKDK5ECFHrmY3wAIYp5l4TNy5ZRHhkB8vQv&Signature=uTh37n1K9EzDssP3q20HsTo4Al8%3D)
以上几个文件，这里需要注意的是slick.js必须要在jquery.js的下面。
将文件导入后就可以开工了，照着文档的代码来就是

```html
<div class="slick">

  <div>your content</div>

  <div>your content</div>

  <div>your content</div>

</div>

<script>
   $('.slick').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    });
</script>
```
这样，一个简单的轮播图就完成了，我之所以说文档没看明白其实是因为我是直接查看页面源代码来复制的，这样就导致了一个问题，其实有很多是自动生成的，比如上面这些代码，当打开网页查看源代码时会发现自动添加了许多代码，而这些代码如果时手动写出来的话时不会达到轮播图的效果的。概括来讲就是，如果要用到这个框架的多种不同的轮播图的效果，最初始的代码结构都是在

```html
<div class="slick">

  <div>your content</div>

  <div>your content</div>

  <div>your content</div>

</div>
```
这个基础上然后通过在`script`中设置不同的参数来达到效果的，关于有些什么参数这个就自行查看文档吧。