import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './infrastructure/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Documentacion Api Proyecto BackEnd - Zona de talenos')
    .setDescription(
      `La API de tienda es una interfaz de programación de aplicaciones que permite a los desarrolladores interactuar con una tienda en 
      línea desde una aplicación externa. Esta API proporciona una serie de endpoints que permiten a los desarrolladores acceder y 
      manipular información sobre productos, clientes, y el historial de compras de la tienda.
      \nLa documentación de la API de tienda incluye una lista completa de los endpoints disponibles y los parámetros que se pueden 
      usar en cada uno. Además, la documentación describe la estructura de las respuestas que se obtienen al hacer solicitudes a 
      cada uno de los endpoints.
    `,
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
