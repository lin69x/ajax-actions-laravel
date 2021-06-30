# ajax-actions-laravel
AJAX actions for Laravel. data-attribute
Работает с любыми html-элементами

В блоке <head></head> должен быть прописан мета-тег <meta name="csrf-token" content="ТОКЕН">
2) Работает с любыми 

data-request
определяет куда будет отправлен запрос через AJAX
// Пример - data-request='/tasks'

data-request-data
данные которые будут отправлены на сервер 
// Пример - data-request-data='user_id:5,delete:true'

data-request-update 
вьюха которая будет добавлена в id html-элемента в котором должно произоййти обновление 
// Пример data-request-update="partials.content.tasks:tasks"
вьюха будет доступна $request->view

data-request-redirect
если указан, то после запроса произойдёт редирект

data-request-confirm
Подтверждение перед отаправкой на сервер

data-request-type
Тип запроса // POST|GET
По умолчанию - POST
