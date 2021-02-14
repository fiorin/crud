import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CreateDeveloperDto } from '../dto/developer.create.dto';
import { DeveloperQueryDto } from '../dto/developer.query.dto';
import { UpdateDeveloperDto } from '../dto/developer.update.dto';
import { Developer } from '../entity/developer.entity';
import { DeveloperService } from '../service/developer.service';

@Controller('developers')
export class DeveloperController {
  constructor(private developerService: DeveloperService) {}

  @Get()
  async getDevelopers(@Query() query: DeveloperQueryDto): Promise<Developer[]> {
    return await this.developerService.getDevelopers(query);
  }

  @Get('/:id')
  async getDeveloper(@Param('id') idDeveloper: number): Promise<Developer> {
    return await this.developerService.getDeveloper(idDeveloper);
  }

  @Post()
  async createDeveloper(
    @Body() createDeveloperDto: CreateDeveloperDto,
  ): Promise<Developer> {
    console.log(createDeveloperDto);
    const developer = await this.developerService.createDeveloper(
      createDeveloperDto,
    );
    return developer;
  }

  @Put('/:id')
  async uptadeDeveloper(
    @Param('id') idDeveloper: number,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ): Promise<Developer> {
    const developer = await this.developerService.updateDeveloper(
      idDeveloper,
      updateDeveloperDto,
    );
    return developer;
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteDeveloper(@Param('id') idDeveloper: number) {
    return await this.developerService.deleteDeveloper(idDeveloper);
  }
}
