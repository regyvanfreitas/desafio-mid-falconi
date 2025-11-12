import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from './profile.entity';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProfileService {
  private profiles: Profile[] = [
    new Profile('1', 'Admin'),
    new Profile('2', 'User'),
    new Profile('3', 'Manager'),
    new Profile('4', 'Developer'),
  ];

  findAll(): Profile[] {
    return this.profiles;
  }

  findOne(id: string): Profile {
    const profile = this.profiles.find((p) => p.id === id);
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  create(createProfileDto: CreateProfileDto): Profile {
    const profile = new Profile(uuidv4(), createProfileDto.name);
    this.profiles.push(profile);
    return profile;
  }

  update(id: string, updateProfileDto: UpdateProfileDto): Profile {
    const profileIndex = this.profiles.findIndex((p) => p.id === id);
    if (profileIndex === -1) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    this.profiles[profileIndex] = {
      ...this.profiles[profileIndex],
      ...updateProfileDto,
    };

    return this.profiles[profileIndex];
  }

  remove(id: string): void {
    const profileIndex = this.profiles.findIndex((p) => p.id === id);
    if (profileIndex === -1) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    this.profiles.splice(profileIndex, 1);
  }
}
