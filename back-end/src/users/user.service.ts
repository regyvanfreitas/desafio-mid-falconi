import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto, UpdateUserStatusDto } from './user.dto';
import { ProfileService } from '../profiles/profile.service';
import { uuidv4 } from '../utils/id-generator';

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
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    this.profileService.findOne(createUserDto.profileId);

    const existingUser = this.users.find(
      (user) => user.email === createUserDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('E-mail já existe');
    }

    const user = new User(
      uuidv4(),
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.email,
      true,
      createUserDto.profileId,
    );

    this.users.push(user);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    if (updateUserDto.profileId) {
      this.profileService.findOne(updateUserDto.profileId);
    }

    if (updateUserDto.email) {
      const existingUser = this.users.find(
        (user) => user.email === updateUserDto.email && user.id !== id,
      );
      if (existingUser) {
        throw new BadRequestException('E-mail já existe');
      }
    }

    const currentUser = this.users[userIndex];

    if (updateUserDto.firstName !== undefined) {
      currentUser.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName !== undefined) {
      currentUser.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.email !== undefined) {
      currentUser.email = updateUserDto.email;
    }
    if (updateUserDto.isActive !== undefined) {
      currentUser.isActive = updateUserDto.isActive;
    }
    if (updateUserDto.profileId !== undefined) {
      currentUser.profileId = updateUserDto.profileId;
    }

    return this.users[userIndex];
  }

  updateStatus(id: string, updateUserStatusDto: UpdateUserStatusDto): User {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    this.users[userIndex].isActive = updateUserStatusDto.isActive;
    return this.users[userIndex];
  }

  remove(id: string): void {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    this.users.splice(userIndex, 1);
  }
}
