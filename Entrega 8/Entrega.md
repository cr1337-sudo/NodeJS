# Entrega 8
## Consigna
Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga
dos colecciones: mensajes y productos.

1. Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB.

2. Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).

3. Listar todos los documentos en cada colección.

4. Mostrar la cantidad de documentos almacenados en cada una de ellas.

5. Realizar un CRUD sobre la colección de productos:
* 5.1: Agregar un producto más en la colección de productos

* 5.2: Realizar una consulta por nombre de producto específico:
* 5.2.1: Listar los productos con precio menor a 1000 pesos.
* 5.2.3: Listar los productos con precio entre los 1000 a 3000 pesos.
* 5.2.3: Listar los productos con precio mayor a 3000 pesos.
* 5.2.4: Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

* 5.3:  Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

* 5.4: Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.

* 5.5: Borrar los productos con precio menor a 1000 pesos.

6. Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.


---------------------------------------------------------------------------------------------------------------------------------

## Resolucion
A continuacion se listan los comandos ejecutados en cada caso.


### Insertar Productos
__Script__
Creo la DB:
```
use ecommerce;
```

Inserto 10 documentos en la coleccion de "productos":
```
db.productos.insertMany([
    {
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png"
    },
    {
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png"
    },
    {
    title: "Globo Terraqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png"
    },
    {
    title: "Regla",
    price: 10.20,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/256x256/Ruler1.png"
    },
    {
    title: "Lapiz",
    price: 1.50,
    thumbnail: "https://cdn1.iconfinder.com/data/icons/drawing-tools-5/512/pencil-256.png"
    },
    {
    title: "Boligrafo",
    price: 1.00,
    thumbnail: "https://cdn2.iconfinder.com/data/icons/scrap/Pen%203.png"
    },
    {
    title: "Cuaderno",
    price: 15.00,
    thumbnail: "https://cdn2.iconfinder.com/data/icons/Office_supplies/128/moleskine_notebook.png"
    },
    {
    title: "Cuaderno",
    price: 1500.00,
    thumbnail: "https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/root-access-128.png"
    },
    {
    title: "Borrador",
    price: 3.25,
    thumbnail: "https://cdn4.iconfinder.com/data/icons/mixediconset/128/draft.png"
    },
    {
    title: "Clips",
    price: 5.25,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/128x128/PaperClip4_Black.png"
    }
])
```

db.mensajes.insertMany([
    {
    user: "bot@service.com",
    msg: "Hello! Welcome!",
    time: "08/11/2021, 10:01:00 AM"
    },
    {
    user: "bot@service.com",
    msg: "Hola! Bienvenido!",
    time: "08/11/2021, 10:01:01 AM"
    },
    {
    user: "bot@service.com",
    msg: "Este es el servicio de atencion al cliente",
    time: "08/11/2021, 10:02:01 AM"
    },
    {
    user: "bot@service.com",
    msg: "En que lo podemos ayudar?",
    time: "08/11/2021, 10:03:01 AM"
    },
    {
    user: "user1@service.com",
    msg: "Buenos dias!",
    time: "08/11/2021, 10:04:01 AM"
    },
    {
    user: "user1@service.com",
    msg: "Podrian indicarme si poseen stock disponiblel del producto x390321",
    time: "08/11/2021, 10:05:01 AM"
    },
    {
    user: "bot@service.com",
    msg: "Si, contamos con stock disponible. En que color desea?",
    time: "08/11/2021, 10:06:01 AM"
    },
    {
    user: "user1@service.com",
    msg: "En verde por favor",
    time: "08/11/2021, 10:07:01 AM"
    },
    {
    user: "bot@service.com",
    msg: "Perfecto, tenemos stock en cualquiera de nuestras sucursales",
    time: "08/11/2021, 10:08:01 AM"
    },
    {
    user: "user1@service.com",
    msg: "Excelente, muchas gracias!",
    time: "08/11/2021, 10:09:01 AM"
    }
]);


