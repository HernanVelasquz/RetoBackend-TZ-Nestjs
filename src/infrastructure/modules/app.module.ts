import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration, JoiValidationSchema } from '../config';
import { ConectionDataBaseModule } from './conection-data-base.module';
import { ProductModule } from './product.module';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    ConectionDataBaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
