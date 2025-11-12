import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { ProfileService } from '../profiles/profile.service';
import { CreateUserDto, UpdateUserDto, UpdateUserStatusDto } from './user.dto';

// Mock uuid module
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid'),
}));

describe('UserService', () => {
  let userService: UserService;
  let profileService: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, ProfileService],
    }).compile();

    userService = module.get<UserService>(UserService);
    profileService = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      const users = userService.findAll();
      expect(users).toBeInstanceOf(Array);
      expect(users.length).toBeGreaterThan(0);
      expect(users[0]).toHaveProperty('id');
      expect(users[0]).toHaveProperty('firstName');
      expect(users[0]).toHaveProperty('lastName');
      expect(users[0]).toHaveProperty('email');
      expect(users[0]).toHaveProperty('isActive');
      expect(users[0]).toHaveProperty('profileId');
    });

    it('should filter users by profileId when provided', () => {
      const profiles = profileService.findAll();
      const profileId = profiles[0].id;
      const filteredUsers = userService.findAll(profileId);

      filteredUsers.forEach((user) => {
        expect(user.profileId).toBe(profileId);
      });
    });
  });

  describe('findOne', () => {
    it('should return a user when given a valid id', () => {
      const users = userService.findAll();
      const firstUser = users[0];
      const foundUser = userService.findOne(firstUser.id);
      expect(foundUser).toEqual(firstUser);
    });

    it('should throw NotFoundException when given an invalid id', () => {
      expect(() => userService.findOne('invalid-id')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new user', () => {
      const profiles = profileService.findAll();
      const createUserDto: CreateUserDto = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@example.com',
        profileId: profiles[0].id,
      };

      const initialCount = userService.findAll().length;
      const createdUser = userService.create(createUserDto);

      expect(createdUser).toHaveProperty('id');
      expect(createdUser.firstName).toBe(createUserDto.firstName);
      expect(createdUser.lastName).toBe(createUserDto.lastName);
      expect(createdUser.email).toBe(createUserDto.email);
      expect(createdUser.isActive).toBe(true);
      expect(createdUser.profileId).toBe(createUserDto.profileId);
      expect(userService.findAll().length).toBe(initialCount + 1);
    });

    it('should throw BadRequestException when email already exists', () => {
      const users = userService.findAll();
      const existingUser = users[0];
      const profiles = profileService.findAll();

      const createUserDto: CreateUserDto = {
        firstName: 'Test',
        lastName: 'User',
        email: existingUser.email,
        profileId: profiles[0].id,
      };

      expect(() => userService.create(createUserDto)).toThrow(
        BadRequestException,
      );
    });

    it('should throw NotFoundException when profile does not exist', () => {
      const createUserDto: CreateUserDto = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        profileId: 'invalid-profile-id',
      };

      expect(() => userService.create(createUserDto)).toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update an existing user', () => {
      const users = userService.findAll();
      const userToUpdate = users[0];
      const updateUserDto: UpdateUserDto = {
        firstName: 'Updated',
        lastName: 'Name',
      };

      const updatedUser = userService.update(userToUpdate.id, updateUserDto);

      expect(updatedUser.id).toBe(userToUpdate.id);
      expect(updatedUser.firstName).toBe(updateUserDto.firstName);
      expect(updatedUser.lastName).toBe(updateUserDto.lastName);
      expect(updatedUser.email).toBe(userToUpdate.email);
    });

    it('should throw NotFoundException when updating non-existing user', () => {
      const updateUserDto: UpdateUserDto = {
        firstName: 'Updated',
      };

      expect(() => userService.update('invalid-id', updateUserDto)).toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when updating to existing email', () => {
      const users = userService.findAll();
      const userToUpdate = users[0];
      const otherUser = users[1];

      const updateUserDto: UpdateUserDto = {
        email: otherUser.email,
      };

      expect(() => userService.update(userToUpdate.id, updateUserDto)).toThrow(
        BadRequestException,
      );
    });
  });

  describe('updateStatus', () => {
    it('should update user status', () => {
      const users = userService.findAll();
      const userToUpdate = users[0];
      const updateUserStatusDto: UpdateUserStatusDto = {
        isActive: !userToUpdate.isActive,
      };

      const updatedUser = userService.updateStatus(
        userToUpdate.id,
        updateUserStatusDto,
      );

      expect(updatedUser.id).toBe(userToUpdate.id);
      expect(updatedUser.isActive).toBe(updateUserStatusDto.isActive);
    });

    it('should throw NotFoundException when updating status of non-existing user', () => {
      const updateUserStatusDto: UpdateUserStatusDto = {
        isActive: true,
      };

      expect(() =>
        userService.updateStatus('invalid-id', updateUserStatusDto),
      ).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user', () => {
      const profiles = profileService.findAll();
      const createUserDto: CreateUserDto = {
        firstName: 'User',
        lastName: 'ToRemove',
        email: 'remove@example.com',
        profileId: profiles[0].id,
      };

      const createdUser = userService.create(createUserDto);
      const initialCount = userService.findAll().length;

      userService.remove(createdUser.id);

      expect(userService.findAll().length).toBe(initialCount - 1);
      expect(() => userService.findOne(createdUser.id)).toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when removing non-existing user', () => {
      expect(() => userService.remove('invalid-id')).toThrow(NotFoundException);
    });
  });
});
