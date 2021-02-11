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

    it('user created successfully', async () => {
      const mockDeveloperInserted = { ...mockDeveloper, id: 1 };
      repository.createDeveloper.mockResolvedValue(mockDeveloperInserted);
      const developerInserted = await service.createDeveloper(mockDeveloper);
      expect(repository.createDeveloper).toHaveBeenCalledWith(mockDeveloper);
      expect(developerInserted).toBe(mockDeveloperInserted);
    });
  });
});
