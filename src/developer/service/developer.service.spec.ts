import { Test, TestingModule } from '@nestjs/testing';
import { CreateDeveloperDto } from '../dto/developer.create.dto';
import { DeveloperRepository } from '../repository/developer.repository';
import { DeveloperService } from './developer.service';

const mockDeveloperRepository = () => ({
  getDevelopers: jest.fn(),
  getDeveloper: jest.fn(),
  createDeveloper: jest.fn(),
  updateDeveloper: jest.fn(),
  deleteDeveloper: jest.fn(),
});

describe('DeveloperService', () => {
  let repository;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeveloperService,
        {
          provide: DeveloperRepository,
          useFactory: mockDeveloperRepository,
        },
      ],
    }).compile();

    repository = await module.get<DeveloperRepository>(DeveloperRepository);
    service = await module.get<DeveloperService>(DeveloperService);
  });

  describe('createDeveloper', () => {
    let mockDeveloper: CreateDeveloperDto;

    beforeEach(() => {
      mockDeveloper = {
        name: 'mockName',
        gender: 'male',
        age: 31,
        hobby: 'code',
        birthdate: new Date('1989-03-29'),
      };
    });

    it('Sucesso ao criar desenvolvedor', async () => {
      const mockDeveloperInserted = { ...mockDeveloper, id: 1 };
      repository.createDeveloper.mockResolvedValue(mockDeveloperInserted);
      const developerInserted = await service.createDeveloper(mockDeveloper);
      expect(repository.createDeveloper).toHaveBeenCalledWith(mockDeveloper);
      expect(developerInserted).toBe(mockDeveloperInserted);
    });

    it('Erro ao criar desenvolvedor por envio null', async () => {
      const developerInserted = await service.createDeveloper(null);
      expect(repository.createDeveloper).toHaveBeenCalledWith(null);
      expect(developerInserted).toBe(undefined);
    });

    it('Erro ao criar desenvolvedor por falta de nome', async () => {
      delete mockDeveloper.name;
      const developerInserted = await service.createDeveloper(mockDeveloper);
      expect(repository.createDeveloper).toHaveBeenCalledWith(mockDeveloper);
      expect(developerInserted).toBe(undefined);
    });

    it('Sucesso ao recuperar desenvolvedor por id', async () => {
      const mockDeveloperToRecover = { ...mockDeveloper, id: 1 };
      repository.getDeveloper.mockResolvedValue(mockDeveloperToRecover);
      const developerRecovered = await service.getDeveloper(1);
      expect(repository.getDeveloper).toHaveBeenCalledWith(1);
      expect(developerRecovered).toBe(mockDeveloperToRecover);
    });

    it('Erro ao recuperar desenvolvedor por id', async () => {
      const developerRecovered = await service.getDeveloper(1);
      expect(repository.getDeveloper).toHaveBeenCalledWith(1);
      expect(developerRecovered).toBe(undefined);
    });

    it('Sucesso ao atualizar nome de desenvolvedor por id', async () => {
      const mockDeveloperToUpdate = { name: 'updatedName', ...mockDeveloper };
      const mockDeveloperRecovered = { ...mockDeveloperToUpdate, id: 1 };
      repository.updateDeveloper.mockResolvedValue(mockDeveloperRecovered);
      const developerUpdated = await service.updateDeveloper(
        1,
        mockDeveloperToUpdate,
      );
      expect(repository.updateDeveloper).toHaveBeenCalledWith(
        1,
        mockDeveloperToUpdate,
      );
      expect(developerUpdated).toBe(mockDeveloperRecovered);
    });

    it('Error ao atualizar nome de desenvolvedor por id', async () => {
      const mockDeveloperToUpdate = { name: 'updatedName', ...mockDeveloper };
      repository.updateDeveloper.mockResolvedValue(undefined);
      const developerUpdated = await service.updateDeveloper(
        1,
        mockDeveloperToUpdate,
      );
      expect(repository.updateDeveloper).toHaveBeenCalledWith(
        1,
        mockDeveloperToUpdate,
      );
      expect(developerUpdated).toBe(undefined);
    });

    it('Sucesso ao remover usuário', async () => {
      repository.deleteDeveloper.mockResolvedValue(1);
      const developerDeleted = await service.deleteDeveloper(1);
      expect(repository.deleteDeveloper).toHaveBeenCalledWith(1);
      expect(developerDeleted).toBe(1);
    });

    it('Error ao remover usuário', async () => {
      repository.deleteDeveloper.mockResolvedValue(undefined);
      const developerDeleted = await service.deleteDeveloper(1);
      expect(repository.deleteDeveloper).toHaveBeenCalledWith(1);
      expect(developerDeleted).toBe(undefined);
    });

    it('Sucesso ao recuperar desenvolvedores paginados', async () => {
      const developers: CreateDeveloperDto[] = [
        { name: 'first', age: 20, ...mockDeveloper },
        { name: 'second', age: 30, ...mockDeveloper },
        { name: 'third', age: 35, ...mockDeveloper },
        { name: 'forth', age: 30, ...mockDeveloper },
      ];
      repository.getDevelopers.mockResolvedValue(developers);
      const page = 1;
      const limit = 10;
      const query = { page, limit };
      const allDevelopersRecovered = await service.getDevelopers(query);
      expect(repository.getDevelopers).toHaveBeenCalledWith(page, limit, {});
      expect(allDevelopersRecovered.length).toBe(developers.length);
    });

    it('Sucesso ao recuperar desenvolvedores com 30 anos', async () => {
      const developers: CreateDeveloperDto[] = [
        { name: 'second', age: 30, ...mockDeveloper },
        { name: 'forth', age: 30, ...mockDeveloper },
      ];
      repository.getDevelopers.mockResolvedValue(developers);
      const query = { age: 30 };
      const allDevelopersRecovered = await service.getDevelopers(query);
      expect(repository.getDevelopers).toHaveBeenCalledWith(
        undefined,
        undefined,
        { age: 30 },
      );
      expect(allDevelopersRecovered).toBe(developers);
    });

    it('Erro ao recuperar desenvolvedores', async () => {
      repository.getDevelopers.mockResolvedValue(undefined);
      const page = 1;
      const limit = 10;
      const query = { page, limit };
      const allDevelopersRecovered = await service.getDevelopers(query);
      expect(repository.getDevelopers).toHaveBeenCalledWith(page, limit, {});
      expect(allDevelopersRecovered).toBe(undefined);
    });

    it('Erro de limite de paginação', async () => {
      const developers: CreateDeveloperDto[] = [
        { name: 'first', age: 20, ...mockDeveloper },
        { name: 'second', age: 30, ...mockDeveloper },
        { name: 'third', age: 35, ...mockDeveloper },
      ];
      const page = 1;
      const limit = 2;
      repository.getDevelopers.mockResolvedValue(developers);
      const query = { page, limit };
      const allDevelopersRecovered = await service.getDevelopers(query);
      expect(repository.getDevelopers).toHaveBeenCalledWith(page, limit, {});
      expect(allDevelopersRecovered.length).toBeGreaterThan(limit);
    });
  });
});
