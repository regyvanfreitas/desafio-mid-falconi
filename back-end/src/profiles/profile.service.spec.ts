import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';

// Mock uuid module
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid'),
}));

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of profiles', () => {
      const profiles = service.findAll();
      expect(profiles).toBeInstanceOf(Array);
      expect(profiles.length).toBeGreaterThan(0);
      expect(profiles[0]).toHaveProperty('id');
      expect(profiles[0]).toHaveProperty('name');
    });
  });

  describe('findOne', () => {
    it('should return a profile when given a valid id', () => {
      const profiles = service.findAll();
      const firstProfile = profiles[0];
      const foundProfile = service.findOne(firstProfile.id);
      expect(foundProfile).toEqual(firstProfile);
    });

    it('should throw NotFoundException when given an invalid id', () => {
      expect(() => service.findOne('invalid-id')).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new profile', () => {
      const createProfileDto: CreateProfileDto = {
        name: 'Test Profile',
      };

      const initialCount = service.findAll().length;
      const createdProfile = service.create(createProfileDto);

      expect(createdProfile).toHaveProperty('id');
      expect(createdProfile.name).toBe(createProfileDto.name);
      expect(service.findAll().length).toBe(initialCount + 1);
    });
  });

  describe('update', () => {
    it('should update an existing profile', () => {
      const profiles = service.findAll();
      const profileToUpdate = profiles[0];
      const updateProfileDto: UpdateProfileDto = {
        name: 'Updated Profile Name',
      };

      const updatedProfile = service.update(
        profileToUpdate.id,
        updateProfileDto,
      );

      expect(updatedProfile.id).toBe(profileToUpdate.id);
      expect(updatedProfile.name).toBe(updateProfileDto.name);
    });

    it('should throw NotFoundException when updating non-existing profile', () => {
      const updateProfileDto: UpdateProfileDto = {
        name: 'Updated Profile',
      };

      expect(() => service.update('invalid-id', updateProfileDto)).toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a profile', () => {
      const createProfileDto: CreateProfileDto = {
        name: 'Profile to Remove',
      };

      const createdProfile = service.create(createProfileDto);
      const initialCount = service.findAll().length;

      service.remove(createdProfile.id);

      expect(service.findAll().length).toBe(initialCount - 1);
      expect(() => service.findOne(createdProfile.id)).toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when removing non-existing profile', () => {
      expect(() => service.remove('invalid-id')).toThrow(NotFoundException);
    });
  });
});
