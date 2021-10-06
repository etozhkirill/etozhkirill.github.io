---
title: 'Создание компонента рекурсивного дерева во Vue.js'
description: 'Рекурсия всегда была болью в изучении алгоритмов. Тем не менее, в некоторых случаях использование рекурсии кажется более естественным чем использование циклов. Обход дерева один из таких случаев.'
image: 'assets/cover.jpeg'
date: '2018-06-08'
---

> Рекурсия всегда была болью в изучении алгоритмов. Тем не менее, в некоторых случаях использование рекурсии  кажется более естественным чем использование циклов. Обход дерева один из таких случаев.

Мы можем создать рекурсивный компонент во Vue.js и любые другие структуры, следуя этой же механике.

### **Создание компонента дерева**

Представьте компонент, который может рендерить древовидную структуру, например отображение дерева директорий.

```txt
+ Root directory
  + Directory A
    + Directory A1
  + Directory B
```

Мы можем представить директорию как Дерево и все поддиректории как список Узлов этого дерева. Дерево всегда имеет корневой узел, который расширяется до тех пор пока не достигнет вершины.

Для примера мы можем использовать объект с ключами `label` и `children`:

```javascript
const tree = {
  label: 'A cool folder',
  children: [
    {
      label: 'A cool sub-folder 1',
      children: [
        { label: 'A cool sub-sub-folder 1' },
        { label: 'A cool sub-sub-folder 2' }
      ]
    },
    { label: 'This one is not that cool' }
  ]
};
```

Учитывая предыдущую структуру, давайте создадим компонент `Tree.vue`, который принимает ее через свойство и отображает корневой узел:

Tree.vue

```html
<template>
  <div class="tree">
    <ul class="tree-list">
      <node-tree :node="treeData"></node-tree>
    </ul>
  </div>
</template>

<script>
  import NodeTree from './NodeTree';

  export default {
    props: {
      treeData: Object
    },
    components: {
      NodeTree
    }
  };
</script>

<style>
  .tree-list ul {
    margin: 6px 0;
    padding-left: 16px;
  }
</style>
```

Мы добавили небольшие отступы слева от списков, таким образом они будут выглядеть многоуровнево.

Здесь не происходит ничего особенного, мы просто получаем свойство `treeData` и передаем его как первый узел в компонент `NodeTree`, который нам еще предстоит реализовать.

### **Реализация компонента NodeTree**

NodeTree должен отображать лэйблы, но в то же время рендерить своих потомков. На данном этапе NodeTree является поддеревом.

Пример компонента `NodeTree.vue`:

NodeTree.vue

```html
<template>
  <li class="node-tree">
    <span class="label">{{ node.label }}</span>
  </li>
</template>

<script>
  export default {
    props: {
      node: Object
    }
  };
</script>
```

Но данный компонент просто отображает лэйблы, мы все еще должны отрендерить его потомков, которые также являются узлами дерева.

Вы уже могли подумать, что в этом случае следует использовать рекурсивные функции, которые вызывают сами себя до тех пор, пока не выполнится определенное условие.

Итак, мы должны создать узел дерева, который рендерит список узлов потомков. Чтобы получить доступ к компоненту из этого же компонента, мы должны добавить ему свойство `name`:

NodeTree.vue

```html
<template>
  <li class="node-tree">
    <span class="label">{{ node.label }}</span>

    <ul v-if="node.children && node.children.length">
      <node v-for="child in node.children" :node="child"></node>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'node',
    props: {
      node: Object
    }
  };
</script>
```

Это позволит компоненту `NodeTree` вызывать самого себя, до тех пор пока он не достигнет конечного узла.

Как вы можете видеть, мы используем `name: "node"` и соответственно тэг `<node>`. Дочерние узлы дерева будут рендериться только в случае их наличия, передаваясь в дочерний узел через свойство.

### **Использование компонента Дерева**

Для того чтобы попробовать данный компонент, вы можете создать компонент `App.vue`, передав предыдущую структуру данных в компонент `Tree`:

App.vue

```html
<template>
  <div>
    <tree :tree-data="tree"></tree>
  </div>
</template>

<script>
  import Tree from './Tree';

  export default {
    data: () => ({
      tree: {
        label: 'A cool folder',
        children: [
          {
            label: 'A cool sub-folder 1',
            children: [
              { label: 'A cool sub-sub-folder 1' },
              { label: 'A cool sub-sub-folder 2' }
            ]
          },
          { label: 'This one is not that cool' }
        ]
      }
    }),
    components: {
      Tree
    }
  };
</script>
```

### **Заключение**

Рекурсия не должна быть сложной, и Vue.js позволяет делать это просто предоставляя поддержку DSL или шаблонов.

Я надеюсь, что данная статья поможет вам создавать потрясающие компоненты деревьев!

_Оригинальная статья: [Creating a Recursive Tree Component in Vue.js | DigitalOcean](https://alligator.io/vuejs/recursive-components/)_