__Ejecucion__
Resultado de crear la DB:
```
test> show dbs;
admin     41 kB
config  36.9 kB
local   73.7 kB
test    73.7 kB
test> use ecommerce;
switched to db ecommerce
```

Resultado de insertar los 10 documentos en la coleccion de "productos":
```
ecommerce> db.productos.insertMany([
...     {
.....     title: "Escuadra",
.....     price: 123.45,
.....     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png"
.....     },
...     {
.....     title: "Calculadora",
.....     price: 234.56,
.....     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png"
.....     },
...     {
.....     title: "Globo Terraqueo",
.....     price: 345.67,
.....     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png"
.....     },
...     {
.....     title: "Regla",
.....     price: 10.20,
.....     thumbnail: "https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/256x256/Ruler1.png"
.....     },
...     {
.....     title: "Lapiz",
.....     price: 1.50,
.....     thumbnail: "https://cdn1.iconfinder.com/data/icons/drawing-tools-5/512/pencil-256.png"
.....     },
...     {
.....     title: "Boligrafo",
.....     price: 1.00,
.....     thumbnail: "https://cdn2.iconfinder.com/data/icons/scrap/Pen%203.png"
.....     },
...     {
.....     title: "Cuaderno",
.....     price: 15.00,
.....     thumbnail: "https://cdn2.iconfinder.com/data/icons/Office_supplies/128/moleskine_notebook.png"
.....     },
...     {
.....     title: "Cuaderno",
.....     price: 1500.00,
.....     thumbnail: "https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/root-access-128.png"
.....     },
...     {
.....     title: "Borrador",
.....     price: 3.25,
.....     thumbnail: "https://cdn4.iconfinder.com/data/icons/mixediconset/128/draft.png"
.....     },
...     {
.....     title: "Clips",
.....     price: 5.25,
.....     thumbnail: "https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/128x128/PaperClip4_Black.png"
.....     }
... ])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("618997720c6f07ad4a69c979"),
    '1': ObjectId("618997720c6f07ad4a69c97a"),
    '2': ObjectId("618997720c6f07ad4a69c97b"),
    '3': ObjectId("618997720c6f07ad4a69c97c"),
    '4': ObjectId("618997720c6f07ad4a69c97d"),
    '5': ObjectId("618997720c6f07ad4a69c97e"),
    '6': ObjectId("618997720c6f07ad4a69c97f"),
    '7': ObjectId("618997720c6f07ad4a69c980"),
    '8': ObjectId("618997720c6f07ad4a69c981"),
    '9': ObjectId("618997720c6f07ad4a69c982")
  }
}
ecommerce> 
```

