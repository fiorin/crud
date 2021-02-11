import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateDeveloperDto } from '../dto/developer.create.dto';
import { DeveloperWhereDto } from '../dto/developer.query.dto';
import { UpdateDeveloperDto } from '../dto/developer.update.dto';
import { Developer } from '../entity/developer.entity';

@EntityRepository(Developer)
export class DeveloperRepository extends Repository<Developer> {
  async getDeveloper(idDeveloper: number): Promise<Developer> {
    try {
      const developer = await this.findOne({ id: idDeveloper });
      if (!developer) {
        throw new NotFoundException('Usuário não localizado');
      }
      return developer;
    } catch (error) {
      throw new InternalServerErrorException('Problema ao localizar usuário');
    }
  }

  async getDevelopers(
    page = 1,
    limit = 10,
    where: DeveloperWhereDto,
  ): Promise<Developer[]> {
    const skip = (page - 1) * limit;
    try {
      return this.find({ where, skip, take: limit });
    } catch (error) {
      throw new InternalServerErrorException('Problema ao localizar usuários');
    }
  }

  async createDeveloper(
    createDeveloperDto: CreateDeveloperDto,
  ): Promise<Developer> {
    let developer = this.create();
    developer = Object.assign(developer, createDeveloperDto);
    try {
      return await developer.save();
    } catch (error) {
      throw new InternalServerErrorException('Usuário não inserido');
    }
  }

  async updateDeveloper(
    idDeveloper: number,
    updateDeveloperDto: UpdateDeveloperDto,
  ): Promise<Developer> {
    let developer = await this.findOne({ id: idDeveloper });
    developer = Object.assign(developer, updateDeveloperDto);
    try {
      return await developer.save();
    } catch (error) {
      throw new InternalServerErrorException('Usuário não atualizado');
    }
  }

  async deleteDeveloper(idDeveloper: number): Promise<Developer> {
    const developer = await this.findOne({ id: idDeveloper });
    try {
      return await this.remove(developer);
    } catch (error) {
      throw new InternalServerErrorException('Usuário não removido');
    }
  }
}
