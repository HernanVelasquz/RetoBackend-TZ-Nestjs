import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration, JoiValidationSchema } from '../config';
import { ConectionDataBaseModule } from './conection-data-base.module';

@Module({
  imports: [
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