Resultado de insertar los 10 documentos en la coleccion de "mensajes":
```
ecommerce> db.mensajes.insertMany([
...     {
.....     user: "bot@service.com",
.....     msg: "Hello! Welcome!",
.....     time: "08/11/2021, 10:01:00 AM"
.....     },
...     {
.....     user: "bot@service.com",
.....     msg: "Hola! Bienvenido!",
.....     time: "08/11/2021, 10:01:01 AM"
.....     },
...     {
.....     user: "bot@service.com",
.....     msg: "Este es el servicio de atencion al cliente",
.....     time: "08/11/2021, 10:02:01 AM"
.....     },
...     {
.....     user: "bot@service.com",
.....     msg: "En que lo podemos ayudar?",
.....     time: "08/11/2021, 10:03:01 AM"
.....     },
...     {
.....     user: "user1@service.com",
.....     msg: "Buenos dias!",
.....     time: "08/11/2021, 10:04:01 AM"
.....     },
...     {
.....     user: "user1@service.com",
.....     msg: "Podrian indicarme si poseen stock disponiblel del producto x390321",
.....     time: "08/11/2021, 10:05:01 AM"
.....     },
...     {
.....     user: "bot@service.com",
.....     msg: "Si, contamos con stock disponible. En que color desea?",
.....     time: "08/11/2021, 10:06:01 AM"
.....     },
...     {
.....     user: "user1@service.com",
.....     msg: "En verde por favor",
.....     time: "08/11/2021, 10:07:01 AM"
.....     },
...     {
.....     user: "bot@service.com",
.....     msg: "Perfecto, tenemos stock en cualquiera de nuestras sucursales",
.....     time: "08/11/2021, 10:08:01 AM"
.....     },
...     {
.....     user: "user1@service.com",
.....     msg: "Excelente, muchas gracias!",
.....     time: "08/11/2021, 10:09:01 AM"
.....     }
... ]);
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("6189ab580c6f07ad4a69c983"),
    '1': ObjectId("6189ab580c6f07ad4a69c984"),
    '2': ObjectId("6189ab580c6f07ad4a69c985"),
    '3': ObjectId("6189ab580c6f07ad4a69c986"),
    '4': ObjectId("6189ab580c6f07ad4a69c987"),
    '5': ObjectId("6189ab580c6f07ad4a69c988"),
    '6': ObjectId("6189ab580c6f07ad4a69c989"),
    '7': ObjectId("6189ab580c6f07ad4a69c98a"),
    '8': ObjectId("6189ab580c6f07ad4a69c98b"),
    '9': ObjectId("6189ab580c6f07ad4a69c98c")
  }
}
ecommerce>
```

---------------------------------------------------------------------------------------------------------------------------------

### Update Productos
Modifico los precios de los productos insertados anteriormente para cumplir con la distribucion: "120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990".


__Script__
```
db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c979")},{$set:{"price": 120}});
db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c97a")},{$set:{"price": 580}});
db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c97b")},{$set:{"price": 900}});
db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c97c")},{$set:{"price": 1280}});
db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c97d")},{$set:{"price": 1700}});
db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c97e")},{$set:{"price": 2300}});
db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c97f")},{$set:{"price": 2860}});
db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c980")},{$set:{"price": 3350}});
db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c981")},{$set:{"price": 4320}});
db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c982")},{$set:{"price": 4990}});
```

__Ejecucion__
```
ecommerce> db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c979")},{$set:{"price": 120}});
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
ecommerce> db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c97a")},{$set:{"price": 580}});
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
ecommerce> db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c97b")},{$set:{"price": 900}});
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
ecommerce> db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c97c")},{$set:{"price": 1280}});
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
ecommerce> db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c97d")},{$set:{"price": 1700}});
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
ecommerce> db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c97e")},{$set:{"price": 2300}});
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
ecommerce> db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c97f")},{$set:{"price": 2860}});
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
ecommerce> db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c980")},{$set:{"price": 3350}});
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
ecommerce> db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c981")},{$set:{"price": 4320}});
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
ecommerce> db.productos.updateOne({_id: ObjectId("618997720c6f07ad4a69c982")},{$set:{"price": 4990}});
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 0,
  upsertedCount: 0
}
ecommerce> 
```

---------------------------------------------------------------------------------------------------------------------------------

### Buscar productos
__Script__
```
db.productos.find();
db.mensajes.find();
```

__Ejecucion__
```
ecommerce> db.productos.find();
[
  {
    _id: ObjectId("618997720c6f07ad4a69c979"),
    title: 'Escuadra',
    price: 120,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png'
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97a"),
    title: 'Calculadora',
    price: 580,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png'
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97b"),
    title: 'Globo Terraqueo',
    price: 900,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png'
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97c"),
    title: 'Regla',
    price: 1280,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/256x256/Ruler1.png'
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97d"),
    title: 'Lapiz',
    price: 1700,
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/drawing-tools-5/512/pencil-256.png'
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97e"),
    title: 'Boligrafo',
    price: 2300,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/scrap/Pen%203.png'
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97f"),
    title: 'Cuaderno',
    price: 2860,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/Office_supplies/128/moleskine_notebook.png'
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c980"),
    title: 'Cuaderno',
    price: 3350,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/root-access-128.png'
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c981"),
    title: 'Borrador',
    price: 4320,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/mixediconset/128/draft.png'
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c982"),
    title: 'Clips',
    price: 4990,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/128x128/PaperClip4_Black.png'
  },
  {
    _id: ObjectId("6189b1890c6f07ad4a69c98d"),
    title: 'Mapa',
    price: 1234,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-128.png'
  }
]
ecommerce> 
```

