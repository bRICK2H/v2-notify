# V2Notify

### Init
```js
import V2Notify from 'v2-notify'
Vue.use(V2Notify, config)

/**
 * Config
 * 
 * sort = 'asc' || 'desc'
 * Определяет в каком порядке будут появлятся уведомления, либо по убыванию либо по возрастанию
 */

const config = { sort: 'asc' }
```

### Props:
| Name 					| Type 					| Default 		 	| Description |
| ------------------ | :----------------:	| :----------:  	| ----------- |
| type 					| `String` 				| **'info'** 		| *Тип картинки* |
| layer 					| `Boolean` 			| **false** 	 	| *Включить блокирующий слой* |
| isCloseButton 		| `Boolean` 			| **true** 		 	| *Показать кнопку закрытия* |
| closeOnLayer 		| `Boolean` 			| **false** 	 	| *Закрыть оповещание по клику на слой* |
| closingTime 			| `Number` 				| **undefined** 	| *Время, по истечении которое закроется оповещание* |
| position 				| `String` 				| **'right top'** | *Позиция окна оповещания на экране* |
| component 			| `Object` 				| **undefined** 	| *Собственный компонент Vue* |
| title 					| `String` 				| **''** 		 	| *Название* |
| text 					| `String` 				| **''** 		 	| *Описание* |
| actions 				| `Array` 				| **[]** 		 	| *Массив объектов кнопок* |

### Comments:
```js
/**
 * [type]: содержит в себе типы картинок - ['info', 'error', 'success', 'warning', 'question']

 * [position]: все возможные варианты позиций окна оповещаний -
 * 		['left top', left bottom', 'left center', 'right top', 'right center', 'right bottom', 'center top', 'center center', 'center bottom']

 * [component]: если в $notify передан компонент и вы хотите получить "его" вычисленный результат по нажатию кнопки (action)
 * 	для этого, ваш компонент должен всегда возвращать резултат вида - $emit('input', value)

 * [actions]: содержит в себе "name" - название кнопки, "value" - значение, "active" - заливка кнопки
 * 	можно передавать необязательные значения. Так же, если у вас добавлени произвольный компонет, то значение запишется в свойство componentValue
 * 	результат возврата action будет объект - { name: 'Отменить', value: true, componentValue: 'какое-то значение' }
 */
```

### Expample
```js
	// Пример диалога
	await this.$notify.open({
		type: 'success',
		layer: true,
		isCloseButton: false,
		closeOnLayer: false,
		position: 'center center',
		component: VComponent,
		title: 'Название',
		text: 'Описание/вопрос',
		actions: [
			{ name: 'Отменить', value: true, active: true },
			{ name: 'Повторить', value: false },
		],
	})

	// Пример информационного оповещания
	await this.$notify.open({
		type: 'info',
		closingTime: 2000,
		position: 'right top',
		title: 'Название',
		text: 'Описание/вопрос',
	})
```
