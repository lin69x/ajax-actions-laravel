# ajax-actions-laravel
AJAX actions for Laravel. data-attribute
Работает с любыми html-элементами

В блоке <head></head> должен быть прописан мета-тег <meta name="csrf-token" content="ТОКЕН">
<br>


<b>data-request</b>

определяет куда будет отправлен запрос через AJAX

// Пример - data-request='/tasks'
<hr>

<b>data-request-data</b>

данные которые будут отправлены на сервер 

// Пример - data-request-data='user_id:5,delete:true'
<hr>


<b>data-request-update</b>

вьюха которая будет добавлена в id html-элемента в котором должно произоййти обновление 

// Пример data-request-update="partials.content.tasks:tasks"

вьюха будет доступна $request->view
<hr>


<b>data-request-redirect</b>

если указан, то после запроса произойдёт редирект
<hr>


<b>data-request-confirm</b>

Подтверждение перед отаправкой на сервер
<hr>


<b>data-request-type</b>

Тип запроса // POST|GET
По умолчанию - POST