```
ecommerce> db.mensajes.find();
[
  {
    _id: ObjectId("6189ab580c6f07ad4a69c983"),
    user: 'bot@service.com',
    msg: 'Hello! Welcome!',
    time: '08/11/2021, 10:01:00 AM'
  },
  {
    _id: ObjectId("6189ab580c6f07ad4a69c984"),
    user: 'bot@service.com',
    msg: 'Hola! Bienvenido!',
    time: '08/11/2021, 10:01:01 AM'
  },
  {
    _id: ObjectId("6189ab580c6f07ad4a69c985"),
    user: 'bot@service.com',
    msg: 'Este es el servicio de atencion al cliente',
    time: '08/11/2021, 10:02:01 AM'
  },
  {
    _id: ObjectId("6189ab580c6f07ad4a69c986"),
    user: 'bot@service.com',
    msg: 'En que lo podemos ayudar?',
    time: '08/11/2021, 10:03:01 AM'
  },
  {
    _id: ObjectId("6189ab580c6f07ad4a69c987"),
    user: 'user1@service.com',
    msg: 'Buenos dias!',
    time: '08/11/2021, 10:04:01 AM'
  },
  {
    _id: ObjectId("6189ab580c6f07ad4a69c988"),
    user: 'user1@service.com',
    msg: 'Podrian indicarme si poseen stock disponiblel del producto x390321',
    time: '08/11/2021, 10:05:01 AM'
  },
  {
    _id: ObjectId("6189ab580c6f07ad4a69c989"),
    user: 'bot@service.com',
    msg: 'Si, contamos con stock disponible. En que color desea?',
    time: '08/11/2021, 10:06:01 AM'
  },
  {
    _id: ObjectId("6189ab580c6f07ad4a69c98a"),
    user: 'user1@service.com',
    msg: 'En verde por favor',
    time: '08/11/2021, 10:07:01 AM'
  },
  {
    _id: ObjectId("6189ab580c6f07ad4a69c98b"),
    user: 'bot@service.com',
    msg: 'Perfecto, tenemos stock en cualquiera de nuestras sucursales',
    time: '08/11/2021, 10:08:01 AM'
  },
  {
    _id: ObjectId("6189ab580c6f07ad4a69c98c"),
    user: 'user1@service.com',
    msg: 'Excelente, muchas gracias!',
    time: '08/11/2021, 10:09:01 AM'
  }
]
```

---------------------------------------------------------------------------------------------------------------------------------

### Contar Documentos en una coleccion
__Script__
```
db.productos.countDocuments()
db.mensajes.countDocuments()
```

__Ejecucion__

```
ecommerce> db.productos.countDocuments()
10
```

```
ecommerce> db.mensajes.countDocuments()
10
```

---------------------------------------------------------------------------------------------------------------------------------

### Agregar productos
#### 5.1 - Agregar producto a la coleccion

__Script__
```
db.productos.insertOne({
    title: 'Mapa',
    price: 1234,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-128.png'
});
```

__Ejecucion__
```
ecommerce> db.productos.insertOne({
...     title: 'Mapa',
...     price: 1234,
...     thumbnail: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-128.png'
... });
{
  acknowledged: true,
  insertedId: ObjectId("6189b1890c6f07ad4a69c98d")
}
ecommerce> 
```

#### 5.2 - Consulta por nombre de producto
##### 5.2.1 - Productos con precio menor a $1000
__Script__
```
db.productos.find({price: {$lt: 1000}},{"title":1})
```

