[父组件间的传值](#父组件间的传值)

# 父组件间的传值
### 动态传值
```html
父组件
<div class="home">
    <hello-world :posts="posts" :size="size"></hello-world>
</div>
```
```js
数据层
data() {
    return {
         posts: [
          { id: 1, title: 'My journey with Vue' },
          { id: 2, title: 'Blogging with Vue' },
          { id: 3, title: 'Why Vue is so fun' }
      ],
    }
}
// 通过动态:绑定值赋给子组件
```
```html
子组件
<div v-for="post in posts" :key="post.id">
    <p>{{post.id}}</p>
    <p>{{post.title}}</p>
</div>
```
```js
子组件通过props接收
props: {
    posts: Array
}
```