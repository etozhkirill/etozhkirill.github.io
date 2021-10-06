---
title: 'Mongoose - Схемы'
description: 'Все в Mongoose начинается со схемы. Каждая схема соответствует коллекции MongoDB и определяет форму документов в этой коллекции.'
image: 'assets/cover.jpeg'
date: '2018-04-07'
---

Если вы еще этого не сделали, пожалуйста уделите минуту времени и прочитайте [быстрый старт](http://5.63.153.240:3000/notes/mongoose), чтобы иметь представление о том как работает mongoose. Если вы переходите с 4й версии на 5ю, пожалуйста найдите время, чтобы почитать [руководство по миграции](https://github.com/Automattic/mongoose/blob/master/migrating_to_5.md).

### Определение схемы

Все в Mongoose начинается со схемы. Каждая схема соответствует коллекции MongoDB и определяет форму документов в этой коллекции.

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});
```

Если вы хотите позже добавить дополнительные ключи, то используйте метод `Schema.add`.

Каждый ключ в `blogSchema` определяет свойство в наших документах, которое будет приведено к его связанному [типу схемы](http://mongoosejs.com/docs/api.html#schematype_SchemaType). Например, мы определили свойство `title` которое будет приведено к типу `String` и свойство `date` которое будет приведено к типу `Date`. Ключами также могут быть назначены вложенные объекты, содержащие определения ключ/значение, как свойство `meta` выше.

Типы схем:

- String

- Number

- Date

- Buffer

- Boolean

- Mixed

- ObjectId

- Array

Читайте больше о [типах схем здесь](http://mongoosejs.com/docs/schematypes.html).

Схемы определяют не только структуру вашего документа и распределение свойств, они также определяют методы экземпляра, статические методы модели, составные индексы и хуки жизненного цикла документа, называемые middleware.

### Создание модели

Чтобы использовать определение нашей схемы, нам нужно преобразовать нашу `blogSchema` в модель, чтобы в дальнейшем работать с ней. Для этого мы передаем ее в `mongoose.model(modelName, schema)`:

```javascript
var Blog = mongoose.model('Blog', blogSchema);
// готово к работе!
```

### Методы экземпляра

Экземпляры класса `Models` являются документами. Они имеют много встроенных методов. Мы также можем определять свои кастомные методы.

```javascript
// определение схемы
var animalSchema = new Schema({ name: String, type: String });

// добавляем кастомный метод в нашу схему animalSchema
animalSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Animal').find({ type: this.type }, cb);
};
```

Теперь все экземпляры `animal` имеют доступный им метод `findSimilarTypes`.

```javascript
var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({ type: 'dog' });

dog.findSimilarTypes(function (err, dogs) {
  console.log(dogs); // гав
});
```

- Перезапись дефолтных методов документа может привести к непредсказуемым результатам. Подробнее [читать здесь](http://mongoosejs.com/docs/api.html#schema_Schema.reserved).

- **Не определяйте** методы используя стрелочные функции ES6 (`=>`). Стрелочные функции [предотвращают привязку this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_binding_of_this), поэтому ваши методы не будут иметь доступа к документу и приведенный выше пример не будет работать.

### Статические методы.

Добавить статический метод в модель также просто. Продолжим это с нашей `animalSchema`:

```javascript
// добавление статического метода в нашу animalSchema
animalSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

var Animal = mongoose.model('Animal', animalSchema);
Animal.findByName('fido', function (err, animals) {
  console.log(animals);
});
```

Так же **не нужно определять** статические методы используя стрелочные функции.

### Хэлперы запросов

Вы также можете добавить функции хелперы запросов, подобные методам экземпляра, но для mongoose запросов. Хэлперы запросов позволяют вам расширить цепочку запросов в API.

```javascript
animalSchema.query.byName = function (name) {
  return this.find({ name: new RegExp(name, 'i') });
};

var Animal = mongoose.model('Animal', animalSchema);
Animal.find()
  .byName('fido')
  .exec(function (err, animals) {
    console.log(animals);
  });
```

### Индексы

MongoDB поддерживает вторичные индексы. C mongoose мы определяем эти индексы в нашей схеме на уровне [Schema.path](http://mongoosejs.com/docs/api.html#schematype_SchemaType-unique) или `shema`. Определение индексов на уровне shema нужно при создании составных индексов.

```javascript
var animalSchema = new Schema({
  name: String,
  type: String,
  tags: { type: [String], index: true } // уровень поля
});

animalSchema.index({ name: 1, type: -1 }); // уровень схемы
```

Когда ваше приложение запускается, Mongoose автоматически вызывает `createIndex` для каждого определения индекса в вашей схеме. Mongoose будет вызывать `createIndex` для каждого индекса последовательно, и запускать событие модели 'index', когда все вызовы `createIndex` завершены или когда произошла ошибка. Это хорошо для разработки, но рекомендуется отключать это поведение на продакшне, так как создание индекса может значительно влиять на производительность. Отключите данное поведение, установив опцию `autoIndex` вашей схемы в`false` или глобально в методе `mongoose.connection`.

```javascript
mongoose.connect('mongodb://user:pass@localhost:port/database', { autoIndex: false });
// или
mongoose.createConnection('mongodb://user:pass@localhost:port/database', { autoIndex: false });
// или
animalSchema.set('autoIndex', false);
// или
new Schema({..}, { autoIndex: false });
```

Mongoose будет вызывать событие `index` у модели когда построение индексов завершено или произошла ошибка.

```javascript
// Вызовет ошибку, потому что mongodb имеет индекс _id по умолчанию
// не является sparse
animalSchema.index({ _id: 1 }, { sparse: true });
var Animal = mongoose.model('Animal', animalSchema);

