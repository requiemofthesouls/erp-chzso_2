**Для успешного запуска необходимо**

В корне лежит пип файл с зависимостями.
Вроде первыми двумя команами должно активироваться виртуальное окружение и установиться зависимости.

Для продакшна

`
pipenv shell &&
pipenv install &&
npm install && 
npm run update-req && 
npm run build && 
npm run collectstatic && 
docker-compose up --build
`

Для разработки

`
pipenv shell &&
pipenv install &&
npm install && 
npm run dev && 
cd backend &&
pipenv run python manage.py --settings=settings.local
`


Возможно будет ругаться на отсутствующие папки типа _staticfiles_,
но, думаю, тут уже разберешься.


Есть сомнения что люди под другим IP отличным от нашего - не могут зайти  
на на нашу систему. Нужно тестировать.
