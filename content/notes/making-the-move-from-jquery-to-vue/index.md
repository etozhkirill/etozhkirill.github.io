---
title: 'Переход с jQuery на Vue'
description: 'Как тот, кто использовал jQuery многие годы и недавно стал переходить на Vue, я подумал, что было бы интересно обсудить процесс миграции с одного на другой.'
image: 'assets/cover.jpeg'
date: '2019-06-04'
---

_Перевод [«Making the Move from jQuery to Vue»](https://css-tricks.com/making-the-move-from-jquery-to-vue/) Рэймонда Камдэна._

> Как тот, кто использовал jQuery многие годы и недавно стал переходить на Vue, я подумал, что было бы интересно обсудить процесс миграции с одного на другой.

Прежде чем начать, я хочу прояснить одну вещь. Я никоим образом не хочу запретить кому-либо использовать jQuery. Было довольно модно в последнее время, и черт возьми, я и сам написал нечто подобное несколько лет назад (["Как я (НЕ) использую jQuery"](https://www.telerik.com/blogs/im-not-using-jquery)). Если вы делаете что-то с jQuery, и ваши конечные пользователи успешно используют ваш сайт, то флаг вам в руки. Продолжайте использовать то, что вам подходит.

Это руководство в большей степени для людей с многолетним опытом использования jQuery, желающих узнать, как можно сделать те же вещи с помощью Vue. Имея это ввиду, я собираюсь сфокусироваться на том, что я считаю основными кейсами использования jQuery. Я не буду охватывать все возможные фичи, а вместо этого возьму подход "что я чаще всего делал с помощью jQuery" , который может быть более узнаваемым для людей собирающихся изучить Vue. (Замечу так же, что то как я пишу свои примеры - это просто один из способов выполнения задачи. jQuery и Vue предоставляют несколько способов достижения одной и той же цели, и это здорово!)

Имея это ввиду, давайте рассмотрим некоторые высокоуровневые вещи которые мы можем делать при помощи jQuery:

- Поиск чего-либо в DOM (и сделать что-либо с ним позже)
- Изменение чего-либо в DOM (например текст параграфа или класс кнопки)
- Чтение и изменение значений формы
- Валидация формы (что на самом деле является комбинацией пунктов выше)
- Ajax запросы и обработка результатов
- Обработка событий (например по клику на кнопку делать что-то)
- Измерение или изменение стилей элемента

Конечно, в jQuery существует больше возможностей, но это наиболее общие юзкейсы. Также заметьте что в списке выше много пересекающихся вещей. Итак, должны ли мы начать с простого сравнения по каждому пункту? Нет, не так быстро. Давайте начнем с рассмотрения основных отличий во Vue приложении.

### Инициализация Vue

Когда мы подключаем jQuery на страницу, мы обычно добавляем швейцарский нож в код JavaScript, чтобы покрывать типичные задачи веб разработки. Мы можем покрывать любые юзкейсы в любом порядке по своему усмотрению. Например, сегодня клиент может попросить валидацию формы, зачем через месяц или около того захотеть добавить ajax поиск в шапке сайта.

Vue имеет одно существенное отличие в данном случае. При запуске проекта с Vue, мы начинаем с определения места в DOM дереве, на котором мы хотим сфокусироваться. Итак, давайте рассмотрим простой прототип веб страницы:

```html
<body>
  <header>Fancy header stuff here</header>

  <div id="sidebar">Здесь некий сайдбар</div>

  <main>
    <p>Здесь главный контент...</p>
    <div id="loginForm">И конечно форма логина</div>
  </main>
</body>
```

В типичном jQuery приложении, мы можем написать код работающий с хедером, сайдбаром и формой логина или чем либо еще:

```javascript
$(document).ready(function () {
  $('header'); //...

  $('#sidebar'); //...

  $('#loginForm'); //...
});
```

Во Vue приложении мы сперва определяем с чем мы работаем. Представьте что наш клиент попросил сперва добавить валидацию на елемент `loginForm`. Наш Vue код будет выглядеть следующим образом:

```javascript
new Vue({
  el: '#loginForm'
  // Тут код...
});
```

Если позже клиент решит что-то добавить в сайдбар, мы просто добавляем второе Vue приложение:

```javascript
new Vue({
  el: '#loginForm'
  // Тут код...
});

new Vue({
  el: '#sideBar'
  // Тут код...
});
```

Это плохо? Абсолютно нет. Мы сразу же получаем преимущество инкапсуляции. Если мы случайно используем переменную с общим именем (мы все это делали), то можем не беспокоиться о конфликтах с другими частями нашего кода. Позже, когда клиент добавит новые требования, наличие наших уникальных наборов Vue, разделенных таким образом, дает нам больше спокойствия, что код не будет конфликтовать друг с другом.

Так что да, это хорошо. Но по началу это меня остановило, когда я только начал использовать Vue. Теперь пойдем дальше к нашим юзкесам.

### Поиск чего-либо в DOM

Еще один аспект который вы найдете интересным или страшным - это то как найти что-либо в DOM. Это немного расплывчато, но давайте рассмотрим пример. У нас есть кнопка, и по клику на нее мы что-то делаем. Ниже сокращенный пример того как это может выглядеть:

```html
<button id="myButton">Click Me!</button>
<!-- TODO... -->
<script>
  $(document).ready(function () {
    $('#myButton').click(function () {
      alert(1);
    });
  });
</script>
```

Теперь давайте сравним с тем, как это можно сделать на Vue:

```html
<div id="app">
  <button v-on:click="doSomething">Click Me!</button>
</div>

<script>
  const app = new Vue({
    el: '#app',
    methods: {
      doSomething: function () {
        alert(1);
      }
    }
  });
</script>
```

Vue приложение немного более многословно, но обратите внимание как разметка имеет прямую связь с действием ("click") и функцией которая будет вызвана. Vue код не имеет связи с DOM (вне части `el`, где мы определяем его место работы). Это было одной из вещей которую мне смог продать Vue, потому что так проще описать то что происходит. Так же мне  не нужно было беспокоиться о значении ID и селекторов. Если я изменю класс или ID кнопки, мне не нужно возвращаться в мой код и беспокоиться об обновлении селекторов.

Давайте рассмотрим другой пример: поиск и изменение текста в DOM. Представьте кнопку по клику на которою меняется текст в другой части DOM.

```html
<button id="myButton">Click Me!</button>
<span id="result"></span>

<!-- TODO... -->

<script>
  $(document).ready(function () {
    $('#myButton').click(function () {
      $('#result').text('You clicked me, thanks!');
    });
  });
</script>
```

Я добавил новый span и теперь, когда кнопка нажата, мы используем другой селектор, чтобы найти его и используем метод jQuery для изменения текста внутри. Теперь рассмотрим версию на Vue:

```html
<div id="app">
  <button v-on:click="doSomething">Нажми на меня!</button>
  <!-- По клику изменяем текст в span -->
  <span>{{resultText}}</span>
</div>

<script>
  const app = new Vue({
    el: '#app',
    data: {
      resultText: ''
    },
    methods: {
      doSomething: function () {
        this.resultText = 'Вы нажали на меня, спасибо!';
      }
    }
  });
</script>
```

В данном примере мы используем язык шаблонов Vue, чтобы определить, что мы хотим отрендерить переменную внутри span, которая является `resultText` в данном случае. Теперь когда кнопка нажата, мы изменяем значение и текст внутри span меняется автоматически.

> Vue поддерживает скоращение для `v-on` атрибута, так кнопка в примере может быть переписана с `@click="doSomething"`.

### Чтение и запись значений формы

Работая с формами вероятно одна из наиболее распространенных и полезных вещей, которые мы делаем с помощью JavaScript. Даже до JavaScript, большая часть моей ранней "веб разработки" заключалась в написании Perl скриптов для обработки представлений форм. Как главный способ принятия пользовательского ввода, формы всегда были критически важны для веба, и это, вероятно, так и останется в течение довольно длительного времени. Давайте рассмотрим простой пример на jQuery с чтением нескольких полей формы и установки других:

```html
<form>
  <input type="number" id="first" /> + <input type="number" id="second" /> =
  <input type="number" id="sum" />
  <button id="sumButton">Sum</button>
</form>

<script>
  $(document).ready(function () {
    let $first = $('#first');
    let $second = $('#second');
    let $sum = $('#sum');
    let $button = $('#sumButton');
    $button.on('click', function (e) {
      e.preventDefault();
      let total = parseInt($first.val(), 10) + parseInt($second.val(), 10);
      $sum.val(total);
    });
  });
</script>
```

Данный код показывает как jQuery может читать и изменять значения с помощью [метода val()](https://api.jquery.com/val/#val). В итоге мы получаем 4 элемента из DOM дерева (все три поля формы и кнопку) и используем простую математику чтобы получить результат.

Теперь давайте рассмотрим версию на Vue:

```html
<form id="myForm">
  <input type="number" v-model.number="first" /> +
  <input type="number" v-model.number="second" /> =
  <input type="number" v-model="sum" />
  <button @click.prevent="doSum">Sum</button>
</form>

<script>
  new Vue({
    el: '#myForm',
    data: {
      first: 0,
      second: 0,
      sum: 0
    },
    methods: {
      doSum: function () {
        this.sum = this.first + this.second;
      }
    }
  });
</script>
```

Данный пример представляет некоторые интересные сокращения Vue. Во первых, [v-model](https://vuejs.org/v2/api/#v-model) это то как Vue создает двухсторонний дата биндинг между значениями в DOM и JavaScript. Блок переменных `data` будет автоматически синхронизирован с полями формы. Изменение в data повлечет изменение в форме и наоборот. Флаг `.number` обрабатывает стоковые значения полей формы как числа. Если мы уберем это флаг и оставим сложение как есть, то мы получим конкатенацию строк, а не арифметику. Я работаю с JavaScript почти столетие и все равно лажаю.

Еще одна полезна фишка это `@click.prevent`. Сперва, `@click` определяет обработчик клика на кнопке, затем `.prevent` блокирует дефолтное поведение браузера по отправке формы (аналогично [event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)).

Финальная часть - это добавление метода `doSum`, которые связан с кнопкой. Заметим что это просто работает с data переменными (которые Vue делает доступными в `this`).

Хотя в основном это мое личное мнение, мне действительно нравится отсутствие выборки селекторов в скрипте, когда мы пишем на Vue, и как в HTML становится ясно, что мы делаем.

В итоге, мы можем даже полностью избавится от кнопки:

```html
<form id="myForm">
  <input type="number" v-model.number="first" /> +
  <input type="number" v-model.number="second" /> =
  <input type="number" v-model="sum" />
</form>

<script>
  new Vue({
    el: '#myForm',
    data: {
      first: 0,
      second: 0
    },
    computed: {
      sum: function () {
        return this.first + this.second;
      }
    }
  });
</script>
```

Одна из наикрутейших фич Vue - это вычисляемые свойства. Они являются виртуальными значениями, которые распознают когда их полученные значения изменены. В коде выше, как только любое из двух полей формы изменится, сумма будет обновлена. Это так же работает вне формы. Мы можем отрендерить сумму так:

```html
The total is {{sum}}.
```

### Работа с Ajax

Похвально то, насколько просто в jQuery сделана работа с Ajax. Фактически, я могу сказать, что я сделал Ajax запрос традиционным способом наверное всего один раз. (Если вам любопытно, вы можете посмотреть спецификацию [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) и, вероятно, будете счастливы избавить себя от этого.) Простой метод jQuery `$.get(...)` работает в большинстве случаев, и когда необходимо более сложное решение, `$.ajax()` делает это так же легко. Еще одна вещь, которую jQuery сделал хорошо - это то, как он обрабатывает JSONP запросы. Хотя теперь это в основном не нужно с появлением CORS, JSONP был способом обработки запросов к API на разных доменах.

Итак, что же Vue делает для упрощения Ajax запросов? Ничего!

Звучит страшно, но на самом деле это не так. Существует множество вариантов для работы с  HTTP запросами, и Vue выбрал более агностический путь, позволив нам, разработчикам, решать как мы хотим управлять этим. Так что да, это означает немного больше работы, но у нас есть несколько отличных вариантов.

Сперва рассмотрим [Axios](https://github.com/axios/axios). Это библиотека основанная на промисах, которая очень популярна в среде Vue сообщества. Это простой пример (взятый из их README файла):

```javascript
axios
  .get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
```

Axios конечно же поддерживает POST запросы и позволяет нам определять заголовки в числе многих других опций.

Пока Axios очень популярен среди Vue разработчиков, это не является чем-то что действительно зацепило меня. (По крайней мере пока.) Вместо этого я был гораздо большим поклонником [Fetch](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch). Fetch не является внешней библиотекой, это веб стандарт обработки HTTP запросов. Fetch имеет [очень хорошую поддержку примерно в 90% браузеров](https://caniuse.com/#feat=fetch), тем не менее это не означает что его абсолютно безопасно использовать, но мы всегда можем использовать полифил.

> Хотя это полностью выходит за рамки того, что мы здесь обсуждаем, Кингсли Сайлас написал превосходный [гайд по использованию Axios и Fetch с React](https://css-tricks.com/using-data-in-react-with-the-fetch-api-and-axios/).

Так же как и Axios, Fetch основан на промисах и имеет доступный API:

```javascript
fetch('http://example.com/movies.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    console.log(JSON.stringify(myJson));
  });
```

Axios и Fetch покрывают все типы HTTP запросов, так что любой из них будет соответствовать любому количеству потребностей. Давайте рассмотрим простое сравнение. Ниже простое демо на jQuery, использующее [Star Wars API](https://swapi.co/).

```html
<h1>Star Wars Films</h1>
<ul id="films"></ul>

<script>
  $(document).ready(function () {
    $.get('https://swapi.com/api/films', function (res) {
      let list = '';
      res.results.forEach(function (r) {
        list += `<li>${r.title}</li>`;
      });
      $('#films').html(list);
    });
  });
</script>
```

В примере выше я использую `$.get` , чтобы дернуть API и вернуть список фильмов. Затем я генерирую список заголовков тегами `li` и вставляю все в блок `ul`.

Теперь давайте рассмотрим этот пример с использованием Vue:

```html
<div id="app">
  <h1>Star Wars Films</h1>
  <ul>
    <li v-for="film in films">{{film.title}}</li>
  </ul>
</div>

<script>
  const app = new Vue({
    el: '#app',
    data: {
      films: []
    },
    created() {
      fetch('https://swapi.com/api/films')
        .then((res) => res.json())
        .then((res) => {
          this.films = res.results;
        });
    }
  });
</script>
```

Вероятно лучшая часть этого примера - это использование директивы `v-for` в шаблоне. Обратите внимание, что Vue не связан с разметкой (ну по крайней мере JavaScript). Данные получены из API. Они присваиваются переменной. Разметка отображает эти данные. Я всегда ненавидел наличие HTML в моем JavaScript, и хотя для этого существуют решения с jQuery, обработка во Vue делает это более натурально.

### Полный (немного тривиальный) пример

Давайте рассмотрим более реальный пример. Наш клиент попросил нас сделать некий интерфейс для Ajax поиска c использованием API продуктов. Список особенностей включает:

- Поддержку фильтрации по имени и категории продукта
- Валидацию формы, так что мы можем подставить поисковый запрос или категорию
- Пока выполняется запрос к API, показывать сообщение пользователю и деактивировать кнопку отправки
- Когда запрос выполнен, обработать отчет о том что продукты не были найдены или показать список совпадений

Давайте начнем с jQuery версии. Сперва HTML:

```html
<form>
  <p>
    <label for="search">Search</label>
    <input type="search" id="search" />
  </p>
  <p>
    <label for="category">Category</label>
    <select id="category">
      <option></option>
      <option>Food</option>
      <option>Games</option>
    </select>
  </p>
  <button id="searchBtn">Search</button>
</form>

<div id="status"></div>
<div id="results"></div>
```

Есть форма с двумя фильтрами и двумя div. Один из них используется как временный статус когда идет поиск или для отчета об ошибке, и другой для рендеринга результата. Теперь давайте посмотрим на код.

```javascript
const productAPI =
  'https://wt-c2bde7d7dfc8623f121b0eb5a7102930-0.sandbox.auth0-extend.com/productSearch';

$(document).ready(() => {
  let $search = $('#search');
  let $category = $('#category');
  let $searchBtn = $('#searchBtn');
  let $status = $('#status');
  let $results = $('#results');

  $searchBtn.on('click', (e) => {
    e.preventDefault();

    // First clear previous stuff
    $status.html('');
    $results.html('');

    // OK, now validate form
    let term = $search.val();
    let category = $category.val();
    if (term === '' && category === '') {
      $status.html('You must enter a term or select a category.');
      return false;
    }

    $searchBtn.attr('disabled', 'disabled');
    $status.html('Searching - please stand by...');

    $.post(productAPI, { name: term, category: category }, (body) => {
      $searchBtn.removeAttr('disabled');
      $status.html('');

      if (body.results.length === 0) {
        $results.html('<p>Sorry, no results!</p>');
        return;
      }

      let result = '<ul>';
      body.results.forEach((r) => {
        result += `<li>${r.name}</li>`;
      });
      result += '</ul>';
      $results.html(result);
    });
  });
});
```

Код начинается с установки переменных для каждого DOM элемента, с которым мы хотим работать - поля формы, кнопки и дивы. Ядро логики связано с обработкой клика по кнопке. Мы валидируем данные, и, если все OK, отправляем POST запрос к API. Когда получен результат, мы либо отображаем результат, либо показываем сообщение, что ничего не найдено.

Вы можете работать с полной версией данного demo используя CodePen ниже.

<p>
<iframe height="300" style="width: 100%;" scrolling="no" title="jQuery Full" src="https://codepen.io/cfjedimaster/embed/MRezop?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/cfjedimaster/pen/MRezop">
  jQuery Full</a> by Raymond Camden (<a href="https://codepen.io/cfjedimaster">@cfjedimaster</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
</p>

Теперь давайте рассмотрим Vue версию. И вновь начнем с разметки:

```html
<div id="app">
  <form>
    <p>
      <label for="search">Search</label>
      <input type="search" v-model="search" />
    </p>
    <p>
      <label for="category">Category</label>
      <select v-model="category">
        <option></option>
        <option>Food</option>
        <option>Games</option>
      </select>
    </p>
    <button @click.prevent="searchProducts" :disabled="searchBtnDisabled">
      Search
    </button>
  </form>

  <div v-html="status"></div>
  <ul v-if="results">
    <li v-for="result in results">{{result.name}}</li>
  </ul>
</div>
```

Изменения выше включают в себя:

- Обертка разметки в div, который сообщает Vue где он будет работать.
- Использование `v-model` для полей формы, чтобы сделать проще работу с данными.
- Использование `@click.prevent`, чтобы вызвать обработку главной поисковой операции.
- Использование `:disabled` для связи того, будет ли кнопка отключена или нет со значением во Vue приложении (мы увидим это в действии через мгновение).
- Значение статуса немного другое, по сравнению с предыдущими примерами. В то время как jQuery имеет особый метод для установки текста в DOM элемент и другой метод для установки HTML, Vue требует использования `v-html` директивы, когда мы назначаем HTML в качестве значения, которое собираемся отрендерить. Если мы попытаемся отренедрить HTML в `{{status}}`, теги будут опущены.
- И наконец, используем `v-if` для условного рендеринга списка результатов с помощью директивы `v-for`.

Теперь давайте посмотрим на код.

```javascript
const productAPI =
  'https://wt-c2bde7d7dfc8623f121b0eb5a7102930-0.sandbox.auth0-extend.com/productSearch';

const app = new Vue({
  el: '#app',
  data: {
    search: '',
    category: '',
    status: '',
    results: null,
    searchBtnDisabled: false
  },
  methods: {
    searchProducts: function () {
      this.results = null;
      this.status = '';

      if (this.search === '' && this.category === '') {
        this.status = 'You must enter a term or select a category.';
        return;
      }

      this.searchBtnDisabled = true;
      this.status = 'Searching - please stand by...';

      fetch(productAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: this.search, category: this.category })
      })
        .then((res) => res.json())
        .then((res) => {
          this.status = '';
          this.searchBtnDisabled = false;
          this.results = res.results;
          if (this.results.length === 0)
            this.status = '<p>Sorry, no results!</p>';
        });
    }
  }
});
```

Первый блок `data` устанавливает необходимые нам поля, некоторые из которых предназначены для результата, статусных сообщений и другого в этом роде. Метод `searchProducts` по большей части обрабатывает то же самое что и в jQuery версии, за исключением гораздо меньшего кода, напрямую связанного с DOM. Например, имея массив данных, сам код не беспокоится о рендеринге. Он просто меняет значение переменной и шаблон вызывает рендеринг этих данных. В данном случае, по сравнению с  jQuery кодом,  JavaScript больше занимается логикой, и это разделение ответственности гораздо более приятно.

Как и раньше, у меня есть для вас CodePen, чтобы вы могли попробовать это самостоятельно:

<p>
<iframe height="300" style="width: 100%;" scrolling="no" title="Vue Full" src="https://codepen.io/cfjedimaster/embed/wZWQLz?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/cfjedimaster/pen/wZWQLz">
  Vue Full</a> by Raymond Camden (<a href="https://codepen.io/cfjedimaster">@cfjedimaster</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
</p>

### Смерть jQuery! Да здравствует Vue!

Ладно, это пожалуй уже через чур. Как я сказал в начале, я абсолютно уверен, что вы не должны ничего менять, если вам нравится работать с jQuery и это работает для вас.

Однако, я могу сказать, что Vue ощущается как "следующий шаг" для людей, которые обычно работают с jQuery. Vue поддерживает сложные приложения и имеет великолепный CLI для скаффолдинга и сборки проектов. Но для более простых задач, Vue работает как превосходная замена jQuery, которую я выбрал в качестве своего инструмента разработки!

Чтобы посмотреть на другой взгляд использования Vue вместо jQuery, почитайте статью Сары Дразнер ["Замена jQuery на Vue.js: Сборка не требуется"](https://www.smashingmagazine.com/2018/02/jquery-vue-javascript/), потому что она включает несколько других очень полезных примеров.