__Ejecucion__
```
ecommerce> db.productos.find({price: {$lt: 1000}},{"title":1})
[
  { _id: ObjectId("618997720c6f07ad4a69c979"), title: 'Escuadra' },
  { _id: ObjectId("618997720c6f07ad4a69c97a"), title: 'Calculadora' },
  {
    _id: ObjectId("618997720c6f07ad4a69c97b"),
    title: 'Globo Terraqueo'
  }
]
ecommerce> 
```

##### 5.2.2 - Productos con precio entre $1000 y $3000
__Script__
```
db.productos.find({$and: [ {price: {$gt: 1000}},{price: {$lt: 3000}} ]},{"title":1})
```

__Ejecucion__
```
ecommerce> db.productos.find({$and: [ {price: {$gt: 1000}},{price: {$lt: 3000}} ]},{"title":1})
[
  { _id: ObjectId("618997720c6f07ad4a69c97c"), title: 'Regla' },
  { _id: ObjectId("618997720c6f07ad4a69c97d"), title: 'Lapiz' },
  { _id: ObjectId("618997720c6f07ad4a69c97e"), title: 'Boligrafo' },
  { _id: ObjectId("618997720c6f07ad4a69c97f"), title: 'Cuaderno' },
  { _id: ObjectId("6189b1890c6f07ad4a69c98d"), title: 'Mapa' }
]
ecommerce> 
```

##### 5.2.3 - Productos con precio mayor a $3000
__Script__
```
db.productos.find({price: {$gt: 3000}},{"title":1})
```

__Ejecucion__
```
ecommerce> db.productos.find({price: {$gt: 3000}},{"title":1})
[
  { _id: ObjectId("618997720c6f07ad4a69c980"), title: 'Cuaderno' },
  { _id: ObjectId("618997720c6f07ad4a69c981"), title: 'Borrador' },
  { _id: ObjectId("618997720c6f07ad4a69c982"), title: 'Clips' }
]
```

##### 5.2.4 - Nombre del 3er producto mas barato
__Script__
```
db.productos.find({},{"title":1}).skip(2).sort({price:1}).limit(1)
```

__Ejecucion__
```
ecommerce> db.productos.find({},{"title":1}).skip(2).sort({price:1}).limit(1)
[
  {
    _id: ObjectId("618997720c6f07ad4a69c97b"),
    title: 'Globo Terraqueo'
  }
]
ecommerce> 
```

##### 5.3 - Agregar atributo Stock
__Script__
```
db.productos.update({},{$set:{"stock":100}})
```

__Ejecucion__
```
ecommerce> db.productos.updateMany({},{$set:{"stock":100}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 11,
  modifiedCount: 10,
  upsertedCount: 0
}
ecommerce> 

ecommerce> 

ecommerce> 

ecommerce> 

ecommerce> db.productos.find()
[
  {
    _id: ObjectId("618997720c6f07ad4a69c979"),
    title: 'Escuadra',
    price: 120,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97a"),
    title: 'Calculadora',
    price: 580,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97b"),
    title: 'Globo Terraqueo',
    price: 900,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97c"),
    title: 'Regla',
    price: 1280,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/256x256/Ruler1.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97d"),
    title: 'Lapiz',
    price: 1700,
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/drawing-tools-5/512/pencil-256.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97e"),
    title: 'Boligrafo',
    price: 2300,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/scrap/Pen%203.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97f"),
    title: 'Cuaderno',
    price: 2860,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/Office_supplies/128/moleskine_notebook.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c980"),
    title: 'Cuaderno',
    price: 3350,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/root-access-128.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c981"),
    title: 'Borrador',
    price: 4320,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/mixediconset/128/draft.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c982"),
    title: 'Clips',
    price: 4990,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/128x128/PaperClip4_Black.png',
    stock: 100
  },
  {
    _id: ObjectId("6189b1890c6f07ad4a69c98d"),
    title: 'Mapa',
    price: 1234,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-128.png',
    stock: 100
  }
]
```

