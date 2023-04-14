<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

El presente repositorio contiene la solucion del reto tecnico el cual permite, registrar prodictos, actualizaros, buscarlos, foltrarlos por id, ademas de realizar compras y poder consultar las compras realizada y filtrarla por id de la compra.

El proyecto cuenta con una base de datos la cual se encuentra en postgresSql para poder hacer la persistencia de datos.

## Poder ejecutar Aplicacion

Para poder ejecutar el presente proyecto primero hay que editar el archivo de nomber ` .env.templeate` y colocarle ` .env`. Este archivo tiene las variables de entorno que requiere el proyecto para ejecutar.

```
DB_HOST= # yoor envoroment database
DB_PORT= # Port for dataase
DB_NAME= # Database Name
DB_USERNAME= # Your user name database
DB_PASSWORD= # Your user password database
PORT= # Port for dataase fot running app
```

Para poder poner en marcha el proyecto, puede hacerlo de dos forma, Si tiene docker instalado en el equipo, puede usar el comando `docker compose up -d ` y este se encargara de levantar el servidor con la base de datos configurada. Si no posee docker, es mejor usar un servidor de base de datos como xampp, laragon o si tiene el motor de base de datos en su equipo puede colocarle las variables que requiere para la conexcion.

## Installation

Para poder realizar la instalacion de los modulos del y poder ejecutar el proyecto, es necesario que tenga pnpm instaldo, si no posee pnpm en su equipo, puede usar el siguiente verificarlo [aqui](https://pnpm.io/installation). Despues de tener pnpm instlado, puede ejecutar el comando siguiente comando para instalar las dependencias del proyecto.

```bash
$ pnpm install
```
## Ducumentacion
Se implemento el modulo de Swagger para poer realizar la documentacion de los endpoints, para acceder a este se debe usar la siguiente ruta 
``` http://localhost:3000/api ```

## Running the app

Teniedo las dependencias instaladas, ejecute los comando para levantar el servidor en el modo que desea

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
