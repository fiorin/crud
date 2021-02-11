import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { DeveloperModule } from './developer/developer.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), DeveloperModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