Animal.on('index', function (error) {
  // "_id индекс не может быть sparce"
  console.log(error.message);
});
```

### Виртуальные свойства

Виртуальные свойства - это свойства, которые вы можете установить и получить, но они не сохраняются в MongoDB. Геттеры используются для форматирования или комбинирования полей, в то время как сеттеры полезны для декомпозиции одного значения в множественные значения для сохранения.

```javascript
// определение схемы
var personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});

// преобразование в модель
var Person = mongoose.model('Person', personSchema);

// создание документа
var ivan = new Person({
  name: { first: 'Иван', last: 'Пупкин' }
});
```

Предположим вы хотите вывести полное имя человека. Вы могли бы это сделать так:

```javascript
console.log(ivan.name.first + ' ' + ivan.name.last); // Иван Пупкин
```

Но объединение каждый раз имени и фамилии может быть громоздким. И что если вы хотите сделать некоторые дополнительные обработки имени, например удаление диакритики? Геттер виртуального свойства позволит вам определить свойство `fullName`, которое не будет сохраняться в MongoDB.

```javascript
personSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});
```

Теперь mongoose будет вызывать ваш геттер каждый раз, когда вы будете запрашивать свойство `fullName`:

```javascript
console.log(ivan.fillName); // Иван Пупкин
```

Если вы используете `toJSON()` или `toObject()` (или используете `JSON.stringify()` для mongoose документа) mongoose не будет включать виртуальные свойства по умолчанию. Передайте `{virtuals: true}` в каждый вызов `toObject()` или `toJSON()`.

Вы можете также добавить кастомный сеттер в ваше виртуальное свойство, что позволит вам установить имя и фамилию при помощи `fullName`.

```javascript
personSchema
  .virtual('fullName')
  .get(function () {
    return this.name.first + ' ' + this.name.last;
  })
  .set(function (v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });

ivan.fullName = 'Иван Иванов'; // Теперь `ivan.name.last` это "Иванов"
```

Виртуальные свойства нельзя использовать как часть запросов и для выбора поля, поскольку они не хранятся в MongoDB, это не будет работать.

### Алиасы

Алиасы являются особым типом виртуального свойства где геттер и сеттер незаметно для пользователя получают и устанавливают другое свойство. Это удобно для экономии пропускной способности сети, таким образом вы можете конвертировать короткое имя свойства, хранящееся в базе данных, в более удобочитаемое.

```javascript
var personSchema = new Schema({
  n: {
    type: String,
    // Теперь запрашивая/устанавливая свойство 'name' будет получено/установлено значение свойства 'n'
    alias: 'name'
  }
});

var person = new Person({ name: 'Val' });
console.log(person); // { n: 'Val' }
console.log(person.toObject({ virtuals: true })); // { n: 'Val', name: 'Val' }
console.log(person.name); // "Val"

person.name = 'Not Val';
console.log(person); // { n: 'Not Val' }
```

### Опции

Схемы имеют несколько настраиваемых параметров, которые могут быть переданы в конструктор или установлены с помощью метода `set`.

```javascript
new Schema({..}, options);

// или

var schema = new Schema({..});
schema.set(option, value);
```

Действующие опции:

- [autoIndex](http://mongoosejs.com/docs/guide.html#autoIndex)

- [bufferCommands](http://mongoosejs.com/docs/guide.html#bufferCommands)

- [capped](http://mongoosejs.com/docs/guide.html#capped)

- [collection](http://mongoosejs.com/docs/guide.html#collection)

- [id](http://mongoosejs.com/docs/guide.html#id)

- [\_id](http://mongoosejs.com/docs/guide.html#_id)

- [minimize](http://mongoosejs.com/docs/guide.html#minimize)

- [read](http://mongoosejs.com/docs/guide.html#read)

- [shardKey](http://mongoosejs.com/docs/guide.html#shardKey)

- [strict](http://mongoosejs.com/docs/guide.html#strict)

- [strictQuery](http://mongoosejs.com/docs/guide.html#strictQuery)

- [toJSON](http://mongoosejs.com/docs/guide.html#toJSON)

- [toObject](http://mongoosejs.com/docs/guide.html#toObject)

- [typeKey](http://mongoosejs.com/docs/guide.html#typeKey)

- [validateBeforeSave](http://mongoosejs.com/docs/guide.html#validateBeforeSave)

- [versionKey](http://mongoosejs.com/docs/guide.html#versionKey)

- [collation](http://mongoosejs.com/docs/guide.html#collation)

- [skipVersioning](http://mongoosejs.com/docs/guide.html#skipVersioning)

- [timestamps](http://mongoosejs.com/docs/guide.html#timestamps)

### Плагины

Схемы также поддерживают [плагины](http://mongoosejs.com/docs/plugins.html), что позволяет нам упаковывать повторно используемые функции в плагины, которые могут быть разделены с сообществом или использоваться только вашими проектами.

### Следующий шаг

Теперь, когда мы рассмотрели схемы, давайте взглянем на [типы схем](http://mongoosejs.com/docs/schematypes.html).

_Оригинальная статья: [Mongoose v6.0.9: Schemas](http://mongoosejs.com/docs/guide.html)_
