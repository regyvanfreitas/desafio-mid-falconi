import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto, UpdateUserStatusDto } from './user.dto';
import { ProfileService } from '../profiles/profile.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [
    new User('1', 'John', 'Doe', 'john.doe@example.com', true, '1'),
    new User('2', 'Jane', 'Smith', 'jane.smith@example.com', true, '2'),
    new User('3', 'Bob', 'Johnson', 'bob.johnson@example.com', false, '3'),
    new User('4', 'Alice', 'Williams', 'alice.williams@example.com', true, '4'),
  ];

  constructor(private readonly profileService: ProfileService) {}

  findAll(profileId?: string): User[] {
    if (profileId) {
      return this.users.filter((user) => user.profileId === profileId);
    }
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    // Validate that the profile exists
    this.profileService.findOne(createUserDto.profileId);

    // Check if email already exists
    const existingUser = this.users.find(
      (user) => user.email === createUserDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const user = new User(
      uuidv4(),
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.email,
      true, // Default to active
      createUserDto.profileId,
    );

    this.users.push(user);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Validate profile if being updated
    if (updateUserDto.profileId) {
      this.profileService.findOne(updateUserDto.profileId);
    }

    // Check if email already exists (excluding current user)
    if (updateUserDto.email) {
      const existingUser = this.users.find(
        (user) => user.email === updateUserDto.email && user.id !== id,
      );
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };

    return this.users[userIndex];
  }

  updateStatus(id: string, updateUserStatusDto: UpdateUserStatusDto): User {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users[userIndex].isActive = updateUserStatusDto.isActive;
    return this.users[userIndex];
  }

  remove(id: string): void {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}
