---
title: 'Создаем кастомные инпуты с Vue.js'
description: 'Компонент-ориентированные библиотеки или фреймворки, такие как Vue, дали нам удивительные возможности для создания переиспользуемых компонентов, чтобы мы могли использовать их в своих приложениях, обеспечивая при этом их совместимость и (надеемся) простоту использования.'
image: 'assets/cover.jpeg'
date: '2018-07-24'
---

Компонент-ориентированные библиотеки или фреймворки, такие как Vue, дали нам удивительные возможности для создания переиспользуемых компонентов, чтобы мы могли использовать их в своих приложениях, обеспечивая при этом их совместимость и (надеемся) простоту.

В частности, элементы форм, как правило, имеют множество усложнений, которые вы хотели бы скрыть в компонент, такие как [кастомный дизайн](https://codepen.io/AngelaVelasquez/pen/Eypnq), лэйблы, валидация, подсказки, и хочется быть уверенным, что каждая из этих частей находится в правильной последовательности и отображается корректно.

Vue имеет встроенную директиву `v-model`, которая **симулирует двухсторонний биндинг** путем связывания значения и захвата события ввода. Если вы собираетесь создать кастомный компонент формы, то вы определенно захотите реализовать поддержку директивы `v-model`.

К сожалению, когда я смотрел на примеры кастомных инпутов на Vue для радио-кнопок или чекбоксов, они или не предоставляли директиву `v-model`, или она работала некорректно. Есть достойная [документация для кастомных текстовых полей ввода](https://ru.vuejs.org/v2/guide/components-custom-events.html#%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-v-model-%D1%83-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0), но так как там не объясняется кастомизация радио-кнопок или чекбоксов, мы обсудим это здесь.

**Данное руководство поможет вам...**

1. Понимать как `v-model` работает на нативных инпутах, фокусируясь в первую очередь на радио-кнопках и чекбоксах

2. Понимать как `v-model` работает на кастомных компонентах по-умолчанию

3. Изучить как создать кастомный чекбокс и радио-кнопку, чтобы эмулировать на них то, как бы `v-model` работал нативно

_Краткое примечание перед началом работы:_ ES2015+ будет использоваться во всех примерах кода. Я так же буду использовать синтаксис [однофайловых компонентов](https://ru.vuejs.org/v2/guide/single-file-components.html) над использованием `Vue.components` или `new Vue`.

### **Как обычно работает v-model?**

Официальная [документация Vue](https://ru.vuejs.org/v2/guide/forms.html) на самом деле довольно хороша в данном вопросе, но есть несколько незначительных недоговорок. В любом случае, мы будем стараться довольно тщательно покрыть их здесь.

По сути, `v-model` - это просто сокращенная директива которая дает нам двухстороннее связывание данных, и код этой директивы зависит от того, на каком типе инпута она используется.

**Текстовые инпуты**

```markup
<input v-model="message" placeholder="edit me">
<p>Message: {{ message }}</p>

<!-- OR -->

<p>message:</p>
<p style="white-space: pre-line">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

При использовании текстовых инпутов (включая такие типы как `email`, `number` и т.п.) или `textarea`, `v-model="varName"` эквивалентно `:value="varName" @input="e => varName = e.target.value"`. Из этого следует, что значение инпута устанавливается переменной `varName` и после каждого изменения на инпуте переменная `varName` обновляется на соответствующее значение и наоборот.

### **Радио-кнопки**

Итак, что насчет радио-кнопок?

```markup
<input type="radio" value="One" v-model="picked">
<input type="radio" value="Two" v-model="picked">
<span>Picked: {{ picked }}</span>
```

Это эквивалентно:

```markup
<input type="radio" value="One" :checked="picked == 'One'" @change="e => picked = e.target.value">
<input type="radio" value="Two" :checked="picked == 'Two'" @change="e => picked = e.target.value">
<span>Picked: {{ picked }}</span>
```

Обратите внимание, что `v-model` больше не меняет `value`. Она все еще делает то же самое в обработчике события `change` (хотя событие было изменено на `change` вместо `input`), но теперь она определяет, что параметр `checked` должен быть true или false в зависимости от того совпадает ли `picked` со значением радио-кнопки.

### Чекбоксы

Чекбоксы немного сложнее, потому что они ведут себя по разному в зависимости от того используется один чекбокс с `v-model` или несколько.Если вы используете один чекбокс, `v-model` будет относиться к нему как к булевому значению и игнорировать `value`.

```markup
<input type="checkbox" value="foo" v-model="isChecked">
```

это то же самое, что...

```markup
<input type="checkbox" value="foo" :checked="!!isChecked" @change="e => isChecked = e.target.checked">
```

Если вы хотите, чтобы были другие значения вместо `true` и `false`, вы можете использовать атрибуты `true-value` и `false-value`, которые контролируют какие значения вашей модели будут установлены, в зависимости от того нажат чекбокс или нет.

```markup
<input type="checkbox" value="foo" v-model="isChecked" true-value="1" false-value="0">
```

это то же самое, что...

```markup
<input type="checkbox" value="foo" :checked="isChecked == '1'" @change="e => isChecked = e.target.checked ? '1' : '0'">
```

Если у вас несколько чекбоксов, совместно использующих модель, то они будут заполнять массив со значениями выбранных чекбоксов, но убедитесь что модель, которую вы передали, является массивом, иначе вы получите странное поведение. Так же, атрибуты `true-value` и `false-value` больше не будут ни на что влиять.

```markup
<template>
  <div>
    <input type="checkbox" value="foo" v-model="checkedVals">
    <input type="checkbox" value="bar" v-model="checkedVals">
    <input type="checkbox" value="baz" v-model="checkedVals">
  </div>
</template>
<script>
  export default {
    data: () => ({
      checkedVals: ['bar']
    })
  }
</script>
```

Эквивалент немного сложнее держать внутри шаблона, поэтому я перенесу часть логики в методы компонента:

```markup
<template>
  <div>
    <input type="checkbox" value="foo" v-model="checkedVals">
    <input type="checkbox" value="bar" v-model="checkedVals">
    <input type="checkbox" value="baz" v-model="checkedVals">
  </div>
</template>
<script>
  export default {
    data() {
      return { checkedVals: ['bar'] }
    },
    methods: {
      shouldBeChecked(val) {
        return this.checkedVals.includes(val)
      },
      updateVals(e) {
        let isChecked = e.target.checked        let val = e.target.value        if (isChecked) {
          this.checkedVals.push(val)
        } else {
          this.checkVals.splice(this.checkedVals.indexOf(val), 1)
        }
      }
    }
  }
</script>
```

Это намного сложнее, чем то, что мы видели ранее, но если вы разобьете это на части, это не покажется таким уж сложным. `shouldBeChecked` есть `true` когда массив со значениями чекбоксов включает текущее значение и `false` в противном случае. `updateVals` добавляет значение чекбокса в массив модели, когда тот выбран, и удаляет значение из модели когда чекбокс не выбран.

### Как v-model работает на компонентах?

Поскольку Vue не знает, как должен работать ваш компонент, или если пытается действовать как замена для некоторого типа инпута, оно обрабатывает все компоненты относительно `v-model`. На самом деле он работает точно так же, как и для текстовых инпутов, за исключением того, что в обработчике событий он не ожидает, что ему будет передан объект события, скорее он ожидает что значение будет передано напрямую.

И так...

```markup
<my-custom-component v-model="myProperty" />
```

...это то же самое, что...

```markup
<my-custom-component :value="myProperty" @input="val => myProperty = val" />
```

Компонент может немного изменить это поведение, используя свойство `model`:

```javascript
export default {
  name: 'my-custom-component',
  model: {
    prop: 'foo',
    event: 'bar'
  }
  // ...
};
```

`v-model` будет смотреть на эти свойства и вместо использования атрибута `value` будет использовать атрибут, который вы определили в `prop`, а так же вместо события `input` будет прослушивать событие которое вы определили в `event`. Таким образом, приведенный выше пример `my-custom-component` фактически будет следующим:

```markup
<my-custom-component :foo="myProperty" @bar="val => myProperty = val" />
```

Прекрасно, но если мы делаем кастомную радио-кнопку или чекбокс, это не очень хорошо работает. Однако, мы можем переместить логику, которую `v-model` использует на радио-кнопках и чекбоксах, внутрь наших кастомных компонентов.

### Поддержка v-model на кастомных радио-кнопках

По сравнению с чекбоксами, кастомные радиокнопки довольно просты. Вот базовая кастомная радио-кнопка, которую я разрабатываю, просто оборачивая `input` в `label`, которая принимает свойство `label` чтобы добавить текст лэйбла.

```markup
<template>
  <label>
    <input type="radio" :checked="shouldBeChecked" :value="value" @change="updateInput">
    {{ label }}
  </label>
</template>
<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    value: {
      type: String,
    },
    modelValue: {
      default: ""
    },
    label: {
      type: String,
      required: true
    },
  },
  computed: {
    shouldBeChecked() {
      return this.modelValue == this.value    }
  }
  methods: {
    updateInput() {
      this.$emit('change', this.value)
    }
  }
}
</script>
```

*Замечание:* Я включил только те `props`, которые полезны для объяснения того, как они должны работать с `v-model`, но теги `input` могут принимать другие атрибуты (такие как `name` или `disabled`), поэтому убедитесь, что вы добавили все свойства, которые будут вам нужны и передали их в компонент. Вы так же захотите рассмотреть доступность, добавив [WAI-ARIA атрибуты](https://www.w3.org/WAI/intro/aria), а так же использовать [слоты](https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots) для добавления контента.

Вы можете поодумать, что поскольку я не включил `name` в данный пример, группы радио-кнопок не будут синхронизироваться друг с другом. Фактически, обновление модели, в свою очередь, обновит другие ради-кнопки, которые предоставляются для данной модели, таким образом, они не нуждаются в параметре name (как в обычных HTML формах) пока используют одну и ту же модель.

### Поддержка v-model на кастомных чекбоксах

Создание кастомных чекбоксов намного сложнее чем радио-кнопок, в первую очередь потому что мы должны поддерживать два различных варианта использования: единственный true/false чекбокс (который может использовать `true-value` и/или `false-value`) и несколько чекбоксов, что комбинируют все выбранные значения в массив.

Итак, как мы определяем, каждый вариант использования? Вы можете подумать что нам нужно определять, если есть другие чекбоксы с тем же атрибутом `name`, но на самом деле встроенная система Vue это не использует. Так же, как в случае радикнопок, Vue вообще не принимает во внимание атрибут `name`. Это используется только при нативной отправке формы. Таким образом вы можете подумать, что Vue определяет это на основе того, есть ли другие чекбоксы, которые используют одну и ту же модель, но и это не так. Это определяется тем, является ли модель массивом. Вот и все.

Таким образом, код будет структурирован аналогично коду кастомной радио-кнопки, но внутри `shouldBeChecked` и `updateInput` логика будет поделена в зависимости от того является `modelValue` массивом или нет.

```markup
<template>
  <label>
    <input type="checkbox" :checked="shouldBeChecked" :value="value" @change="updateInput">
    {{ label }}
  </label>
</template>
<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    value: {
      type: String,
    },
    modelValue: {
      default: false
    },
    label: {
      type: String,
      required: true
    },
    // Мы установили `true-value` и `false-value` в true и false по-умолчанию, таким образом
    // мы всегда можем использовать их вместо проверки на то, установлены они или нет.
    // Также здесь мы можем использовать camelCase, дефис разделяющий имя атрибута
    // все равно будет работать
    trueValue: {
      default: true
    },
    falseValue: {
      default: false
    }
  },
  computed: {
    shouldBeChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }
      // Обратите внимание, что `true-value` и` false-value` являются camelCase в JS
      return this.modelValue === this.trueValue    }
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue]

        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }

        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    }
  }
}
</script>
```

И вот у нас это поучилось. Однако возможно лучше разделить этот код на два разных компонента: один для обработки переключателя true/false, а другой для использования списка параметров. Это позволит более точно следовать принципу единой ответственности, но если вы ищете замену чекбоксам, это то что вам нужно (плюс добавление всех других полезных атрибутов и пользовательских функций, которые вам могут понадобиться).

_Оригинальная статья: [Creating Custom Inputs With Vue.js — Smashing Magazine](https://www.smashingmagazine.com/2017/08/creating-custom-inputs-vue-js/)_