---------------------------------------------------------------------------------------


##### 5.4 - Cambiar el stock a cero de los productos con precios mayores a 4000 pesos
__Script__
```
db.productos.updateMany({price: {$gt: 4000}},{$set:{"stock":0}})
```

__Ejecucion__
```
ecommerce> db.productos.updateMany({price: {$gt: 4000}},{$set:{"stock":0}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 2,
  modifiedCount: 2,
  upsertedCount: 0
}
```

```
ecommerce> db.productos.find()
[
  {
    _id: ObjectId("618997720c6f07ad4a69c979"),
    title: 'Escuadra',
    price: 120,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97a"),
    title: 'Calculadora',
    price: 580,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97b"),
    title: 'Globo Terraqueo',
    price: 900,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97c"),
    title: 'Regla',
    price: 1280,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/256x256/Ruler1.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97d"),
    title: 'Lapiz',
    price: 1700,
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/drawing-tools-5/512/pencil-256.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97e"),
    title: 'Boligrafo',
    price: 2300,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/scrap/Pen%203.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97f"),
    title: 'Cuaderno',
    price: 2860,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/Office_supplies/128/moleskine_notebook.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c980"),
    title: 'Cuaderno',
    price: 3350,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/root-access-128.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c981"),
    title: 'Borrador',
    price: 4320,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/mixediconset/128/draft.png',
    stock: 0
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c982"),
    title: 'Clips',
    price: 4990,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/128x128/PaperClip4_Black.png',
    stock: 0
  },
  {
    _id: ObjectId("6189b1890c6f07ad4a69c98d"),
    title: 'Mapa',
    price: 1234,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-128.png',
    stock: 100
  }
]
```


---------------------------------------------------------------------------------------

##### 5.5 - Borrar los productos con precio menor a 1000 pesos
__Script__
```
db.productos.deleteMany({price:{$lt:1000}})
```

__Ejecucion__
```
ecommerce> db.productos.deleteMany({price:{$lt:1000}})
{ acknowledged: true, deletedCount: 3 }
```


```
ecommerce> db.productos.find()
[
  {
    _id: ObjectId("618997720c6f07ad4a69c97c"),
    title: 'Regla',
    price: 1280,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/256x256/Ruler1.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97d"),
    title: 'Lapiz',
    price: 1700,
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/drawing-tools-5/512/pencil-256.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97e"),
    title: 'Boligrafo',
    price: 2300,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/scrap/Pen%203.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97f"),
    title: 'Cuaderno',
    price: 2860,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/Office_supplies/128/moleskine_notebook.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c980"),
    title: 'Cuaderno',
    price: 3350,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/root-access-128.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c981"),
    title: 'Borrador',
    price: 4320,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/mixediconset/128/draft.png',
    stock: 0
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c982"),
    title: 'Clips',
    price: 4990,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/128x128/PaperClip4_Black.png',
    stock: 0
  },
  {
    _id: ObjectId("6189b1890c6f07ad4a69c98d"),
    title: 'Mapa',
    price: 1234,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-128.png',
    stock: 100
  }
]

```

---------------------------------------------------------------------------------------

# 6 - Control de Usuarios
Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

## Creacion de usuarios
__Script__
```
db.createUser({user:"pepe",pwd:"asd456",roles:[{role: "read", db:"ecommerce"}]})
```

__Ejecucion__
```
admin> db.createUser({user:"pepe",pwd:"asd456",roles:[{role: "read", db:"ecommerce"}]})
{ ok: 1 }
```

