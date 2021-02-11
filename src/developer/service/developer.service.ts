import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeveloperDto } from '../dto/developer.create.dto';
import { DeveloperQueryDto } from '../dto/developer.query.dto';
import { UpdateDeveloperDto } from '../dto/developer.update.dto';
import { Developer } from '../entity/developer.entity';
import { DeveloperRepository } from '../repository/developer.repository';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(DeveloperRepository)
    private developerRepository: DeveloperRepository,
  ) {}

  async getDevelopers(query: DeveloperQueryDto): Promise<Developer[]> {
    const { page, limit, ...where } = query;
    return this.developerRepository.getDevelopers(page, limit, where);
  }

  async getDeveloper(idDeveloper: number): Promise<Developer> {
    return this.developerRepository.getDeveloper(idDeveloper);
  }

  async createDeveloper(
    createDeveloperDto: CreateDeveloperDto,
  ): Promise<Developer> {
    return this.developerRepository.createDeveloper(createDeveloperDto);
  }

  async updateDeveloper(
    idDeveloper: number,
    updateDeveloperDto: UpdateDeveloperDto,
  ): Promise<Developer> {
    return this.developerRepository.updateDeveloper(
      idDeveloper,
      updateDeveloperDto,
    );
  }

  async deleteDeveloper(idDeveloper: number): Promise<Developer> {
    return this.developerRepository.deleteDeveloper(idDeveloper);
  }
}
