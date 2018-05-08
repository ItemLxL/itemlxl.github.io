---
title: 初识Vue
date: 2017-12-19
tags: vue
---
###	1. Vue的声明方式
通过一个模板语法来将数据渲染进DOM
	
```html
<html>
  <div id="app">{{msg}}</div>
</html>
<script>
//声明组件
  var app = new Vue({
      el:'#app',//绑定组件
      data:{
           msg:'数据源'//设置数据
      }
  });
</script>
```

数据更新是可以通过`app.msg="新数据"`方式来改变的

### 2. Vue中的特殊特性
在Vue中提供了一些特殊的特性，这种特性都带有`v-`的前缀，如`v-bind`,`v-if`,`v-for`,`v-on`,`v-model`等等
	
```html
//v-bind:用于绑定html属性
<html>
  <div id="app">
	<img v-bind:src="url">
  </div>
</html>
<script>
//声明组件
  var app = new Vue({
      el:'#app',//绑定组件
      data:{
           url:'..img/img.jpg'//设置数据
      }
  });
</script>

//v-for:相当于JavaScript的遍历
<html>
  <div id="app">
    <ul>
//items是一个数组，item是数组里的元素
      <li v-for="item in items">{{item.text}}</li>	
    </ul>
  </div>
</html>
<script>
//声明组件
  var app = new Vue({
      el:'#app',//绑定组件
      data:{
           items:[text:"数据一",text:"数据二"]//设置数据
      }
  });
</script>

//v-if:条件渲染，通过data:{}里的bool值来判断是否渲染该元素

//v-on:用于监听元素的DOM事件

//v-model:实现数据的双向绑定，是一个语法糖
```