```
admin> db.system.users.find()
[
  {
    _id: 'admin.pepe',
    userId: UUID("e5d40722-b26e-4bde-ba0e-94125f19d436"),
    user: 'pepe',
    db: 'admin',
    credentials: {
      'SCRAM-SHA-1': {
        iterationCount: 10000,
        salt: 'hLVWOeu58Hz2V1c2HFGsWQ==',
        storedKey: 'ke375bvPbKG4Ej39vkzHlvo0Gek=',
        serverKey: 'HZLuvlBRI5//ZFcoY8tiXg7mkic='
      },
      'SCRAM-SHA-256': {
        iterationCount: 15000,
        salt: 'UjFikzmE9rmwZK+oV/iHQkv7LCZuWW9uiGtjEw==',
        storedKey: '4pju45O4DS4+VV99ZaxhKRSHC1buF8df40e3MwIXHDo=',
        serverKey: 'lS6Z9bAs++8F6sl3bEd8DloAYt774L2FvHZCOvo9cDQ='
      }
    },
    roles: [ { role: 'read', db: 'ecommerce' } ]
  }
]
```

## Validacion de permisos
Para esta prueba creo un nuevo contenedor con las variables "MONGO_INITDB_ROOT_USERNAME" y "MONGO_INITDB_ROOT_PASSWORD" necesarias para activar el modo de autenticacion.
Por otro lado, utilizo el punto de montaje de docker con el backup obtenido anteriormente, a fin de emplear la misma DB creada en los puntos anteriores.

```
sudo docker run -d --name mongodb2 \
    -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
    -e MONGO_INITDB_ROOT_PASSWORD=german \
    -v /home/german/Estudio/NodeJS/Entregas_Obligatorias/Entrega_8/dbbkp/:/data/db mongo
```

Luego ejecutamos el cliente mongosh con el usuario creado anteriormente.

```
$ sudo docker exec -it mongodb2 /bin/mongosh -u pepe -p asd456                                                                                                                                          125 ↵
Current Mongosh Log ID:	618f24960020626d99aa9ec5
Connecting to:		mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
Using MongoDB:		5.0.3
Using Mongosh:		1.1.0

For mongosh info see: https://docs.mongodb.com/mongodb-shell/


To help improve our products, anonymous usage data is collected and sent to MongoDB periodically (https://www.mongodb.com/legal/privacy-policy).
You can opt-out by running the disableTelemetry() command.

test> 

test> use ecommerce
switched to db ecommerce
ecommerce> db.productos.find()
[
  {
    _id: ObjectId("618997720c6f07ad4a69c97c"),
    title: 'Regla',
    price: 1280,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/256x256/Ruler1.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97d"),
    title: 'Lapiz',
    price: 1700,
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/drawing-tools-5/512/pencil-256.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97e"),
    title: 'Boligrafo',
    price: 2300,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/scrap/Pen%203.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c97f"),
    title: 'Cuaderno',
    price: 2860,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/Office_supplies/128/moleskine_notebook.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c980"),
    title: 'Cuaderno',
    price: 3350,
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/whcompare-isometric-web-hosting-servers/50/root-access-128.png',
    stock: 100
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c981"),
    title: 'Borrador',
    price: 4320,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/mixediconset/128/draft.png',
    stock: 0
  },
  {
    _id: ObjectId("618997720c6f07ad4a69c982"),
    title: 'Clips',
    price: 4990,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/softwaredemo/PNG/128x128/PaperClip4_Black.png',
    stock: 0
  },
  {
    _id: ObjectId("6189b1890c6f07ad4a69c98d"),
    title: 'Mapa',
    price: 1234,
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-128.png',
    stock: 100
  }
]
ecommerce> 
```


Se verifica que el usuario no puede modificar:
```
ecommerce> db.productos.insertOne(
...     {
.....     title: "Test",
.....     price: 123.45,
.....     thumbnail: "https://test.png"
.....     }
... );
MongoServerError: not authorized on ecommerce to execute command { insert: "productos", documents: [ { title: "Test", price: 123.45, thumbnail: "https://test.png", _id: ObjectId('618f24fa545a453db3f230a0') } ], ordered: true, lsid: { id: UUID("484ca63c-b065-45ad-a082-3ce6f43cc2cb") }, $db: "ecommerce" }
ecommerce> 

ecommerce> 
```