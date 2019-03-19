**Для успешного запуска необходимо**

В корне лежит пип файл с зависимостями.
Вроде первыми двумя команами должно активироваться виртуальное окружение и установиться зависимости.


`
pipenv shell &&
pipenv install &&
npm install && 
npm run update-req && 
npm run build && 
docker-compose up --build
`


Возможно будет ругаться на отсутствующие папки типа _staticfiles_,
но, думаю, тут уже разберешься.

Надо будет прибраться в структуре приложения, я уже путаться начинаю.


UPD: Сейчас взаимодействовать с апихой можно через форму на урле /projects.
При переходе на сам rest framework (/api/projects) - выдаёт 500 ошибку.

По логам заметно, что у успешных запросов - 6 заголовков, а у не успешных - 4.
Мб проблема в этом. 

`
[pid: 23|app: 0|req: 16/23] 172.22.0.1 () {52 vars in 996 bytes} [Tue Mar 19 15:36:29 2019] POST /api/projects/ => generated 160 bytes in 30 msecs (HTTP/1.1 201) 6 headers in 201 bytes (1 switches on core 1)
`

`
[pid: 23|app: 0|req: 17/24] 172.22.0.1 () {52 vars in 996 bytes} [Tue Mar 19 15:36:29 2019] POST /api/projects/ => generated 160 bytes in 28 msecs (HTTP/1.1 201) 6 headers in 201 bytes (1 switches on core 0)
`

`
[pid: 23|app: 0|req: 18/25] 172.22.0.1 () {46 vars in 851 bytes} [Tue Mar 19 15:36:31 2019] GET /api/projects/ => generated 807 bytes in 10 msecs (HTTP/1.1 200) 5 headers in 164 bytes (1 switches on core 1)
`

`
[pid: 21|app: 0|req: 6/26] 172.22.0.1 () {46 vars in 890 bytes} [Tue Mar 19 15:37:02 2019] GET /api/projects => generated 0 bytes in 2 msecs (HTTP/1.1 301) 4 headers in 133 bytes (1 switches on core 1)
`

`
[pid: 23|app: 0|req: 19/27] 172.22.0.1 () {46 vars in 892 bytes} [Tue Mar 19 15:37:02 2019] GET /api/projects/ => generated 27 bytes in 84 msecs (HTTP/1.1 500) 4 headers in 134 bytes (1 switches on core 0)
`
