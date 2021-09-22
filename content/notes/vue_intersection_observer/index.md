---
title: 'Построение компонента бесконечной прокрутки с помощью Intersection Observer API и Vue.js'
description: 'При создании приложений вы часто сталкиваетесь с тем, когда вам нужно разработать интерфейс списка или поиска для пользователя. Они обычно управляют большим количеством данных, таким образом, вам нужен способ отображения информации "кусками", чтобы сохранить производительность приложения и организацию данных.'
image: 'assets/cover.jpeg'
date: '2019-01-20'
---

> При создании приложений вы часто сталкиваетесь с тем, когда вам нужно разработать интерфейс списка или поиска для пользователя. Они обычно управляют большим количеством данных, таким образом, вам нужен способ отображения информации "кусками", чтобы сохранить производительность приложения и организацию данных.

Вы, вероятно, делали пагинатор. Он превосходно работает и обеспечивает хороший способ навигации между структурированными данными. Вы можете легко переходить между страницами, а иногда и через несколько страниц.

Бесконечный скролл - это хорошая альтернатива пагинатору, которая может обеспечить лучший UX, особенно на мобильных устройствах. Он предоставляет невидимую пагинацию при прокрутке страницы и дает ощущение навигации по бесконечному списку.

Так как браузеры начали поддерживать [Intersection Observer API](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API), построение компонента бесконечной прокрутки стало проще некуда. Давайте посмотрим как это сделать.

### Intersection Observer API

Intersection Observer API предоставляет вам подписываемую модель, которую вы можете наблюдать, чтобы получать уведомления, когда элемент входит в эту область.

Создать наблюдателя легко, нам просто нужно создать экземпляр класса `IntersectionObserver` и вызвать метод `observe`, передав в него DOM элемент:

```javascript
const observer = new IntersectionObserver();

const coolElement = document.querySelector('#coolElement');
observer.observe(coolElement);
```

Но как нам получать уведомления, когда элемент `coolElement` входит в область наблюдателя? Конструктор `IntersectionObserver` принимает функцию обратного вызова в качестве аргумента, которую мы и можем для этого использовать:

```javascript
const observer = new IntersectionObserver((entries) => {
  const firstEntry = entries[0];
  if (firstEntry.isIntersecting) {
    // Здесь должен быть обработчик пересечения...
  }
});

const coolDiv = document.querySelector('#coolDiv');
observer.observe(coolDiv);
```

Как вы можете видеть, коллбэк принимает `entries` как аргумент. Это массив, потому что вы можете иметь несколько записей, но в данном случае мы используем только первый элемент.

Затем мы можем проверить пересекает элемент заданную область или нет, используя свойство `firstEntry.isIntersection`. Это подходящее место чтобы сделать ajax запрос и получить следующую страницу с данными.

Конструктор `IntersectionObserver` принимает параметры компонента вторым аргументом следующим образом:

```javascript
const options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0
};

const observer = new IntersectionObserver(callback, options);
```

`rootMargin` может быть полезен для нашего случая, так как это позволяет нам определить границу, которую наблюдатель будет использовать для поиска пересечений. По умолчанию это 0, т.е. наблюдатель вызовет событие пересечения сразу как только оно войдет в его зону. Но установка rootMargin в 400px означает, что обработчик пересечения будет вызван прежде чем элемент войдет в область наблюдателя с указанным отступом.

Поскольку `root` и `threshold` не имеют большого смысла для нашего случая, я оставлю вам возможность изучить их в [документации](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API).

Понимая теперь как использовать Intersection Observer, мы можем использовать технику размещения компонента *наблюдателя* в конце списка, чтобы загрузить больше данных, когда пользователь достигнет нижней части списка.

### Компонент Наблюдатель

Предыдущий пример классный, верно? Было бы удобно иметь для него Vue компонент, чтобы использовать в нашем приложении.

Мы можем использовать хук `mounted`, чтобы установить наблюдателя, который нам нужно сохранить в локальном стэйте компонента. Важно что вы используете хук `mounted` вместо `created`, потому что нам нужен DOM элемент, а в хуке `created` его еще нет:

```javascript
// Observer.vue
export default {
  data: () => ({
    observer: null
  }),
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        // ...
      }
    });

    this.observer.observe(this.$el);
  }
};
```

_Внимание: мы используем деструктуризацию массива на аргументе `_[entry]*`. Это короткий способ эквивалентный получению первого элемента массива entries `*entries[0]_`._

Как вы можете видеть, мы используем `this.$el`, который является корневым элементом компонента и наблюдаемым DOM элементом.

Чтобы сделать его переиспользуемым, нам нужно позволить родительскому компоненту (тому который использует компонент Observer) обрабатывать событие пересечения. Для этого мы можем вызывать кастомное событие `intersect`, когда он пересекается:

```javascript
export default {
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit('intersect');
      }
    });

    this.observer.observe(this.$el);
  }
  // ...
};
```

Согласно шаблону компонента, нам просто нужен любой элемент, поэтому мы можем использовать безразмерный `<div>`:

```markup
<template>
  <div class="observer"/>
</template>
```

Наконец, **важно очистить наблюдателя при уничтожении компонента**, в противном случае в нашем приложении будут утечки памяти, так как слушатели событий не будут очищены. Мы можем использовать хук `destroyed` для вызова метода `disconnect`:

