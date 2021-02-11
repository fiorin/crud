import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperRepository } from './repository/developer.repository';
import { DeveloperService } from './service/developer.service';
import { DeveloperController } from './controller/developer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DeveloperRepository])],
  providers: [DeveloperService],
  controllers: [DeveloperController],
})
export class DeveloperModule {}
