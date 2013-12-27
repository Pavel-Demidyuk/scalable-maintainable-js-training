# JavaScript Training

## Часть 1

- Создать страницу
- Создать контроллер страницы
- Описать два jQuery-плагина:
    - Плагин опроса (данные: `quiz.json`)
    - Плагин отображения ответов (данные: `results.json`)
- [Gist: jQuery Plugin Boilerplate](https://gist.github.com/pukhalski/5590391)

## Часть 2.1

- Переписать текущий jQuery-плагины на стандартный Module Pattern
- Для общения модулей использовать Mediator Pattern
- [Gist: Module Pattern Boilerplate](https://gist.github.com/pukhalski/5590920)
- [Gist: Mediator Pattern (Event Bus)](https://gist.github.com/pukhalski/5590943)
- Используя модуль-"класс" сделать возможным сделать два опросника на странице, используя один и тот же модуль

# Часть 2.2

- Используя require.js перейти на Asynchronous Module Definition (AMD)
- *По возможности сделать модули загружаемыми только по надобности (модуль ответов на старте совершенно не нужен)

# Часть 2.3

- Используя один из шаблонизаторов (underscore.js, handlebars, mustasche и т.д.) сделать построение DOM для каждого из вопросов динамически

# Часть 2.4

- Используя Modernizr и YepNope проверить, есль ли поддержка JSON в браузере и загрузить полифилл, если таковая отсутствует