```javascript
export default {
  destroyed() {
    this.observer.disconnect();
  }
  // ...
};
```

Вы узнаете, что существует так же метод `unobserve`. Главные различия:

- unobserve: останавливает наблюдение за элементом

- disconnect: останавливает наблюдение всех элементов

В данном случает, поскольку у нас только один элемент, то можно использовать оба метода.

Мы можем также добавить компоненту свойство `options`, чтобы передавать в него опции наблюдателя, в случае если мы захотим использовать `rootMargin`.

Соберем все вместе в компонент *Observer.vue*:

```markup
<!-- Observer.vue -->
<template>
  <div class="observer"/>
</template>

<script>
export default {
  props: ['options'],
  data: () => ({
    observer: null,
  }),
  mounted() {
    const options = this.options || {};
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("intersect");
      }
    }, options);

    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>
```

### Создание бесконечного скролла

Представьте, что у вас есть компонент списка, подобный следующему:

```markup
<template>
  <div>
    <ul>
      <li class="list-item" v-for="item in items" :key="item.id">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({ items: [] }),
  async mounted() {
    const res = await fetch("https://jsonplaceholder.typicode.com/comment");
    this.items = await res.json();
  }
};
</script>
```

_Внимание: данный код использует современный async/await синтаксис, чтобы асинхронный код выглядел красиво. Смотрите [эту статью](https://medium.com/@_bengarrison/javascript-es8-introducing-async-await-functions-7a471ec7de8a), чтобы узнать об этом больше_

Этот компонент в стейте имеет переменную `items`, которая рендерится в список используя директиву `v-for`. В хуке mounted используется [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch) для того, чтобы получить некоторые псевдо-данные из [jsonplaceholder.typicode.com](http://jsonplaceholder.typicode.com/), используется для заполнения переменной `items`.

### Добавление пагинации

Это круто и это будет работать, но нам еще нужно использовать нумерацию страниц. Для этого, [jsonplaceholder.typicode.com](http://jsonplaceholder.typicode.com/) позволяет нам использовать \_page и \_limit для управления возвращаемыми данными. Кроме того, нам нужно отслеживать номер страницы, начиная с 1.

Давайте применим эти изменения:

```javascript
export default {
  data: () => ({ page: 1, items: [] }),
  async mounted() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${this.page}&_limit=50`
    );

    this.items = await res.json();
  }
};
```

Теперь у нас есть пагинация, ограниченная 50 элементами на страницу.

### Добавление компонента наблюдателя

Нам все еще нужен последний блок для создания компонента бесконечной прокрутки - это компонент наблюдателя. Мы будем использовать его в нижней части списка, таким образом, когда он достигнет видимой области экрана, он будет запрашивать следующую страницу.

Сперва, импортируем компонент `Observer` и добавим его в компонент `InfiniteScroll`, прямо под списком:

```markup
<template>
  <div>
    <ul>
      <li class="list-item" v-for="item in items" :key="item.id">{{item.name}}</li>
    </ul>
    <Observer @intersect="intersected"/>
  </div>
</template>

<script>
import Observer from "./Observer";

export default {
  // ...
  components: {
    Observer  }
};
</script>
```

Наконец, мы можем переместить наш код, который у нас есть в хуке `mounted`, в метод `intersected`, который вызывается кастомным событием `intersect` на компоненте `Observer`.

```javascript
export default {
  data: () => ({ page: 1, items: [] }),
  methods: {
    async intersected() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${this.page}&_limit=50`
      );

      this.page++;
      const items = await res.json();
      this.items = [...this.items, ...items];
    }
  }
};
```

Имейте в виду, что мы должны увеличить страницу (переменная page). Кроме того, теперь мы должны добавить вновь полученный список items к уже существующему списку `this.items`. Мы делаем это используя spread оператор в строке: `this.items = [...this.items, ...items]`. Это эквивалентно более старому способу `this.items = this.items.concat(items)`.

Компонент бесконечной прокрутки, все вместе:

```markup
<!-- InfiniteScroll.vue -->
<template>
  <div>
    <ul>
      <li class="list-item" v-for="item in items" :key="item.id">{{item.name}}</li>
    </ul>
    <Observer @intersect="intersected"/>
  </div>
</template>

<script>
import Observer from "./Observer";

export default {
  data: () => ({ page: 1, items: [] }),
  methods: {
    async intersected() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${
        this.page      }&_limit=50`);

      this.page++;
      const items = await res.json();
      this.items = [...this.items, ...items];
    },
  },
  components: {
    Observer,
  },
};
</script>
```

### Заключение

Компонент бесконечной прокрутки - это хороший способ для пагинации данных, особенно на мобильных устройствах. С добавлением Intersection Observer API, это еще проще. В данной статье мы прошли все необходимые шаги, чтобы построить его самостоятельно.

Имейте в виду, что если вам нужно поддерживать старые браузеры, вам вероятно нужны [W3C’s Intersection Observer](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) и [Github’s fetch](https://github.com/github/fetch) полифиллы.

Вы можете посмотреть **демо** данного примера на [Codesandbox](https://codesandbox.io/s/kxm8wlnn85).

_Оригинальная статья: [Build an Infinite Scroll component using Intersection Observer API - Vue.js Tutorials](https://vueschool.io/articles/vuejs-tutorials/build-an-infinite-scroll-component-using-intersection-observer-api/)_
